const router = require("express").Router();
const serviceController = require("../../controllers/service.controller");
const { validateRequest } = require("../../middlewares");
const { checkAuth, checkAuthNonStrict } = require("../../middlewares/authMiddleware");
const { isAdminOrVendor } = require("../../middlewares/authorization");
const { createServiceSchema, updateServiceSchema } = require("../../utils/validations/service.validation");

router.get("/me", checkAuth, serviceController.getMyServices);
router.get("/", checkAuthNonStrict, serviceController.getAll);
router.get("/:id", checkAuthNonStrict, serviceController.getById);

// Vendor/Admin operations
router.post("/", checkAuth, isAdminOrVendor, validateRequest(createServiceSchema), serviceController.create);
router.put("/:id", checkAuth, isAdminOrVendor, validateRequest(updateServiceSchema), serviceController.update);
router.post("/bulk-delete", checkAuth, isAdminOrVendor, serviceController.bulkDelete);
router.delete("/:id", checkAuth, isAdminOrVendor, serviceController.delete);

module.exports = router;
