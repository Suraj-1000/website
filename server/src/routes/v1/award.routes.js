const router = require("express").Router();
const awardController = require("../../controllers/award.controller");
const { checkAuth, authorize } = require("../../middlewares/authMiddleware");
const createUpload = require("../../middlewares/upload.middleware");

const upload = createUpload('private/award/');
const adminOnly = [checkAuth, authorize('admin')];

router.get("/", awardController.getAll);
router.post("/", adminOnly, upload.array('images', 2), awardController.create);

router.put("/:id", adminOnly, upload.array('images', 2), awardController.update);
router.patch("/:id", adminOnly, upload.array('images', 2), awardController.update);
router.delete("/:id", adminOnly, awardController.delete);

module.exports = router;
