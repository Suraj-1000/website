const router = require("express").Router();
const projectController = require("../../controllers/project.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");
const createUpload = require("../../middlewares/upload.middleware");

const upload = createUpload('public/projects/');
const adminOnly = [checkAuth, authorize('admin')];

router.get("/", projectController.getAll);
router.get("/:id", projectController.getById);
router.post("/", adminOnly, upload.single('imageUrl'), projectController.create);

router.put("/:id", adminOnly, upload.single('imageUrl'), projectController.update);
router.patch("/:id", adminOnly, upload.single('imageUrl'), projectController.update);
router.delete("/:id", adminOnly, projectController.delete);

module.exports = router;
