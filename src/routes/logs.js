const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Validation middleware for log payloads
function validateLog(req, res, next) {
  const { level, message, source, metadata } = req.body;
  // Check required fields
  if (!level || typeof level !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "level" (string) field.' });
  }
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "message" (string) field.' });
  }
  if (!source || typeof source !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "source" (string) field.' });
  }
  // metadata is optional but if present, must be an object
  if (metadata && typeof metadata !== 'object') {
    return res.status(400).json({ error: 'Invalid "metadata" (must be an object if present).' });
  }
  next();
}

// POST /logs - Ingest a new log
router.post('/', validateLog, async (req, res) => {
  const { level, message, source, metadata } = req.body;
  try {
    const [log] = await db('logs')
      .insert({ level, message, source, metadata })
      .returning(['id', 'timestamp', 'level', 'message', 'source', 'metadata', 'created_at']);
    res.status(201).json({ message: 'Log saved', log });
  } catch (error) {
    console.error('Error saving log:', error);
    res.status(500).json({ error: 'Failed to save log' });
  }
});

// GET /logs - Fetch all logs
router.get('/', async (req, res) => {
  try {
    const logs = await db('logs').orderBy('timestamp', 'desc');
    res.json({ logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

module.exports = router; 