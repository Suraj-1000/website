const router = require("express").Router();
const categoryController = require("../../controllers/category.controller");
const validateRequest = require("../../middlewares/validate-request");
const asyncHandler = require("../../middlewares/async-handler");
const { createCategorySchema, updateCategorySchema } = require("../../utils/validations/category.validation");

const { checkAuth } = require("../../middlewares/authMiddleware");
router.get("/", checkAuth, categoryController.getAll);
router.get("/public", categoryController.getAll);
router.get("/:id", checkAuth, categoryController.getById);

// Admin operations
router.post("/", checkAuth, validateRequest(createCategorySchema), categoryController.create);
router.put("/:id", checkAuth, validateRequest(updateCategorySchema), categoryController.update);
router.post("/bulk-delete", checkAuth, categoryController.bulkDelete);
router.delete("/:id", checkAuth, categoryController.delete);

module.exports = router;
