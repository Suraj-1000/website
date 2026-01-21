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

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/education', educationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/travel', travelRoutes);

// Error Handling Middleware
app.use(require('./middlewares/error.middleware'));

module.exports = app;
