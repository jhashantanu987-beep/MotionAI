const fs = require('fs');
const path = require('path');

/**
 * Senior Backend Engineer Refactor: FileLeadStore
 * Enforces production-grade persistence, serialization, and data integrity.
 */
class FileLeadStore {
  constructor() {
    // 1. ABSOLUTE PATH: Ensure data is always in the same place
    this.DATA_PATH = path.resolve(__dirname, '../data/leads.json');
    this._ensureDataDir();
    this._loadInitialData();
  }

  _ensureDataDir() {
    const dir = path.dirname(this.DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.DATA_PATH)) {
      fs.writeFileSync(this.DATA_PATH, JSON.stringify([], null, 2), 'utf8');
      console.log(`[FileLeadStore] Initialized new data file: ${this.DATA_PATH}`);
    }
  }

  _loadInitialData() {
    try {
      const data = fs.readFileSync(this.DATA_PATH, 'utf8');
      const leads = JSON.parse(data || '[]');
      console.log(`[FileLeadStore] Loaded ${leads.length} leads from absolute path: ${this.DATA_PATH}`);
    } catch (error) {
      console.error(`[CRITICAL] FileLeadStore corruption. Resetting file: ${error.message}`);
      fs.writeFileSync(this.DATA_PATH, JSON.stringify([], null, 2), 'utf8');
    }
  }

  /**
   * SERIALIZED READ: Prevent race conditions by using sync FS
   */
  _read() {
    try {
      const data = fs.readFileSync(this.DATA_PATH, 'utf8');
      return JSON.parse(data || '[]');
    } catch (err) {
      console.error(`[ERROR] Failed to read leads: ${err.message}`);
      return [];
    }
  }

  /**
   * SERIALIZED WRITE: Prevent race conditions
   */
  _write(leads) {
    try {
      fs.writeFileSync(this.DATA_PATH, JSON.stringify(leads, null, 2), 'utf8');
      console.log(`[FileLeadStore] Saved ${leads.length} leads to file`);
      return true;
    } catch (err) {
      console.error(`[CRITICAL] Failed to persist data: ${err.message}`);
      return false;
    }
  }

  async getAll(filter = {}) {
    let leads = this._read();
    if (filter.status) leads = leads.filter(l => l.status === filter.status);
    if (filter.source) leads = leads.filter(l => l.source === filter.source);
    return leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getById(id) {
    const leads = this._read();
    return leads.find(l => l.id === id || l._id === id) || null;
  }

  /**
   * DATA VALIDATION & ID UNIQUENESS
   */
  async create(leadData) {
    if (!leadData.name || !leadData.email) {
      throw new Error("Validation Error: Name and Email are required for lead creation.");
    }

    const leads = this._read();
    
    // Check uniqueness
    const exists = leads.some(l => l.email.toLowerCase() === leadData.email.toLowerCase());
    if (exists) {
      throw new Error(`Integrity Error: Lead with email ${leadData.email} already exists.`);
    }

    const newId = Date.now().toString();
    const newLead = {
      _id: newId,
      id: newId,
      ...leadData,
      status: leadData.status || 'new',
      score: leadData.score || 0,
      value: leadData.value || 0,
      conversation: leadData.conversation || [],
      analysisReason: leadData.analysisReason || 'Awaiting initial signals...',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      appointmentDate: leadData.appointmentDate || null,
      bookingLink: leadData.bookingLink || 'https://calendly.com/primelayer7/30min'
    };

    leads.push(newLead);
    this._write(leads);
    return newLead;
  }

  async findOne(query) {
    const leads = this._read();
    if (query.email) {
      return leads.find(l => l.email.toLowerCase() === query.email.toLowerCase()) || null;
    }
    return null;
  }

  async update(id, updateData) {
    const leads = this._read();
    const index = leads.findIndex(l => l.id === id || l._id === id);
    if (index === -1) return null;

    // Defensive merge
    const cleanedUpdate = Object.entries(updateData).reduce((acc, [key, value]) => {
      if (value !== undefined) acc[key] = value;
      return acc;
    }, {});

    leads[index] = {
      ...leads[index],
      ...cleanedUpdate,
      updatedAt: new Date().toISOString()
    };

    this._write(leads);
    return leads[index];
  }

  async delete(id) {
    const leads = this._read();
    const originalCount = leads.length;
    const filtered = leads.filter(l => l.id !== id && l._id !== id);
    
    if (filtered.length !== originalCount) {
      this._write(filtered);
    }
    return { id };
  }
}

module.exports = new FileLeadStore();
