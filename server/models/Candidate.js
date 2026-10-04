const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  candidate_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  tenant_id: {
    type: String,
    required: true,
    enum: ['govt_polytechnic', 'apex_systems'],
    index: true
  },
  opening_id: {
    type: String,
    required: true,
    ref: 'JobOpening',
    index: true
  },
  full_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  phone: {
    type: String,
    required: true
  },
  resume_url: {
    type: String,
    default: null
  },
  extracted_skills: [{
    type: String,
    trim: true
  }],
  ats_score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: [
      'applied',
      'screening',
      'interview_scheduled',
      'evaluated',
      'shortlisted',
      'rejected',
      'hired'
    ],
    default: 'applied',
    index: true
  },
  interview_token: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Compound index for HR filtering
CandidateSchema.index({ tenant_id: 1, opening_id: 1, status: 1 });

module.exports = mongoose.model('Candidate', CandidateSchema);
