const router = require("express").Router();
const travelController = require("../../controllers/travel.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");

const adminOnly = [checkAuth, authorize('admin')];

router.get("/", travelController.getAll);
router.post("/", adminOnly, travelController.create);

router.put("/:id", adminOnly, travelController.update);
router.patch("/:id", adminOnly, travelController.update);
router.delete("/:id", adminOnly, travelController.delete);

module.exports = router;
