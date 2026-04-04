const router = require("express").Router();
const negotiationController = require("../../controllers/negotiation.controller");
const { checkAuth } = require("../../middlewares/authMiddleware");

// All negotiation routes require authentication
router.use(checkAuth);

router.post("/", negotiationController.processNegotiation);
router.get("/", negotiationController.getAll);
router.get("/product/:id", negotiationController.getNegotiationWithProductId);

router.post("/accept/:id", negotiationController.accept);
router.post("/decline/:id", negotiationController.decline);

module.exports = router;
