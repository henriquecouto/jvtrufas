const router = require("express").Router();
const controller = require("../../controllers/AddressController");

router.route("/").post(controller.create).get(controller.getAll);
router.route("/:addressId").delete(controller.delete);

module.exports = router;
