const path = require('path');
const moduleAlias = require('module-alias');

moduleAlias.addAliases({
    '@': path.join(__dirname, 'src')
});

const db = require('./src/database/models');

async function deleteAdmin() {
    try {
        await db.User.destroy({ where: { email: 'admin@admin.com' } });
        console.log('Admin user deleted successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error deleting admin user:', error.message);
        process.exit(1);
    }
}

deleteAdmin();
