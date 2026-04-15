const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const BOOKING_LINK = "https://calendly.com/primelayer7/30min";

const INTENT_RESPONSES = {
  BOOKING: [
    "You're a great fit for a full revenue audit. You can book a priority strategy call here: {{LINK}}",
    "I've analyzed your profile and we should align on a strategy. Secure your slot here: {{LINK}}",
    "Let's move this to a discovery session. Our engineers are ready to walk you through the architecture: {{LINK}}"
  ],
  PRICING: [
    "Our elite model starts at $1K–$3K monthly setup plus performance-scaled incentives. We only win when you win.",
    "Investment structures range from $1K to $3K for infrastructure deployment, with additional revenue-share and performance tiers based on growth velocity.",
    "We operate on a 'Revenue-First' pricing model: $1K–$3K base for deep system integration, plus performance targets aligned with your ROI."
  ],
  LEADS: [
    "Our neural lead engine captures high-intent demand from Meta, Google, and TikTok, qualifying every prospect before it hits your CRM.",
    "We don't just generate traffic; we manufacture qualified demand. Each lead is autonomously vetted by our AI agents before you ever see them.",
    "The system uses advanced intent-detection to find your ideal buyers and moves them from social feeds into your booking calendar automatically."
  ],
  GROWTH: [
    "We specialize in rapid revenue scaling. By automating the entire funnel from traffic to booking, we eliminate the friction in your growth cycle.",
    "Our mission is absolute revenue velocity. We deploy end-to-end AI agents that hunt for conversion opportunities 24/7.",
    "Scaling is a data problem. We solve it by connecting your demand sources directly to a neural-response engine that never sleeps."
  ],
  FALLBACK: [
    "I'm processing that. In the meantime, would you like to see how we specifically handle revenue audits?",
    "That's a valid query. Let me connect that to our growth architecture. What's your primary goal for this quarter?",
    "Understood. We usually focus on end-to-end revenue automation—how does that align with your current operations?"
  ]
};

/**
 * @desc Get a randomized, premium response for a detected intent
 */
function getResponseFromIntent(intentType) {
  const options = INTENT_RESPONSES[intentType] || INTENT_RESPONSES.FALLBACK;
  const pick = options[Math.floor(Math.random() * options.length)];
  return pick.replace('{{LINK}}', BOOKING_LINK);
}

/**
 * @desc Detect core business intent from user message
 */
function detectIntent(message) {
  const msg = message.toLowerCase();
  if (msg.includes('book') || msg.includes('call') || msg.includes('meet') || msg.includes('schedule')) return 'BOOKING';
  if (msg.includes('price') || msg.includes('cost') || msg.includes('charge') || msg.includes('fee')) return 'PRICING';
  if (msg.includes('lead') || msg.includes('customer') || msg.includes('traffic')) return 'LEADS';
  if (msg.includes('growth') || msg.includes('scale') || msg.includes('revenue') || msg.includes('money')) return 'GROWTH';
  return null;
}

const AI_FALLBACK = "Thanks for reaching out! Let me understand your needs better.";

/**
 * @desc    Generate a personalized instant response for a new lead
 * @param   {Object} lead - The lead object from the DB
 * @returns {Promise<string>} - The AI generated message
 */
async function generateInstantResponse(lead) {
  try {
    const prompt = `
      You are Klara, a high-end AI Revenue Agent for an elite AI Automation Agency. 
      A new lead just signed up on our website.
      
      Lead Name: ${lead.name}
      Interest: ${lead.notes || 'AI Automations'}
      Source: ${lead.source}
      Conversion Score: ${lead.score}/100
      
      Instructions:
      1. Your goal is to send a short, professional, and slightly mysterious WhatsApp message (under 50 words) that acknowledges their sign-up.
      2. Ask one powerful qualifying question about their business goal. 
      3. Use a premium, authoritative yet helpful tone.
      
      🚨 STRATEGIC OVERRIDE: 
      If the Conversion Score is 85 or higher, you MUST also invite them to book a "Strategic Revenue Audit" immediately, asking them what time they are free this week.
      Weave it naturally into the message.

      Important: Do NOT use placeholders like [Name]. Use their real name.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('❌ AI Brain Error (Response):', error);
    return AI_FALLBACK;
  }
}

/**
 * @desc    Analyze lead data and update the conversion score
 * @param   {Object} lead - The lead object
 * @returns {Promise<number>} - The calculated score (0-100)
 */
async function analyzeConversionScore(lead) {
  try {
    const prompt = `
      Act as a Lead Scoring Specialist for an elite AI Automation Agency. 
      Analyze this lead and return a JSON object with two fields: "score" (0-100) and "reason" (a short sentence explaining the score).
      
      Name: ${lead.name}
      Email: ${lead.email}
      Notes: ${lead.notes || 'No goals provided yet.'}
      Source: ${lead.source}
      
      Scoring Criteria:
      - Corporate/Business email: High Value (+20)
      - High intent notes (mentions budget, scaling, specific pain points): Very High Value (+40)
      - Generic/Test data (e.g., "ads", "test", no notes): Low Value (-30)
      - Realistic Phone Number: Medium Value (+10)
      
      Return ONLY valid JSON.
      Example: { "score": 85, "reason": "High intent detected from corporate email and specific business pain points mentioned." }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Attempt to parse JSON
    try {
      const parsed = JSON.parse(text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1));
      return {
        score: Math.min(100, Math.max(0, parsed.score || 75)),
        reason: parsed.reason || 'Lead processed successfully.'
      };
    } catch (e) {
      // Fallback if AI doesn't return perfect JSON
      const scoreMatch = text.match(/\d+/);
      return {
        score: scoreMatch ? parseInt(scoreMatch[0]) : 75,
        reason: 'AI analyzed lead signals but found ambiguous intent.'
      };
    }
  } catch (error) {
    console.error('❌ AI Brain Error (Scoring):', error);
    return { score: 75, reason: 'System default applied due to analysis time-out.' };
  }
}

/**
 * @desc    Generate viral social media content scripts and hooks
 * @param   {Object} request - topic, platform, type, tone, targetAudience
 * @returns {Promise<Object>} - The AI generated content object
 */
async function generateUGCContent(request) {
  try {
    const prompt = `
      [ROLE] You are an elite Viral Content Strategist for ${request.platform}. 
      [CORE OBJECTIVE] Synthesize a high-resonance UGC asset for the following vector:
      
      Topic: ${request.topic}
      Archetype: ${request.type}
      Tone: ${request.tone}
      Audience: ${request.targetAudience}
      
      [CONSTRAINTS]
      1. SCRIPT: Generate a high-conversion script/caption (under 200 words). Use "Pattern Interrupts" in the first sentence.
      2. NEURAL HOOKS: Generate 3 distinct viral hooks (e.g., negative constraint, curiosity gap, authority claim).
      3. METRICS: Predict "Engagement Velocity" (85-99).
      
      [OUTPUT FORMAT: JSON ONLY]
      {
        "content": "The full script text...",
        "hooks": ["Hook 1", "Hook 2", "Hook 3"],
        "hashtags": ["#tag1", "#tag2", "#tag3"],
        "engagementPotential": 94
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Extraction logic to handle markdown code blocks if Gemini returns them
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Neural output failed to form valid JSON.');
  } catch (error) {
    console.error('❌ AI Brain Error (UGC):', error);
    return {
      content: `[Resonance Failure] Could not synthesize asset for ${request.topic}.`,
      hooks: ["Neural Link Error", "Spike in Demand", "Retry Connection"],
      hashtags: ["#SystemError"],
      engagementPotential: 0
    }
  }
}

const calendlyService = require('./calendlyService');

/**
 * @desc    Process a new message in an existing conversation
 * @param   {Object} lead - The lead object with full history
 * @param   {string} userMessage - The new incoming message from the lead
 * @returns {Promise<Object>} - The AI generated reply { text, newAppointmentDate }
 */
async function continueConversation(lead, userMessage) {
  try {
    // 1. RULE-BASED INTENT ENGINE (Prioritize high-fidelity response)
    const detectedIntent = detectIntent(userMessage);
    if (detectedIntent) {
      const intentResponse = getResponseFromIntent(detectedIntent);
      
      // Prevent duplicate consecutive AI messages with the exact same content
      const lastMessage = lead.conversation && lead.conversation.length > 0 
        ? lead.conversation[lead.conversation.length - 1] 
        : null;
        
      if (lastMessage && lastMessage.role === 'ai' && lastMessage.content === intentResponse) {
        // Variety fail: use fallback variation if possible, or carry on to Gemini
        console.log(`[aiService] Detected duplicate intent response. Falling back to neural generation.`);
      } else {
        console.log(`[aiService] Intent detected: ${detectedIntent}. Triggering high-fidelity response.`);
        return { text: intentResponse, newAppointmentDate: null };
      }
    }

    // 2. NEURAL FALLBACK (Gemini 1.5-Flash)
    // Fetch real busy times from Calendly API
    const busyEvents = await calendlyService.getUpcomingEvents();
    const busyContext = busyEvents.length > 0 
      ? `Currently booked times: ${busyEvents.map(e => `${e.startTime} to ${e.endTime}`).join(', ')}`
      : 'No times are currently blocked on the calendar.';

    const currentDate = new Date().toISOString();

    const prompt = `
      [STRICT SYSTEM INSTRUCTION: YOU ARE THE BRAIN OF AN ELITE AI REVENUE ENGINE.]
      
      Persona: You are Klara. You are authoritative, focused on business growth, and extremely professional. 
      Your goal is to qualify the lead and move them toward a strategy call.
      
      CRM TELEMETRY:
      - Name: ${lead.name}
      - Score: ${lead.score}/100
      - Notes: ${lead.notes || 'No telemetry data available.'}
      
      STATUS:
      - UTC Date/Time: ${currentDate}
      - Business Hours: Mon-Fri, 10 AM to 4 PM.
      - ${busyContext}
      
      HISTORY:
      ${lead.conversation.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}
      
      NEW MESSAGE:
      USER: ${userMessage}
      
      Output: One premium, high-conversion response (max 60 words).
      Strict Constraint: DO NOT use clichés like "How can I help you today?". Focus on their revenue potential.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let replyText = response.text().trim();
    
    return { text: replyText, newAppointmentDate: null };
  } catch (error) {
    console.error('❌ AI Brain Error (Chat):', error);
    return { text: getResponseFromIntent('FALLBACK'), newAppointmentDate: null };
  }
}

module.exports = {
  generateInstantResponse,
  analyzeConversionScore,
  generateUGCContent,
  continueConversation
};
