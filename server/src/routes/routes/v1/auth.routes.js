const { Router } = require("express");
const { AuthController } = require("../../controllers/");
const { asyncHandler } = require("../../middlewares");
const { checkAuth } = require("../../middlewares/authMiddleware");

class AuthRoutes {
    constructor() {
        this.router = Router();
        this.controller = new AuthController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        // Authentication Routes
        this.router.post("/redirect-to-auth-server", asyncHandler(this.controller.redirectToAuthServer));
        this.router.post("/exchange-code", asyncHandler(this.controller.exchangeCode));
        this.router.get("/me", checkAuth, asyncHandler(this.controller.getLoggedInUser));
        this.router.post("/refresh-token", asyncHandler(this.controller.refreshToken));
        this.router.post("/logout", checkAuth, this.controller.logout);

        this.router.put("/update-profile", checkAuth, asyncHandler(this.controller.updateProfile));
        this.router.post("/change-password", checkAuth, asyncHandler(this.controller.changePassword));

        // User management
        this.router.get("/users", checkAuth, asyncHandler(this.controller.getAllUsers));
        this.router.get("/users/:id", checkAuth, asyncHandler(this.controller.getUserById));
        this.router.patch("/users/:id/status", checkAuth, asyncHandler(this.controller.updateUserStatus));
        this.router.put("/users/:id", checkAuth, asyncHandler(this.controller.updateUser));
        this.router.post("/users/bulk-delete", checkAuth, asyncHandler(this.controller.bulkDeleteUsers));
        this.router.delete("/users/:id", checkAuth, asyncHandler(this.controller.deleteUser));

        return this.router;
    }
}

module.exports = new AuthRoutes().initializeRoutes();