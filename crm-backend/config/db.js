const mongoose = require('mongoose')
const { setStoreMode } = require('../services/dataService')

const connectDB = async () => {
  const uri = process.env.MONGODB_URI
  const forceLocal = process.env.USE_LOCAL_STORAGE === 'true'

  if (forceLocal || !uri) {
    if (forceLocal) {
      console.log('🚀 Production Override: USE_LOCAL_STORAGE=true detected.')
    } else {
      console.error('❌ MONGODB_URI is not defined in .env file')
    }
    setStoreMode('file')
    console.log('📂 Local File Storage activated as primary engine.')
    return
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000, // Reduced timeout for faster fallback
      socketTimeoutMS: 45000,
      family: 4,
    })
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    setStoreMode('mongo')
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Refused: ${error.message}`)
    console.log('⚠️  Switching to Local File Persistence mode...')
    setStoreMode('file')
    console.log('📂 Data will be saved to crm-backend/data/leads.json')
  }
}

module.exports = connectDB
