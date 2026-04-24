const router = require("express").Router();
const languageController = require("../../controllers/language.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");

const adminOnly = [checkAuth, authorize('admin')];

router.get("/", languageController.getAll);
router.get("/:id", languageController.getById);
router.post("/", adminOnly, languageController.create);

router.put("/:id", adminOnly, languageController.update);
router.patch("/:id", adminOnly, languageController.update);
router.delete("/:id", adminOnly, languageController.delete);

module.exports = router;
