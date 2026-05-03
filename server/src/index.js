const express = require("express");
const moduleAlias = require("module-alias");

// Setup module aliases for cleaner imports
moduleAlias.addAliases({ "@": __dirname, });

const { appConfig, envConfig } = require("@/config");
const { errorHandler } = require("@/middlewares");
const db = require("@/database/models");

const app = express();

// Trust proxy for production (correctly handle X-Forwarded-Proto, IP, etc.)
app.set("trust proxy", 1);

// Initialize application middleware and security configurations
appConfig(app);

// Register API Routes
app.use("/api", require("@/routes"));

// Handle 404 - Not Found
app.use((req, res) =>
   res.status(404).json({
      success: false,
      message: `Route ${req.path} not found`,
      timestamp: new Date().toISOString(),
   })
);

// Global Centralized Error Handler
app.use(errorHandler);

/**
 * Database Connection and Server Startup
 */
db.sequelize
   .authenticate()
   .then(() => {
      console.log("-----------------------------------------");
      console.log("Postgres connected successfully");
      return db.sequelize.sync({ alter: true }); // Automatically create/update tables
   })
   .then(() => {
      console.log("Database synchronized");
      console.log("-----------------------------------------");
      
      app.listen(envConfig.PORT, "0.0.0.0", () => {
         console.log(`App running on port ${envConfig.PORT} in ${envConfig.NODE_ENV} mode`);
         console.log("App restarted to load configurations.");
      });
   })
   .catch((err) => {
      console.error("CRITICAL ERROR: Unable to connect/sync the database:", err);
      process.exit(1);
   });
