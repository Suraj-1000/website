const router = require("express").Router();

router.use('/auth',        require('./auth.routes'));
router.use('/experiences', require('./experience.routes'));
router.use('/education',   require('./education.routes'));
router.use('/awards',      require('./award.routes'));
router.use('/contacts',    require('./contact.routes'));
router.use('/skills',      require('./skill.routes'));
router.use('/projects',    require('./project.routes'));
router.use('/languages',   require('./language.routes'));
router.use('/references',  require('./reference.routes'));
router.use('/travel',      require('./travel.routes'));

module.exports = router;
