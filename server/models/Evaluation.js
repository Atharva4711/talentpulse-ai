const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  evaluation_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  candidate_id: {
    type: String,
    required: true,
    ref: 'Candidate',
    index: true
  },
  opening_id: {
    type: String,
    required: true,
    ref: 'JobOpening'
  },
  tenant_id: {
    type: String,
    required: true,
    enum: ['govt_polytechnic', 'apex_systems'],
    index: true
  },
  composite_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  technical_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  communication_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  problem_solving_score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  integrity_score: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  proctoring_flags: {
    tab_switches: { type: Number, default: 0 },
    gaze_deviations: { type: Number, default: 0 },
    multiple_faces_detected: { type: Number, default: 0 }
  },
  star_breakdown: {
    situation: { type: String, default: 'Clear contextual background provided' },
    task: { type: String, default: 'Identified problem constraints and requirements' },
    action: { type: String, default: 'Systematic solution applied with verified logic' },
    result: { type: String, default: 'Positive outcome with quantifiable impact' }
  },
  acoustic_metrics: {
    average_wpm: { type: Number, default: 135 },
    filler_words_count: { type: Number, default: 2 },
    speech_confidence: { type: Number, default: 0.88 }
  },
  verdict: {
    type: String,
    required: true,
    default: 'Recommended for Selection'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);
