const { Order } = require("../models/OrderModel");

module.exports = async (req, res, next) => {
  let { userId } = req.body;
  let { orderId } = req.params;

  if (!orderId) {
    return res.status(400).send({ error: "order must be provided" });
  }

  if (!userId) {
    return res.status(400).send({ error: "user must be provided" });
  }

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    return res.status(400).send({ error: "order not finded" });
  }

  if (userId !== order.purchaser) {
    return res.status(400).send({ error: "permission denied" });
  }

  next();
};
