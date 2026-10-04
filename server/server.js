/**
 * TalentPulse AI — Express MERN Backend Server & REST API Gateway
 * Managed by Backend Leads: Atharva Teli & Viraj
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Models
const User = require('./models/User');
const JobOpening = require('./models/JobOpening');
const Candidate = require('./models/Candidate');
const Evaluation = require('./models/Evaluation');
const OfficialLetter = require('./models/OfficialLetter');

// -------------------------------------------------------------
// 1. HEALTH & DATABASE STATUS ROUTE
// -------------------------------------------------------------
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const stateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: 'healthy',
    platform: 'TalentPulse AI MERN Gateway',
    leads: ['Atharva Teli', 'Viraj'],
    database: {
      status: stateMap[mongoose.connection.readyState],
      name: mongoose.connection.name,
      host: mongoose.connection.host,
      cluster: 'Cluster0 (Atlas Cloud)'
    },
    timestamp: new Date().toISOString()
  });
});

// -------------------------------------------------------------
// 2. AUTHENTICATION & USERS ROUTES
// -------------------------------------------------------------
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, tenant_id } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const query = { email: email.toLowerCase() };
    if (tenant_id) query.tenant_id = tenant_id;

    const user = await User.findOne(query).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials or user not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenant_id: user.tenant_id
      },
      token: `jwt_session_token_${user.user_id}_${Date.now()}`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 3. JOB OPENINGS CRUD ROUTES
// -------------------------------------------------------------
app.get('/api/openings', async (req, res) => {
  try {
    const { tenant_id, status } = req.query;
    const filter = {};
    if (tenant_id) filter.tenant_id = tenant_id;
    if (status) filter.status = status;

    const openings = await JobOpening.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: openings.length, data: openings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/openings', async (req, res) => {
  try {
    const opening = await JobOpening.create(req.body);
    res.status(201).json({ success: true, data: opening });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 4. CANDIDATES & APPLICATIONS ROUTES
// -------------------------------------------------------------
app.get('/api/candidates', async (req, res) => {
  try {
    const { tenant_id, opening_id, status } = req.query;
    const filter = {};
    if (tenant_id) filter.tenant_id = tenant_id;
    if (opening_id) filter.opening_id = opening_id;
    if (status) filter.status = status;

    const candidates = await Candidate.find(filter).sort({ ats_score: -1 });
    res.json({ success: true, count: candidates.length, data: candidates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/candidates', async (req, res) => {
  try {
    const candidate = await Candidate.create(req.body);
    res.status(201).json({ success: true, data: candidate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch('/api/candidates/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const candidate = await Candidate.findOneAndUpdate(
      { candidate_id: req.params.id },
      { status },
      { new: true }
    );
    if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
    res.json({ success: true, data: candidate });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 5. EVALUATIONS & OFFICIAL LETTERS ROUTES
// -------------------------------------------------------------
app.get('/api/evaluations/:candidateId', async (req, res) => {
  try {
    const evaluation = await Evaluation.findOne({ candidate_id: req.params.candidateId });
    if (!evaluation) return res.status(404).json({ error: 'Evaluation not found for this candidate' });
    res.json({ success: true, data: evaluation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/letters/:candidateId', async (req, res) => {
  try {
    const letter = await OfficialLetter.findOne({ candidate_id: req.params.candidateId });
    if (!letter) return res.status(404).json({ error: 'Official letter not found for this candidate' });
    res.json({ success: true, data: letter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 [Server] TalentPulse AI MERN Server running on port ${PORT}`);
});
