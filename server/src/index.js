const express = require("express");
const moduleAlias = require("module-alias");

// Setup module aliases
moduleAlias.addAliases({ "@": __dirname, });

const { appConfig, envConfig } = require("@/config");
const { errorHandler } = require("@/middlewares");
const db = require("@/database/models");

const app = express();

// Trust proxy for production (correctly handle X-Forwarded-Proto, IP, etc.)
app.set("trust proxy", 1);

// app configurations
appConfig(app);

//Routes
app.use("/api", require("@/routes"));

// Invalid Route
app.use((req, res) =>
   res.status(404).json({
      success: false,
      message: `Route ${req.path} not found`,
      timestamp: new Date().toISOString(),
   })
);

// Global Error Handler
app.use(errorHandler);

db.sequelize
   .authenticate()
   .then(() => {
      console.log("Postgres connected successfully");
      return db.sequelize.sync({ alter: true }); // Automatically create/update tables
   })
   .then(() => console.log("Database synchronized"))
   .catch((err) => console.error("Unable to connect/sync the database:", err));
// Server Configuration
app.listen(envConfig.PORT, "0.0.0.0", () =>
   console.log(`App running on port ${envConfig.PORT} in ${envConfig.NODE_ENV} mode`)
);

// Restarting to ensure .env changes apply
console.log("App restarted to load new app password.");
