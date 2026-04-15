const { dataService } = require('../services/dataService')
const { validateStatusTransition } = require('../services/pipelineService')
const aiService = require('../services/aiService')
const n8nService = require('../services/n8nService')

/**
 * Helper to safely append messages to conversation
 * Enforces alternating roles and prevents duplicate AI messages
 */
const pushConversationMessage = (conversation, role, content) => {
  const history = [...(conversation || [])];
  const lastMsg = history[history.length - 1];

  // Prevent duplicate consecutive messages with same role AND content
  if (lastMsg && lastMsg.role === role && lastMsg.content === content) {
    return history;
  }

  history.push({
    role,
    content,
    timestamp: new Date().toISOString()
  });
  return history;
};

/**
 * Get automated status message based on new status
 */
const getStatusAutomationMessage = (status) => {
  const messages = {
    qualified: "You're a great fit. Book your strategy call here: https://calendly.com/primelayer7/30min",
    booked: "Your call is scheduled. We’ll help you scale your revenue during the session.",
    converted: "You're now onboarded. Our system is now generating and converting leads for you."
  };
  return messages[status] || null;
};

// ─────────────────────────────────────────────
// @desc    Create a new lead
// @route   POST /api/leads
// ─────────────────────────────────────────────
const createLead = async (req, res, next) => {
  try {
    const { name, email, phone, source, score, notes, status, value } = req.body

    // AI ENHANCEMENT: Generate initial score and response
    const aiAnalysis = await aiService.analyzeConversionScore({ name, email, phone, source, score, notes })
    
    // Initial lead creation
    const leadData = { 
      name, email, phone, source, 
      score: aiAnalysis.score, 
      analysisReason: aiAnalysis.reason,
      notes, 
      status: status || 'new', 
      value: value || 0,
      conversation: []
    };

    let lead = await dataService.create(leadData);

    // Add first AI message
    const firstMessage = await aiService.generateInstantResponse(lead);
    lead.conversation = pushConversationMessage(lead.conversation, 'ai', firstMessage);

    // Auto-qualification logic for HIGH-INTENT leads
    if (lead.score >= 85 && lead.status === 'new') {
      lead.status = 'qualified';
      const autoMsg = getStatusAutomationMessage('qualified');
      lead.conversation = pushConversationMessage(lead.conversation, 'ai', autoMsg);
      
      // Update immediately with conversation and status
      lead = await dataService.update(lead._id, { 
        status: lead.status,
        conversation: lead.conversation 
      });

      n8nService.trigger('LEAD_QUALIFIED', lead);
      n8nService.trigger('HIGH_INTENT_DETECTED', lead);
    } else {
      // Standard update for the first AI message
      lead = await dataService.update(lead._id, { conversation: lead.conversation });
    }

    // 🚀 TRIGGER: n8n Workflow
    n8nService.trigger('LEAD_CREATED', lead);

    res.status(201).json({
      success: true,
      data: lead,
      storage: dataService.isLocal() ? 'local-file' : 'mongodb'
    })
  } catch (error) {
    next(error)
  }
}

// ─────────────────────────────────────────────
// @desc    Get all leads
// @route   GET /api/leads
// ─────────────────────────────────────────────
const getLeads = async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.status) filter.status = req.query.status
    if (req.query.source) filter.source = req.query.source

    const leads = await dataService.findAll(filter)

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
      storage: dataService.isLocal() ? 'local-file' : 'mongodb'
    })
  } catch (error) {
    next(error)
  }
}

// ─────────────────────────────────────────────
// @desc    Get a single lead
// @route   GET /api/leads/:id
// ─────────────────────────────────────────────
const getLeadById = async (req, res, next) => {
  const { id } = req.params;
  console.log(`[DEBUG] GET /api/leads/:id | Incoming ID: ${id}`);

  try {
    // 1. Validate ID existence
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID parameter is required"
      });
    }

    // 2. Fetch Lead with data service
    const lead = await dataService.findById(id);
    console.log(`[DEBUG] GET /api/leads/:id | Found Lead: ${lead ? lead.email || id : 'NONE'}`);

    // 3. Handle NULL / NOT FOUND
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found"
      });
    }

    // 4. Return Success
    return res.status(200).json({
      success: true,
      data: lead
    });

  } catch (error) {
    console.error(`[CRITICAL] Error fetching lead ${id}:`, error);
    next(error); // centralize scrubbing
  }
}

// ─────────────────────────────────────────────
// @desc    Continue Voice/Text AI Chat with Lead
// @route   POST /api/leads/:id/chat
// ─────────────────────────────────────────────
const chatWithLead = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });

    let lead = await dataService.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    // Append user message utilizing hardened helper
    lead.conversation = pushConversationMessage(lead.conversation, 'user', message);

    // Call AI Engine
    const reply = await aiService.continueConversation(lead, message);
    
    // Append AI response utilization hardened helper
    lead.conversation = pushConversationMessage(lead.conversation, 'ai', reply.text);

    // Dynamic scoring boost
    const newScore = lead.score < 90 ? lead.score + 2 : lead.score;
    
    // Auto-qualify logic
    const becameQualified = lead.status === 'new' && newScore >= 85;
    const oldStatus = lead.status;
    if (becameQualified) {
      lead.status = 'qualified';
      const autoMsg = getStatusAutomationMessage('qualified');
      lead.conversation = pushConversationMessage(lead.conversation, 'ai', autoMsg);
    }
    
    const updatedLead = await dataService.update(lead._id, {
      conversation: lead.conversation,
      score: newScore,
      status: lead.status
    });

    // 🚀 TRIGGER: n8n Workflows
    if (lead.status === 'qualified' && oldStatus !== 'qualified') {
      n8nService.trigger('LEAD_QUALIFIED', updatedLead);
    }
    if (updatedLead.score >= 85 && lead.score < 85) {
      n8nService.trigger('HIGH_INTENT_DETECTED', updatedLead);
    }

    res.status(200).json({
      success: true,
      data: updatedLead
    });
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────────
// @desc    Update a lead
// @route   PATCH /api/leads/:id
// ─────────────────────────────────────────────
const updateLead = async (req, res, next) => {
  try {
    const lead = await dataService.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, message: "Lead not found" });
    }

    const { status, score, notes, value } = req.body;

    // 1. REVENUE VALIDATION
    const finalValue = value !== undefined ? value : lead.value;
    if (status === 'converted') {
      if (!finalValue || isNaN(finalValue) || Number(finalValue) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Conversion failure: Valid revenue value ($ > 0) is mandatory for onboarding.'
        });
      }
    }

    // 2. PIPELINE VALIDATION
    if (status && status !== lead.status) {
      try {
        validateStatusTransition(lead.status, status);
      } catch (pipelineError) {
        return res.status(400).json({ success: false, message: pipelineError.message });
      }
    }

    // 3. AUTO-QUALIFY LOGIC
    let finalStatus = status || lead.status;
    const finalScore = score !== undefined ? score : lead.score;
    if (finalStatus === 'new' && finalScore >= 85) {
      finalStatus = 'qualified';
    }

    // 4. DEFENSIVE UPDATE PAYLOAD
    // Prevents null/undefined from overwriting existing data
    const updatePayload = {};
    if (finalStatus !== undefined) updatePayload.status = finalStatus;
    if (finalScore !== undefined) updatePayload.score = finalScore;
    if (notes !== undefined && notes !== null) updatePayload.notes = notes;
    if (finalValue !== undefined) updatePayload.value = finalValue;

    // 5. STATUS CHANGE AUTOMATION MESSAGES
    if (finalStatus !== lead.status) {
      const autoMsg = getStatusAutomationMessage(finalStatus);
      if (autoMsg) {
        updatePayload.conversation = pushConversationMessage(lead.conversation, 'ai', autoMsg);
      }
    }

    const updatedLead = await dataService.update(req.params.id, updatePayload);

    // 🚀 TRIGGERS
    if (finalStatus !== lead.status) {
      if (finalStatus === 'qualified') n8nService.trigger('LEAD_QUALIFIED', updatedLead);
      n8nService.trigger('STATUS_UPDATED', updatedLead);
    }
    if (finalScore >= 85 && (!lead.score || lead.score < 85)) {
      n8nService.trigger('HIGH_INTENT_DETECTED', updatedLead);
    }

    res.status(200).json({
      success: true,
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
}

// ─────────────────────────────────────────────
// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// ─────────────────────────────────────────────
const deleteLead = async (req, res, next) => {
  try {
    const lead = await dataService.delete(req.params.id)

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: `Lead with ID "${req.params.id}" not found.`,
      })
    }

    res.status(200).json({
      success: true,
      data: { id: req.params.id },
      message: 'Lead successfully deleted.',
    })
  } catch (error) {
    next(error)
  }
}

const analyticsService = require('../services/analyticsService')

// ─────────────────────────────────────────────
// @desc    Get lead analytics
// @route   GET /api/leads/analytics
// ─────────────────────────────────────────────
const getAnalytics = async (req, res, next) => {
  try {
    const stats = await analyticsService.getFunnelMetrics()
    res.status(200).json({
      success: true,
      data: stats
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { createLead, getLeads, getLeadById, updateLead, deleteLead, getAnalytics, chatWithLead }
