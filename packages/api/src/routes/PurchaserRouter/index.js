const router = require("express").Router();
const authMiddleware = require("../../middlewares/authMiddleware");

router.use(authMiddleware("purchaser"));

router.use("/product", require("./ProductRouter"));

module.exports = router;