const cron = require('node-cron');
const { dataService } = require('./dataService');
const whatsappService = require('./whatsappService');

class ReminderService {
  start() {
    // Run every hour at the 0th minute: '0 * * * *'
    // To make it run perfectly for demo purposes right now if we wanted, we could do '* * * * *'
    // But for production: '0 * * * *'
    cron.schedule('0 * * * *', async () => {
      console.log('🔄 [Cron Engine] Scanning for upcoming appointments...');
      try {
        const rawLeads = await dataService.findAll({}); // fetch all leads

        // For each lead, check if they have an appointmentDate
        rawLeads.forEach(async (lead) => {
          if (!lead.appointmentDate) return;

          const appointmentTime = new Date(lead.appointmentDate).getTime();
          const now = Date.now();
          const hoursUntilEvent = (appointmentTime - now) / (1000 * 60 * 60);

          // If the event is exactly between 23 and 24 hours away
          if (hoursUntilEvent > 23 && hoursUntilEvent <= 24) {
            
            // Send the 24-hour reminder via WhatsApp Strategy
            if (lead.phone && lead.source === 'whatsapp') {
              console.log(`⏰ [Reminder] Triggering 24h WhatsApp Reminder for ${lead.name}`);
              
              const message = `Hey ${lead.name}! This is Klara. Just an automated reminder that our Strategic Revenue Audit is exactly 24 hours away relative to your booked time. Reply 'YES' to confirm you'll be there!`;
              
              await whatsappService.sendMessage(lead.phone.replace('+', ''), message);
              
              // Log to conversation history naturally
              lead.conversation.push({ role: 'ai', content: `[SYSTEM: Sent 24h Reminder] ${message}`, timestamp: new Date() });
              await dataService.update(lead.id, { conversation: lead.conversation });
            }
          }
        });
      } catch (error) {
        console.error('❌ [Cron Engine Error]', error);
      }
    });

    console.log('✅ Cron Engine Started: No-Show Recovery pipeline active.');
  }
}

module.exports = new ReminderService();
