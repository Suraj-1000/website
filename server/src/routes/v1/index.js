const { Router } = require('express');
const fs = require('fs');

const router = Router();

/**
 * Auto-register routes from files named *.routes.js
 * Maps filename to URL path (with pluralization if needed)
 */
const routeMap = {
   experience: 'experiences',
   award: 'awards',
   contact: 'contacts',
   skill: 'skills',
   project: 'projects',
   language: 'languages',
   reference: 'references',
};

fs.readdirSync(__dirname).forEach((file) => {
   if (file.endsWith('.routes.js')) {
      const name = file.replace('.routes.js', '');
      const routePath = routeMap[name] || name;
      router.use(`/${routePath}`, require(`./${file}`));
   }
});

module.exports = router;
