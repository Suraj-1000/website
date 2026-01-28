require('dotenv').config();
const { sequelize } = require('./src/config/db');
const User = require('./src/models/User');

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync(); // Ensure tables exist
        console.log('Connected to database and synced.');

        const adminEmail = 'admin@gmail.com';
        const adminPassword = 'admin';

        const existingAdmin = await User.findOne({ where: { email: adminEmail } });

        if (existingAdmin) {
            console.log('Admin user already exists.');
        } else {
            await User.create({
                name: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            console.log('Admin user created successfully.');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await sequelize.close();
        process.exit();
    }
};

seedAdmin();
