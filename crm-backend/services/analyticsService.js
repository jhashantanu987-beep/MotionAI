const { dataService } = require('./dataService');

/**
 * Analytics Service for calculating real-time revenue metrics
 */
const analyticsService = {
  getFunnelMetrics: async () => {
    const leads = await dataService.findAll({});
    
    // 1. Total Revenue (Value of 'converted' leads)
    const totalRevenue = leads
      .filter(l => l.status === 'converted')
      .reduce((sum, l) => sum + (l.value || 0), 0);
      
    // 2. Potential Revenue (Value of all non-lost leads)
    const potentialRevenue = leads
      .filter(l => l.status !== 'lost')
      .reduce((sum, l) => sum + (l.value || 0), 0);

    // 3. Funnel Stages (Counts for the bar chart)
    const funnelStages = {
      new: leads.filter(l => l.status === 'new').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      booked: leads.filter(l => l.status === 'booked').length,
      converted: leads.filter(l => l.status === 'converted').length,
      lost: leads.filter(l => l.status === 'lost').length,
    };

    // 4. Source Distribution
    const sourceStats = {
      meta: leads.filter(l => l.source === 'meta').length,
      google: leads.filter(l => l.source === 'google').length,
      tiktok: leads.filter(l => l.source === 'tiktok').length,
      manual: leads.filter(l => l.source === 'manual').length,
    };

    // 5. Active Leads
    const activeLeads = leads.filter(l => l.status !== 'lost' && l.status !== 'converted').length;

    // 6. Projected Revenue (Potential + Total)
    const projectedRevenue = totalRevenue + potentialRevenue;

    return {
      totalRevenue,
      potentialRevenue,
      projectedRevenue,
      funnelStages,
      sourceStats,
      activeLeads,
      totalLeads: leads.length,
      timestamp: new Date().toISOString()
    };
  }
};

module.exports = analyticsService;
