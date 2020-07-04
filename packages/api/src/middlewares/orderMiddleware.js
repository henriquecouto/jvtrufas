const { Order } = require("../models/OrderModel");
const { isValidObjectId } = require("mongoose");

module.exports = async (req, res, next) => {
  let userId = req.userId;
  let { orderId } = req.params;

  if (!orderId) {
    return res.status(400).send({ error: "order must be provided" });
  }

  // if (!userId) {
  //   return res.status(400).send({ error: "user must be provided" });
  // }

  if (!isValidObjectId(orderId)) {
    return res.status(400).send({ error: "you must provid a valid orderId" });
  }

  const order = await Order.findOne({ _id: orderId });

  if (!order) {
    return res.status(400).send({ error: "order not finded" });
  }

  if (userId !== String(order.purchaserId)) {
    return res.status(400).send({ error: "permission denied" });
  }

  req.order = order;

  next();
};
