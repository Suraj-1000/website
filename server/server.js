require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Sync Database and Start Server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
});
