const express = require('express');
const router = express.Router();
const adStore = require('../services/FileAdStore');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

// GET /api/campaigns?platform=all
router.get('/', async (req, res) => {
  try {
    const { platform } = req.query;
    const campaigns = await adStore.getAll(platform);
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch campaigns' });
  }
});

// GET /api/campaigns/performance
router.get('/performance', async (req, res) => {
  try {
    const data = await adStore.getPerformance();
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch performance' });
  }
});

// POST /api/campaigns
router.post('/', async (req, res) => {
  try {
    const campaign = await adStore.create(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create campaign' });
  }
});

// PATCH /api/campaigns/:id
router.patch('/:id', async (req, res) => {
  try {
    const updated = await adStore.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Campaign not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update campaign' });
  }
});

// DELETE /api/campaigns/:id
router.delete('/:id', async (req, res) => {
  try {
    await adStore.delete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete campaign' });
  }
});

// POST /api/campaigns/ai-optimize — AI Budget Recommendation
router.post('/ai-optimize', async (req, res) => {
  try {
    const campaigns = await adStore.getAll();
    const prompt = `
      You are an expert Media Buyer and AI Ad Performance Strategist.
      Analyze these campaigns and return a JSON array of budget recommendations.
      
      Campaigns: ${JSON.stringify(campaigns.map(c => ({ name: c.name, platform: c.platform, roas: c.roas, ctr: c.ctr, conversions: c.conversions, spent: c.spent, budget: c.budget })))}
      
      Return ONLY a JSON array like:
      [{ "campaignName": "...", "recommendation": "Increase by 20%", "reason": "High ROAS of 4.2x", "action": "increase" }]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return res.json({ success: true, data: JSON.parse(jsonMatch[0]) });
    }
    throw new Error('AI parse failed');
  } catch (err) {
    // Fallback
    const campaigns = await adStore.getAll();
    const fallback = campaigns.map(c => ({
      campaignName: c.name,
      recommendation: c.roas > 3 ? 'Increase by 25%' : c.roas > 1.5 ? 'Maintain budget' : 'Pause & review',
      reason: c.roas > 3 ? `Strong ROAS of ${c.roas}x — scale immediately` : c.roas > 1.5 ? 'Moderate performance, observe' : 'Low ROAS, needs creative refresh',
      action: c.roas > 3 ? 'increase' : c.roas > 1.5 ? 'maintain' : 'pause'
    }));
    res.json({ success: true, data: fallback });
  }
});

module.exports = router;
