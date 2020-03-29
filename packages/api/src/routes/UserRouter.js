const router = require("express").Router();
const controller = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/login").post(controller.login);
router.route("/register").post(controller.createUser);

router.use(authMiddleware("admin"));
router.route("/register-admin").post(controller.createAdmin);

module.exports = router;
