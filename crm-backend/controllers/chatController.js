const aiService = require('../services/aiService');
const analyticsService = require('../services/analyticsService');
const n8nService = require('../services/n8nService');

/**
 * Handle chat from the public website (guests)
 * POST /api/leads/public-chat
 */
const handlePublicChat = async (req, res, next) => {
  try {
    const { message, leadId } = req.body;
    if (!message) return res.status(400).json({ success: false, message: 'Message is required' });

    let lead;
    
    // 1. Try to find existing lead if leadId is provided (from session/cookie)
    if (leadId) {
      lead = await dataService.findById(leadId);
    }

    // 2. Auto-generate a "Web Guest" lead if none exists
    if (!lead) {
      console.log('🌐 Creating new Web Guest lead for public chat session...');
      lead = await dataService.create({
        name: 'Web Guest',
        email: 'guest@web.bot',
        phone: 'N/A',
        source: 'web_chat',
        score: 40,
        analysisReason: 'Organic visitor chatting via website widget.',
        status: 'new',
        value: 0,
        conversation: []
      });
    }

    // 3. Inject Real-Time Context into the AI Brain
    // We add special "System Secrets" to the lead notes so the AI knows about the CRM stats
    const stats = await analyticsService.getFunnelMetrics();
    const systemContext = `
      [SYSTEM CONTEXT - DO NOT REPEAT LITERALLY]
      Current CRM Stats:
      - Total Revenue Managed: $${stats.totalRevenue.toLocaleString()}
      - Active Leads: ${stats.totalLeads}
      - Top Performing Source: Meta Ads
      Today's Date: ${new Date().toLocaleDateString()}
    `;

    // 4. Process with AI Brain
    if (!lead.conversation) lead.conversation = [];
    lead.conversation.push({ role: 'user', content: message, timestamp: new Date() });

    // Use a modified lead object with context for the AI service
    const leadWithContext = {
      ...lead,
      notes: `${lead.notes || ''}\n${systemContext}`
    };

    const reply = await aiService.continueConversation(leadWithContext, message);
    
    // 5. Save the conversation back to the DB
    lead.conversation.push({ role: 'ai', content: reply.text, timestamp: new Date() });
    
    // If an appointment was booked via chat
    if (reply.newAppointmentDate) {
      lead.appointmentDate = reply.newAppointmentDate;
      lead.status = 'booked';
      // 🚀 TRIGGER: n8n Workflow
      n8nService.trigger('APPOINTMENT_BOOKED', lead);
    }

    await dataService.update(lead._id, {
      conversation: lead.conversation,
      appointmentDate: lead.appointmentDate,
      status: lead.status
    });

    // 6. Return response to Frontend
    res.status(200).json({
      success: true,
      text: reply.text,
      leadId: lead._id, // Send ID back so the frontend can maintain the session
      newAppointmentDate: reply.newAppointmentDate
    });

  } catch (error) {
    next(error);
  }
};

module.exports = { handlePublicChat };
