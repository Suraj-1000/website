const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/categories", require("./category.routes"));
router.use("/artists-salons", require("./artist-salon.routes"));
router.use("/services", require("./service.routes"));
router.use("/bookings", require("./booking.routes"));
router.use("/events", require("./event.routes"));
router.use("/media", require("./media.routes"));
router.use("/statistics", require("./statistics.routes"));
router.use("/products", require("./product.routes"));
router.use("/negotiations", require("./negotiation.routes"));

module.exports = router;
