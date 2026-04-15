const mongoose = require('mongoose')

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Lead name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    source: {
      type: String,
      enum: ['meta', 'google', 'tiktok', 'manual'],
      default: 'manual',
    },
    status: {
      type: String,
      enum: ['new', 'qualified', 'booked', 'converted', 'lost'],
      default: 'new',
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    value: {
      type: Number,
      default: 0,
      min: 0,
    },
    conversation: [
      {
        role: { type: String, enum: ['system', 'ai', 'user'], default: 'ai' },
        content: String,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    analysisReason: {
      type: String,
      default: 'Awaiting first interaction...'
    },
    appointmentDate: {
      type: Date,
      default: null
    },
    bookingLink: {
      type: String,
      default: 'https://calendly.com/primelayer7/30min'
    }
  },
  {
    timestamps: true,
  }
)

// Performance Analytics Indexes
leadSchema.index({ status: 1, source: 1 })
leadSchema.index({ email: 1 }, { unique: true })
leadSchema.index({ createdAt: -1 })

module.exports = mongoose.model('Lead', leadSchema)
