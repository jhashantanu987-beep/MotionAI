const express = require('express')
const router = express.Router()
const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require('../controllers/leadController')
const { validateCreateLead, validateUpdateLead } = require('../middlewares/validateLead')

// ─── PUBLIC ROUTES ──────────────────────────────────────────────────────────
// POST   /api/leads/public-chat - Chat for website visitors (guests)
// MUST BE AT THE TOP to avoid being caught by /:id dynamic params
const { handlePublicChat } = require('../controllers/chatController')
router.post('/public-chat', handlePublicChat)

// ─── LEADS MANAGEMENT ───────────────────────────────────────────────────────
// POST   /api/leads          - Create a new lead
router.post('/', validateCreateLead, createLead)

// GET    /api/leads           - Get all leads (filters: ?status=new&source=meta)
router.get('/', getLeads)

// GET    /api/leads/analytics - Get lead analytics (Total Revenue, Funnel, Source)
// MUST BE PLACED BEFORE /:id TO AVOID BEING TREATED AS AN ID
const { getAnalytics } = require('../controllers/leadController')
router.get('/analytics', getAnalytics)

// GET    /api/leads/:id       - Get a specific lead by ID
router.get('/:id', getLeadById)

// POST   /api/leads/:id/chat  - Continue a multi-turn conversation with the AI
const { chatWithLead } = require('../controllers/leadController')
router.post('/:id/chat', chatWithLead)

// PATCH  /api/leads/:id       - Update lead status, score, or notes
router.patch('/:id', validateUpdateLead, updateLead)

// DELETE /api/leads/:id       - Delete a lead
router.delete('/:id', deleteLead)

module.exports = router
