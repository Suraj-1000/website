const { getEnv } = require("../utils/index");

module.exports = {
    NODE_ENV: getEnv("NODE_ENV", "development"),
    PORT: getEnv("PORT", "5000"),
};