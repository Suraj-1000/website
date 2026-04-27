const router = require("express").Router();
const travelController = require("../../controllers/travel.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");
const createUpload = require("../../middlewares/upload.middleware");

const upload = createUpload('private/travel/');
const adminOnly = [checkAuth, authorize('admin')];

router.get("/", travelController.getAll);
router.get("/:id", travelController.getById);
router.post("/", adminOnly, upload.array('images', 5), travelController.create);

router.put("/:id", adminOnly, upload.array('images', 5), travelController.update);
router.patch("/:id", adminOnly, upload.array('images', 5), travelController.update);
router.delete("/:id", adminOnly, travelController.delete);

module.exports = router;
