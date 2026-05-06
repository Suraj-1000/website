const { getEnv } = require("../utils/index");
require('dotenv').config();

const requiredEnv = [
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'DB_HOST',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET'
];

// Check for missing required environment variables
requiredEnv.forEach((env) => {
    if (!process.env[env]) {
        console.warn(`WARNING: Missing required environment variable: ${env}`);
    }
});

module.exports = {
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "5000"),
    DB: {
        NAME: getEnv("DB_NAME"),
        USER: getEnv("DB_USER"),
        PASSWORD: getEnv("DB_PASSWORD"),
        HOST: getEnv("DB_HOST", "localhost"),
    },
    JWT: {
        SECRET: getEnv("JWT_SECRET"),
        EXPIRE: getEnv("JWT_ACCESS_EXPIRE", "1d"),
        REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
        REFRESH_EXPIRE: getEnv("JWT_REFRESH_EXPIRE", "7d"),
    },
    EMAIL: {
        USER: getEnv("GMAIL_USER"),
        PASS: getEnv("GMAIL_PASS"),
    },
    CLIENT_URL: getEnv("CLIENT_URL", "http://localhost:5173")
};
