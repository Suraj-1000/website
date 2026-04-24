const router = require("express").Router();
const referenceController = require("../../controllers/reference.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");

const adminOnly = [checkAuth, authorize('admin')];

router.get("/", referenceController.getAll);
router.get("/:id", referenceController.getById);
router.post("/", adminOnly, referenceController.create);

router.put("/:id", adminOnly, referenceController.update);
router.patch("/:id", adminOnly, referenceController.update);
router.delete("/:id", adminOnly, referenceController.delete);

module.exports = router;
