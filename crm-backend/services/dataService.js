const Lead = require('../models/Lead');
const FileLeadStore = require('./FileLeadStore');

let useFileStore = false;

const setStoreMode = (mode) => {
  useFileStore = mode === 'file';
};

const getStore = () => {
  return useFileStore ? FileLeadStore : Lead;
};

// Unified Data Interface
const dataService = {
  create: async (data) => {
    const store = getStore();
    return await store.create(data);
  },

  findAll: async (filter) => {
    const store = getStore();
    // Mongoose find vs FileStore getAll
    if (useFileStore) return await store.getAll(filter);
    return await store.find(filter).sort({ createdAt: -1 });
  },

  findById: async (id) => {
    const store = getStore();
    if (useFileStore) return await store.getById(id);
    return await store.findById(id);
  },

  findOne: async (query) => {
    const store = getStore();
    return await store.findOne(query);
  },

  findByPhone: async (phone) => {
    const store = getStore();
    if (useFileStore && store.findByPhone) return await store.findByPhone(phone);
    // basic mongoose fallback, assumes phone field is normalized identically
    return await store.findOne({ phone });
  },

  update: async (id, updateData) => {
    const store = getStore();
    if (useFileStore) return await store.update(id, updateData);
    
    const lead = await store.findById(id);
    if (!lead) return null;
    
    Object.assign(lead, updateData);
    await lead.save();
    return lead;
  },

  delete: async (id) => {
    const store = getStore();
    if (useFileStore) return await store.delete(id);
    return await store.findByIdAndDelete(id);
  },

  isLocal: () => useFileStore
};

module.exports = { dataService, setStoreMode };
