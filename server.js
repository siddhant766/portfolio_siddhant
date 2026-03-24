require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const Visitor = require('./models/Visitor');

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// CORS — allow all origins during development
app.use(cors());

// ─────────────────────────────────────────
// Routes
// ─────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: '👋 Portfolio API is running.', status: 'ok' });
});

app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Visitor tracking endpoint (called from frontend on page load)
app.post('/api/visit', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    await Visitor.findOneAndUpdate(
      { date: today },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error('Visitor tracking error:', err);
    res.status(500).json({ success: false });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found.' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Something went wrong.' });
});

// ─────────────────────────────────────────
// Database + Server startup
// ─────────────────────────────────────────
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('❌  MONGODB_URI is missing from .env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀  Server running at http://localhost:${PORT}`);
      console.log(`📬  Contact API → http://localhost:${PORT}/api/contact`);
    });
  })
  .catch((err) => {
    console.error('❌  MongoDB connection failed:', err.message);
    process.exit(1);
  });
