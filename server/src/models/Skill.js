const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please add a category'], // e.g., "Languages", "Web Technologies"
        trim: true
    },
    items: {
        type: [String],
        required: [true, 'Please add skills']
    },
    icon: {
        type: String, // Storing icon name string, frontend will map to Lucide icon
        required: [true, 'Please add an icon name']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Skill', skillSchema);
