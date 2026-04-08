const router = require("express").Router();
const projectController = require("../../controllers/project.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");

const adminOnly = [checkAuth, authorize('admin')];

router.get("/", projectController.getAll);
router.post("/", adminOnly, projectController.create);

router.put("/:id", adminOnly, projectController.update);
router.patch("/:id", adminOnly, projectController.update);
router.delete("/:id", adminOnly, projectController.delete);

module.exports = router;
