const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/campaigns.json');

const defaultCampaigns = [
  {
    id: '1', name: 'AI CRM Launch — Meta', platform: 'facebook',
    status: 'active', budget: 2000, spent: 1240,
    impressions: 45000, clicks: 1800, conversions: 32,
    ctr: 4.0, cpc: 0.69, roas: 3.1,
    startDate: new Date(Date.now() - 7 * 864e5).toISOString(),
    endDate: new Date(Date.now() + 23 * 864e5).toISOString()
  },
  {
    id: '2', name: 'Revenue Engine — Google', platform: 'google',
    status: 'active', budget: 1500, spent: 890,
    impressions: 28000, clicks: 1100, conversions: 24,
    ctr: 3.9, cpc: 0.81, roas: 4.2,
    startDate: new Date(Date.now() - 5 * 864e5).toISOString(),
    endDate: new Date(Date.now() + 25 * 864e5).toISOString()
  },
  {
    id: '3', name: 'Viral UGC — TikTok', platform: 'tiktok',
    status: 'paused', budget: 800, spent: 320,
    impressions: 120000, clicks: 2400, conversions: 8,
    ctr: 2.0, cpc: 0.13, roas: 1.8,
    startDate: new Date(Date.now() - 3 * 864e5).toISOString(),
    endDate: new Date(Date.now() + 27 * 864e5).toISOString()
  },
];

class FileAdStore {
  async ensureFile() {
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify(defaultCampaigns, null, 2));
    }
  }

  async getAll(platform) {
    await this.ensureFile();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const campaigns = JSON.parse(data);
    if (platform && platform !== 'all') {
      return campaigns.filter(c => c.platform === platform);
    }
    return campaigns;
  }

  async create(data) {
    const campaigns = await this.getAll();
    const newCampaign = {
      id: Date.now().toString(),
      ...data,
      status: 'draft',
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      ctr: 0, cpc: 0, roas: 0,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 864e5).toISOString()
    };
    campaigns.push(newCampaign);
    await fs.writeFile(DATA_FILE, JSON.stringify(campaigns, null, 2));
    return newCampaign;
  }

  async update(id, data) {
    const campaigns = await this.getAll();
    const idx = campaigns.findIndex(c => c.id === id);
    if (idx === -1) return null;
    campaigns[idx] = { ...campaigns[idx], ...data };
    await fs.writeFile(DATA_FILE, JSON.stringify(campaigns, null, 2));
    return campaigns[idx];
  }

  async delete(id) {
    const campaigns = await this.getAll();
    const filtered = campaigns.filter(c => c.id !== id);
    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }

  async getPerformance() {
    const campaigns = await this.getAll();
    const totalSpend = campaigns.reduce((sum, c) => sum + c.spent, 0);
    const totalRevenue = campaigns.reduce((sum, c) => sum + (c.spent * c.roas), 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const avgRoas = campaigns.length > 0 ? campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length : 0;

    return {
      overview: {
        totalSpend, totalRevenue, totalConversions, totalImpressions,
        avgRoas: Math.round(avgRoas * 10) / 10,
        activeCampaigns: campaigns.filter(c => c.status === 'active').length,
      },
      campaigns
    };
  }
}

module.exports = new FileAdStore();
