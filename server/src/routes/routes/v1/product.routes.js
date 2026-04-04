const router = require("express").Router();
const productController = require("../../controllers/product.controller");
const { validateRequest } = require("../../middlewares");
const { checkAuth, checkAuthNonStrict } = require("../../middlewares/authMiddleware");
const { isAdminOrVendor } = require("../../middlewares/authorization");
const { createProductSchema, updateProductSchema } = require("../../utils/validations/product.validation");

router.get("/public", productController.getAllPublic);
router.get("/", checkAuth, productController.getAll);
router.post("/", checkAuth, isAdminOrVendor, validateRequest(createProductSchema), productController.create);

router.get("/:id", checkAuthNonStrict, productController.getById);
router.put("/:id", checkAuth, isAdminOrVendor, validateRequest(updateProductSchema), productController.update);
router.patch("/:id/toggle-status", checkAuth, isAdminOrVendor, productController.toggleStatus);
router.post("/bulk-delete", checkAuth, isAdminOrVendor, productController.bulkDelete);
router.delete("/:id", checkAuth, isAdminOrVendor, productController.delete);

module.exports = router;
