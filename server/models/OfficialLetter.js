const mongoose = require('mongoose');

const OfficialLetterSchema = new mongoose.Schema({
  letter_id: {
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
  tenant_id: {
    type: String,
    required: true,
    enum: ['govt_polytechnic', 'apex_systems'],
    index: true
  },
  letter_type: {
    type: String,
    enum: ['appointment_order', 'offer_letter'],
    required: true
  },
  candidate_name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  compensation_details: {
    type: String,
    required: true
  },
  joining_date: {
    type: String,
    required: true
  },
  is_sealed: {
    type: Boolean,
    default: true
  },
  issued_by: {
    type: String,
    default: 'Principal / HR Talent Operations'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OfficialLetter', OfficialLetterSchema);
