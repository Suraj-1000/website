const router = require("express").Router();
const referenceController = require("../../controllers/reference.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");
const createUpload = require("../../middlewares/upload.middleware");

const upload = createUpload('public/references/');
const adminOnly = [checkAuth, authorize('admin')];

router.get("/", referenceController.getAll);
router.get("/:id", referenceController.getById);
router.post("/", adminOnly, upload.single('imageUrl'), referenceController.create);

router.put("/:id", adminOnly, upload.single('imageUrl'), referenceController.update);
router.patch("/:id", adminOnly, upload.single('imageUrl'), referenceController.update);
router.delete("/:id", adminOnly, referenceController.delete);

module.exports = router;
