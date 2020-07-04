const { Order } = require("../models/OrderModel");

exports.createOrder = async (req, res) => {
  req.body.payment = undefined;
  req.body.status = undefined;
  req.body.evaluation = undefined;

  try {
    const order = await Order.create(req.body);

    res.send({ order });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.getAll = async (req, res) => {};

exports.cancellOrder = async (req, res) => {};

exports.getOrder = async (req, res) => {
  return res.send({ order: req.order });
};

exports.addItem = async (req, res) => {};

exports.editOrder = async (req, res) => {};

exports.makeOrder = async (req, res) => {};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ purchaserId: req.userId });

  return res.send({ orders });
};
