const router = require("express").Router();
const controller = require("../../controllers/OrderController");
const orderMiddleware = require("../../middlewares/orderMiddleware");

router.route("/").post(controller.createOrder);
router.route("/").get(controller.getUserOrders);
router.route("/get-instant").get(controller.getInstant);

router.use("/:orderId", orderMiddleware);
router
  .route("/:orderId")
  .get(controller.getOrder)
  .delete(controller.cancellOrder)
  .put(controller.addItem)
  .patch(controller.makeOrder);

module.exports = router;
