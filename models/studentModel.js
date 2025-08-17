const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6 
  },
  college: {
    type: String,
    required: true,
    minlength: 6 
  },
  contactNumber: {
    type: String,
    match: /^\d{10}$/ 
  },
  enrolledCourses: {
    type: [String],
    required: true 
  },
  trnNumber: {
    type: String,
    trim: true
  },
  amountPaid: {
    type: String,
    // required: true,
    trim: true
  },
  status: {
    type: String,
    // default: pending,
    enum: ["pending", "completed"],
  },
  role: {
    type: String,
    enum: ["student"],
    default: "student"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', studentSchema);