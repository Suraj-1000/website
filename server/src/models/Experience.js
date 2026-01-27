const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, 'Please add a role/job title']
    },
    company: {
        type: String,
        required: [true, 'Please add a company name']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    startDate: {
        type: String, // Keeping as string to match "Nov 2024" format for simplicity, or could use Date
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: String, // Keeping as string for "Present" or "Nov 2025"
        required: [true, 'Please add an end date']
    },
    description: {
        type: [String],
        required: [true, 'Please add description points']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Experience', experienceSchema);
