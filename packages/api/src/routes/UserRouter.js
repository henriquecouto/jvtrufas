const router = require("express").Router();
const controller = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/login").post(controller.login);
router.route("/register").post(controller.createUser);

router.use("/request-token", authMiddleware("purchaser"));
router.route("/request-token").get(controller.getNewToken);

router.use("/register-admin", authMiddleware("admin"));
router.route("/register-admin").post(controller.createAdmin);

module.exports = router;
