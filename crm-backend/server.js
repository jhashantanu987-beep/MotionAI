require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const leadRoutes = require('./routes/leadRoutes')
const errorHandler = require('./middlewares/errorHandler')

// ─── Bootstrap Database ────────────────────────────────────────────────────
connectDB()

// ─── Express App ──────────────────────────────────────────────────────────
const app = express()

// ─── Core Middlewares ─────────────────────────────────────────────────────
// ─── Core Middlewares ─────────────────────────────────────────────────────
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ─── Health Check ─────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 KLARA CRM API is running',
    version: '1.0.0',
    endpoints: {
      leads: '/api/leads',
      docs: 'See README.md for Postman usage',
    },
  })
})

// ─── API Routes ───────────────────────────────────────────────────────────
app.use('/api/leads', leadRoutes)
app.use('/api/ai', require('./routes/aiRoutes'))
app.use('/api/campaigns', require('./routes/campaignRoutes'))
app.use('/api/whatsapp', require('./routes/whatsappRoutes'))

// ─── 404 Handler ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
})

// ─── Global Error Handler (must be LAST) ──────────────────────────────────
app.use(errorHandler)

// ─── Start Server ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
  console.log(`✅ KLARA CRM Server running on port ${PORT}`)
  
  // Start the background No-Show Recovery Cron
  const reminderService = require('./services/reminderService')
  reminderService.start()
})
