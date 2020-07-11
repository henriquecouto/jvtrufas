const router = require("express").Router();
const controller = require("../../controllers/OrderController");

const orderMiddleware = require("../../middlewares/orderMiddleware");

router.route("/").post(controller.createOrder).get(controller.getAll);
router.route("/user/:userId").get(controller.getUserOrders);
router.route("/toggle-instant").get(controller.toggleInstant);
router.route("/get-instant").get(controller.getInstant);

router.use("/:orderId", orderMiddleware);
router
  .route("/:orderId")
  .get(controller.getOrder)
  .delete(controller.cancellOrder)
  .put(controller.addItem)
  .patch(controller.editOrder);

module.exports = router;
