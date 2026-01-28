require('dotenv').config();
const { sequelize } = require('./src/config/db');
const User = require('./src/models/User');

const verifyUser = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to database.');

        const email = 'admin@gmail.com';
        const password = 'admin';

        const user = await User.findOne({ where: { email } });

        if (!user) {
            console.log('User not found!');
        } else {
            console.log('User found:', user.email);
            console.log('Stored Hash:', user.password);

            const isMatch = await user.matchPassword(password);
            console.log('Password Match:', isMatch);
        }

    } catch (error) {
        console.error('Error verifying user:', error);
    } finally {
        await sequelize.close();
        process.exit();
    }
};

verifyUser();
