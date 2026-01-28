const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { connectDB } = require('./config/db');

// Initialize App
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
const educationRoutes = require('./routes/education.routes');
const projectRoutes = require('./routes/project.routes');
const travelRoutes = require('./routes/travel.routes');
const contactRoutes = require('./routes/contact.routes');

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/education', educationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/experiences', require('./routes/experience.routes'));
app.use('/api/skills', require('./routes/skill.routes'));
app.use('/api/awards', require('./routes/award.routes'));
app.use('/api/languages', require('./routes/language.routes'));
app.use('/api/references', require('./routes/reference.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

// Error Handling Middleware
app.use(require('./middlewares/errorHandler'));

module.exports = app;
