const express = require("express");
const path = require("path");
const { envConfig, appConfig } = require("./src/config");
const { sequelize, connectDB } = require("./src/config/db");

const app = express();

// Application Configurations
appConfig(app);

// Serve Static Files
app.use("/public", express.static("public"));
app.use("/private", express.static("private"));

// Routes
app.use("/api", require("./src/routes"));

app.get("/", (req, res) => {
    res.send("API is running...");
});

// Route not found
app.use((req, res) =>
    res.status(404).json({
        success: false,
        message: `Route ${req.path} not found.`,
        timeStamp: new Date(),
    })
);

// Error Handling Middleware
app.use(require("./src/middlewares/errorHandler"));

// Server Connection
const startServer = async () => {
    try {
        // Connect to PostgreSQL
        await connectDB();

        // Sync Sequelize models
        await sequelize.sync();
        console.log("PostgreSQL models synced successfully");

        // Graceful shutdown
        process.on("SIGTERM", async () => {
            console.log("SIGTERM received, shutting down gracefully...");
            await sequelize.close();
            process.exit(0);
        });

        process.on("SIGINT", async () => {
            console.log("SIGINT received, shutting down gracefully...");
            await sequelize.close();
            process.exit(0);
        });

        app.listen(envConfig.PORT, () =>
            console.log(
                `Server running at http://127.0.0.1:${envConfig.PORT} in ${envConfig.NODE_ENV} mode.`
            )
        );
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
