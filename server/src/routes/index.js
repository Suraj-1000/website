const express = require('express');
const router = express.Router();

const educationRoutes = require('./education.routes');
const projectRoutes = require('./project.routes');
const travelRoutes = require('./travel.routes');
const contactRoutes = require('./contact.routes');
const experienceRoutes = require('./experience.routes');
const skillRoutes = require('./skill.routes');
const awardRoutes = require('./award.routes');
const languageRoutes = require('./language.routes');
const referenceRoutes = require('./reference.routes');
const authRoutes = require('./auth.routes');

router.use('/education', educationRoutes);
router.use('/projects', projectRoutes);
router.use('/travel', travelRoutes);
router.use('/contacts', contactRoutes);
router.use('/experiences', experienceRoutes);
router.use('/skills', skillRoutes);
router.use('/awards', awardRoutes);
router.use('/languages', languageRoutes);
router.use('/references', referenceRoutes);
router.use('/auth', authRoutes);

module.exports = router;
