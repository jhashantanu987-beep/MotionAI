const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// Meta Webhook Verification
router.get('/webhook', whatsappController.verifyWebhook);

// Receive incoming messages from WhatsApp
router.post('/webhook', whatsappController.handleIncomingMessage);

module.exports = router;
