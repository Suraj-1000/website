const router = require("express").Router();
const experienceController = require("../../controllers/experience.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");

const adminOnly = [checkAuth, authorize('admin')];

router.get("/", experienceController.getAll);
router.post("/", adminOnly, experienceController.create);

router.put("/:id", adminOnly, experienceController.update);
router.patch("/:id", adminOnly, experienceController.update);
router.delete("/:id", adminOnly, experienceController.delete);

module.exports = router;
