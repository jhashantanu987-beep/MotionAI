const axios = require('axios');
require('dotenv').config();

/**
 * Service 10: Intelligence Automation Bridge (n8n)
 * Handles outbound webhooks to n8n workflows for advanced cross-platform automation.
 */
class N8NService {
  constructor() {
    this.webhookUrl = process.env.N8N_WEBHOOK_URL;
    this.isEnabled = !!this.webhookUrl;
  }

  /**
   * Trigger an external n8n workflow
   * @param {string} event - The type of trigger (e.g., LEAD_CREATED, STATUS_UPDATED)
   * @param {Object} data - The lead or event payload
   */
  async trigger(event, data) {
    const payload = {
      event,
      timestamp: new Date().toISOString(),
      source: 'KLARA_NEURAL_CRM',
      data
    };

    if (!this.isEnabled) {
      console.log(`📡 [N8N SIMULATOR] Triggering ${event} for ${data.email || data.name}`);
      console.log(`📝 Payload:`, JSON.stringify(payload, null, 2));
      return { success: true, mode: 'simulated' };
    }

    try {
      console.log(`🚀 [N8N TRIGGER] Sending ${event} to ${this.webhookUrl}`);
      const response = await axios.post(this.webhookUrl, payload, {
        headers: {
          'X-Klara-Trigger': 'neural-engine-v1',
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout for safety
      });

      return {
        success: true,
        status: response.status,
        mode: 'live'
      };
    } catch (error) {
      console.error(`❌ [N8N ERROR] Failed to trigger ${event}:`, error.message);
      // We don't throw here to ensure the core CRM flow isn't interrupted by n8n failures
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new N8NService();
