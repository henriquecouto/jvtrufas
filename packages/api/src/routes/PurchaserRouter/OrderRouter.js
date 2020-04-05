const router = require("express").Router();
const controller = require("../../controllers/OrderController");
const orderMiddleware = require("../../middlewares/orderMiddleware");

router.route("/").post(controller.createOrder);
router.route("/:userId").get(controller.getUserOrders);

router.use(orderMiddleware);

router
  .route("/:orderId")
  .get(controller.getOrder)
  .delete(controller.cancellOrder)
  .put(controller.addItem)
  .patch(controller.makeOrder);

module.exports = router;
