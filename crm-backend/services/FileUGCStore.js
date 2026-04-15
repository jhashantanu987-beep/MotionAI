const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/ugc.json');

class FileUGCStore {
  async ensureFile() {
    try {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([]));
    }
  }

  async getAll() {
    await this.ensureFile();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  }

  async create(ugcData) {
    const ugcItems = await this.getAll();
    const newItem = {
      id: Date.now().toString(),
      _id: Date.now().toString(),
      ...ugcData,
      status: ugcData.status || 'draft',
      performance: ugcData.performance || {
        impressions: 0,
        engagement: 0,
        engagementRate: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    ugcItems.push(newItem);
    await fs.writeFile(DATA_FILE, JSON.stringify(ugcItems, null, 2));
    return newItem;
  }

  async getPerformanceStats() {
    const items = await this.getAll();
    
    // Aggregate stats
    const totalReach = items.reduce((sum, item) => sum + (item.performance?.impressions || 0), 0);
    const totalEngagement = items.reduce((sum, item) => sum + (item.performance?.engagement || 0), 0);
    
    // Group by platform
    const platforms = ['instagram', 'tiktok', 'twitter', 'facebook'];
    const platformBreakdown = platforms.map(p => {
      const pItems = items.filter(item => item.platform.toLowerCase() === p);
      return {
        platform: p,
        reach: pItems.reduce((sum, item) => sum + (item.performance?.impressions || 0), 0),
        engagement: pItems.reduce((sum, item) => sum + (item.performance?.engagement || 0), 0),
        growth: pItems.length > 0 ? 12.5 : 0, // Mock steady growth for now
        viralPosts: pItems.length,
        topContent: pItems[0]?.title || 'Awaiting Content'
      };
    });

    return {
      overview: {
        totalReach,
        totalEngagement,
        engagementRate: totalReach > 0 ? ((totalEngagement / totalReach) * 100).toFixed(1) : 0,
        viralCoefficient: items.length > 0 ? 1.2 : 0
      },
      platformBreakdown,
      contentPerformance: items.slice(-5).reverse() // Last 5 items
    };
  }
}

module.exports = new FileUGCStore();
