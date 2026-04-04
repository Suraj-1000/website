const router = require("express").Router();
const artistSalonController = require("../../controllers/artist-salon.controller");
const { validateRequest } = require("../../middlewares");
const { checkAuth, checkAuthNonStrict } = require("../../middlewares/authMiddleware");
const { isAdminOrVendor } = require("../../middlewares/authorization");
const { createArtistSalonSchema, updateArtistSalonSchema } = require("../../utils/validations/artist-salon.validation");



router.get("/", checkAuth, artistSalonController.getAll);
router.get("/me", checkAuth, artistSalonController.getMine);
router.post("/", checkAuth, isAdminOrVendor, validateRequest(createArtistSalonSchema), artistSalonController.create);

router.get("/:id", checkAuth, artistSalonController.getById);
router.put("/:id", checkAuth, isAdminOrVendor, validateRequest(updateArtistSalonSchema), artistSalonController.update);
router.patch("/:id/toggle-status", checkAuth, isAdminOrVendor, artistSalonController.toggleStatus);
router.post("/bulk-delete", checkAuth, isAdminOrVendor, artistSalonController.bulkDelete);
router.delete("/:id", checkAuth, isAdminOrVendor, artistSalonController.delete);

module.exports = router;
