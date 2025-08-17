
const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String // URL to image
  },
  linkedIn: {
    type: String,
    // match: /^https?:\/\/(www\.)?linkedin\.com\/.*$/ 
  },
  expertise: {
    type: String,
    required: true
  },
});

// Define the schema for the Course.
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"]
  },
  duration: {
    type: Number,
    required: true,
    min: 1 
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  Nmin: {
    type: Number,
    required: true,
    min: 0
  },
  Nmax: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
  },
  curriculum: {
    type: String
  },
  image: {
    type: String 
  },
  instructor: {
    type: instructorSchema, 
    required: true
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Course", courseSchema);