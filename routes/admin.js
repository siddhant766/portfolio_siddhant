const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Visitor = require('../models/Visitor');
const Contact = require('../contact');

// ─────────────────────────────────────────
// POST /api/admin/login
// ─────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required.' });
    }

    // Check username
    if (username !== process.env.ADMIN_USER) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASS_HASH);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials.' });
    }

    // Generate JWT (expires in 24 hours)
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ success: true, token });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ success: false, error: 'Server error.' });
  }
});

// ─────────────────────────────────────────
// GET /api/admin/stats  (Protected)
// ─────────────────────────────────────────
router.get('/stats', auth, async (req, res) => {
  try {
    // Total visitors (all time)
    const allVisitors = await Visitor.find().sort({ date: -1 });
    const totalVisitors = allVisitors.reduce((sum, v) => sum + v.count, 0);

    // Today's visitors
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = allVisitors.find(v => v.date === today);
    const todayVisitors = todayRecord ? todayRecord.count : 0;

    // Last 30 days for chart
    const last30 = allVisitors.slice(0, 30).reverse();

    // Contact messages count
    const totalMessages = await Contact.countDocuments();
    const unreadMessages = await Contact.countDocuments({ status: 'unread' });

    res.json({
      success: true,
      stats: {
        totalVisitors,
        todayVisitors,
        totalMessages,
        unreadMessages,
        dailyVisitors: last30
      }
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch stats.' });
  }
});

// ─────────────────────────────────────────
// GET /api/admin/messages  (Protected)
// ─────────────────────────────────────────
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, messages });
  } catch (err) {
    console.error('Messages error:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch messages.' });
  }
});

// ─────────────────────────────────────────
// PATCH /api/admin/messages/:id  (Protected - mark as read)
// ─────────────────────────────────────────
router.patch('/messages/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status.' });
    }
    const message = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found.' });
    }
    res.json({ success: true, message });
  } catch (err) {
    console.error('Update message error:', err);
    res.status(500).json({ success: false, error: 'Failed to update message.' });
  }
});

// ─────────────────────────────────────────
// DELETE /api/admin/messages/:id  (Protected - delete message)
// ─────────────────────────────────────────
router.delete('/messages/:id', auth, async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, error: 'Message not found.' });
    }
    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    console.error('Delete message error:', err);
    res.status(500).json({ success: false, error: 'Failed to delete message.' });
  }
});

module.exports = router;
