const router = require("express").Router();
const educationController = require("../../controllers/education.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");

const adminOnly = [checkAuth, authorize('admin')];

router.get("/", educationController.getAll);
router.post("/", adminOnly, educationController.create);

router.put("/:id", adminOnly, educationController.update);
router.patch("/:id", adminOnly, educationController.update);
router.delete("/:id", adminOnly, educationController.delete);

module.exports = router;
