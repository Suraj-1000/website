const router = require("express").Router();
const skillController = require("../../controllers/skill.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");

const adminOnly = [checkAuth, authorize('admin')];

router.get("/", skillController.getAll);
router.post("/", adminOnly, skillController.create);

router.put("/:id", adminOnly, skillController.update);
router.patch("/:id", adminOnly, skillController.update);
router.delete("/:id", adminOnly, skillController.delete);

module.exports = router;
