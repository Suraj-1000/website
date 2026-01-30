const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { sequelize, connectDB } = require('./src/config/db');
require('dotenv').config();

// Initialize App
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://127.0.0.1:5173',
    credentials: true
}));
app.use(helmet({ crossOriginResourcePolicy: false })); // Allow loading images
app.use(morgan('dev'));
app.use(cookieParser());

// Static Files (Private/Awards)
app.use('/private', express.static(path.join(__dirname, 'private')));

// Routes
const educationRoutes = require('./src/routes/education.routes');
const projectRoutes = require('./src/routes/project.routes');
const travelRoutes = require('./src/routes/travel.routes');
const contactRoutes = require('./src/routes/contact.routes');

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/education', educationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/experiences', require('./src/routes/experience.routes'));
app.use('/api/skills', require('./src/routes/skill.routes'));
app.use('/api/awards', require('./src/routes/award.routes'));
app.use('/api/languages', require('./src/routes/language.routes'));
app.use('/api/references', require('./src/routes/reference.routes'));
app.use('/api/auth', require('./src/routes/auth.routes'));

// Error Handling Middleware
app.use(require('./src/middlewares/errorHandler'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to sync database:', error);
    }
};

startServer();
