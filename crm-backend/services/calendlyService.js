const axios = require('axios');
require('dotenv').config();

const CALENDLY_TOKEN = process.env.CALENDLY_ACCESS_TOKEN;
const CALENDLY_USER = process.env.CALENDLY_USER_URI;
const CALENDLY_API_BASE = 'https://api.calendly.com';

const headers = {
  Authorization: `Bearer ${CALENDLY_TOKEN}`,
  'Content-Type': 'application/json'
};

/**
 * Service to interact with Calendly's V2 API
 */
const calendlyService = {
  /**
   * Generates a single-use booking link to force a specific time/event securely
   * @param {string} eventTypeCode - The event type URI
   */
  createSingleUseLink: async (eventTypeCode) => {
    try {
      if (!CALENDLY_TOKEN) return 'https://calendly.com/primelayer7/30min'; // Fallback
      
      const response = await axios.post(
        `${CALENDLY_API_BASE}/scheduling_links`,
        {
          max_event_count: 1,
          owner: CALENDLY_USER,
          owner_type: 'EventType',
        },
        { headers }
      );
      return response.data.resource.booking_url;
    } catch (error) {
      console.error('Calendly Link Error:', error.response?.data || error.message);
      return null;
    }
  },

  /**
   * Fetches the user's upcoming scheduled events to give Gemini context on what's already booked
   */
  getUpcomingEvents: async () => {
    try {
      if (!CALENDLY_TOKEN || !CALENDLY_USER) return [];
      
      const response = await axios.get(
        `${CALENDLY_API_BASE}/scheduled_events`,
        {
          params: { user: CALENDLY_USER, status: 'active', min_start_time: new Date().toISOString() },
          headers
        }
      );
      
      return response.data.collection.map(event => ({
        name: event.name,
        startTime: event.start_time,
        endTime: event.end_time,
        status: event.status
      }));
    } catch (error) {
      console.error('Calendly Fetch Events Error:', error.response?.data || error.message);
      return [];
    }
  }
};

module.exports = calendlyService;
