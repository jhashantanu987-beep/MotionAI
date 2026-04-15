const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');
const ugcStore = require('../services/FileUGCStore');

/**
 * @route   POST /api/ai/ugc-generate
 * @desc    Generate and SAVE viral UGC content scripts
 */
router.post('/ugc-generate', async (req, res) => {
  try {
    const { topic, platform, type, tone, targetAudience } = req.body;
    
    if (!topic) {
      return res.status(400).json({ success: false, message: 'Topic vector is required for synthesis.' });
    }

    const aiContent = await aiService.generateUGCContent({ 
      topic, platform, type, tone, targetAudience 
    });

    // Save to database with new structured fields
    const savedItem = await ugcStore.create({
      title: topic.substring(0, 50),
      content: aiContent.content,
      hooks: aiContent.hooks || [],
      hashtags: aiContent.hashtags || [],
      engagementPotential: aiContent.engagementPotential || 90,
      platform,
      type,
      status: 'draft'
    });

    res.json({
      success: true,
      data: savedItem
    });
  } catch (error) {
    console.error('❌ AI Route Error:', error);
    
    // Log detailed error for debugging
    const fs = require('fs');
    fs.appendFileSync('ai_error.log', `${new Date().toISOString()} - UGC ERROR: ${error.message}\n${error.stack}\n`);

    res.status(500).json({ 
      success: false, 
      message: 'Neural bridge failed to synthesize asset.',
      error: error.message 
    });
  }
});

/**
 * @route   GET /api/ai/ugc-library
 * @desc    Get all synthesized assets
 */
router.get('/ugc-library', async (req, res) => {
  try {
    const items = await ugcStore.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to access neural vault.' });
  }
});

/**
 * @route   GET /api/ai/ugc-performance
 * @desc    Get aggregated performance metrics
 */
router.get('/ugc-performance', async (req, res) => {
  try {
    const stats = await ugcStore.getPerformanceStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to synthesize metrics.' });
  }
});

module.exports = router;
