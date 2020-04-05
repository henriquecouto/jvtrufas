const router = require("express").Router();
const controller = require("../../controllers/OrderController");

router.route("/").post(controller.createOrder).get(controller.getAll);
router.route("/:userId").get(controller.getUserOrders);
router
  .route("/:orderId")
  .get(controller.getOrder)
  .delete(controller.cancellOrder)
  .put(controller.addItem)
  .patch(controller.editOrder);

module.exports = router;
