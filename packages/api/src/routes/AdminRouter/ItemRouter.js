const router = require("express").Router();
const controller = require("../../controllers/ItemController");

router.route("/").post(controller.createItem).get(controller.getAll);

router
  .route("/:itemId")
  .get(controller.getOne)
  .delete(controller.delete)
  .put(controller.edit)
  .patch(controller.edit);

module.exports = router;
