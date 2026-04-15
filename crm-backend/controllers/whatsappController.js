const { dataService } = require('../services/dataService');
const aiService = require('../services/aiService');
const whatsappService = require('../services/whatsappService');

/**
 * Handle Meta's Webhook Verification
 * GET /api/whatsapp/webhook
 */
const verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.WEBHOOK_VERIFY_TOKEN) {
      console.log('✅ WhatsApp Webhook verified!');
      // Meta requires we return exactly the challenge string
      return res.status(200).send(challenge);
    } else {
      console.error('❌ Webhook verification failed. Token mismatch.');
      return res.sendStatus(403);
    }
  }
  return res.sendStatus(400);
};

/**
 * Handle Incoming WhatsApp Messages
 * POST /api/whatsapp/webhook
 */
const handleIncomingMessage = async (req, res) => {
  try {
    const body = req.body;

    // Check if it's a WhatsApp App webhook request
    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];

      if (message) {
        // Extract data
        const fromPhone = message.from; // e.g. "15551234567"
        const msgText = message.text?.body;
        
        // Also grab their WhatsApp Name if available
        const senderName = value.contacts?.[0]?.profile?.name || 'Unknown User';

        console.log(`📩 Incoming WhatsApp from ${fromPhone}: ${msgText}`);

        if (msgText) {
          // 1. Find or Create Lead
          let lead = await dataService.findByPhone(fromPhone);
          
          if (!lead) {
            console.log(`✨ Creating new lead for WhatsApp number: ${fromPhone}`);
            // Let the CRM create a new Lead entry
            lead = await dataService.create({
              name: senderName,
              email: `${fromPhone}@whatsapp.lead`, // Placeholder
              phone: `+${fromPhone}`,
              source: 'whatsapp',
              score: 50,
              analysisReason: 'Entered pipeline organically via WhatsApp direct message.',
              status: 'new',
              value: 0,
              conversation: []
            });
            
            // Optionally, initial AI scoring can be triggered here.
          }

          // 2. Append User Message
          if (!lead.conversation) lead.conversation = [];
          lead.conversation.push({ role: 'user', content: msgText, timestamp: new Date() });

          // 3. Process with AI Brain
          const reply = await aiService.continueConversation(lead, msgText);
          const replyText = reply.text;
          
          if (reply.newAppointmentDate) {
            console.log(`📅 Automatically booking appointment for ${reply.newAppointmentDate}`);
            lead.appointmentDate = reply.newAppointmentDate;
          }

          // 4. Append AI Message & Update Lead status dynamically
          lead.conversation.push({ role: 'ai', content: replyText, timestamp: new Date() });
          
          // Warmer activity boosts score
          if (lead.score < 90) lead.score += 2;
          lead.status = 'qualified';

          await dataService.update(lead._id, {
            conversation: lead.conversation,
            score: lead.score,
            status: lead.status,
            appointmentDate: lead.appointmentDate
          });

          // 5. Send actual reply to WhatsApp!
          await whatsappService.sendMessage(fromPhone, replyText);
        }
      }

      // Always return a 200 OK immediately so Meta doesn't retry delivering the webhook
      return res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('❌ WhatsApp Webhook Error:', error);
    // Ignore internal errors on the webhook side, keep Meta happy.
    res.sendStatus(200);
  }
};

module.exports = {
  verifyWebhook,
  handleIncomingMessage,
};
