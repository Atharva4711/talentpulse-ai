const mongoose = require('mongoose');

const JobOpeningSchema = new mongoose.Schema({
  opening_id: {
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
  title: {
    type: String,
    required: [true, 'Job title is mandatory'],
    trim: true
  },
  department: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  required_skills: [{
    type: String,
    trim: true
  }],
  min_experience_years: {
    type: Number,
    default: 0
  },
  vacancies: {
    type: Number,
    default: 1
  },
  salary_range: {
    type: String,
    default: 'Competitive CTC'
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active',
    index: true
  }
}, {
  timestamps: true
});

// Compound index for lightning-fast multi-tenant role queries
JobOpeningSchema.index({ tenant_id: 1, status: 1 });

module.exports = mongoose.model('JobOpening', JobOpeningSchema);
