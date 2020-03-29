const router = require("express").Router();
const controller = require("../../controllers/ItemController");

router.route("/").get(controller.getAll);

router.route("/:id").get(controller.getOne);

module.exports = router;
