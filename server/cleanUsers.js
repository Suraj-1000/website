const path = require('path');
const moduleAlias = require('module-alias');

moduleAlias.addAliases({
    '@': path.join(__dirname, 'src')
});

const db = require('./src/database/models');

async function cleanUsers() {
    try {
        await db.User.destroy({ where: {} });
        console.log('All users deleted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error cleaning users:', error.message);
        process.exit(1);
    }
}

cleanUsers();
