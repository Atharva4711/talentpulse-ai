const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Please provide full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false // Excluded from query results by default for security
  },
  role: {
    type: String,
    enum: ['candidate', 'hr_recruiter', 'admin', 'interviewer'],
    default: 'candidate',
    index: true
  },
  tenant_id: {
    type: String,
    enum: ['govt_polytechnic', 'apex_systems'],
    required: true,
    index: true
  },
  phone: {
    type: String,
    trim: true
  },
  is_verified: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Compound index for login query speed
UserSchema.index({ email: 1, tenant_id: 1 });

module.exports = mongoose.model('User', UserSchema);
