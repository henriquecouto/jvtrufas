const fs = require("fs");
const path = require("path");

const { Order } = require("../models/OrderModel");
const { Item } = require("../models/ItemModel");

const filePath = path.join(__dirname, "..", "/config/instant-orders.json");

exports.createOrder = async (req, res) => {
  req.body.payment = undefined;
  // req.body.status = undefined;
  req.body.evaluation = undefined;

  try {
    for (let index in req.body.items) {
      const item = await Item.findById(req.body.items[index]._id);

      if (!item) {
        return res.status(400).send({ error: `item ${index} not exist` });
      }

      req.body.items[index] = { ...req.body.items[index], ...item.toJSON() };
    }

    if (req.userType === "purchaser") {
      if (req.userId !== req.body.purchaserId) {
        return res.status(400).send({
          error:
            "you don't have permission to create order with other purchaser",
        });
      }
    }

    const order = await Order.create(req.body);

    res.send({ order });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const scheduled = await Order.find({
      type: "scheduled",
      status: { $nin: ["canceled", "delivered"] },
    })
      .sort({ deliveryDate: 1 })
      .populate("purchaserId");
    const instant = await Order.find({
      type: "instant",
      status: { $nin: ["canceled", "delivered"] },
    })
      .sort({ registrationDate: 1 })
      .populate("purchaserId");
    return res.send({ scheduled, instant });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.cancellOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.order._id,
      {
        status: "canceled",
      },
      {
        new: true,
      }
    );
    return res.send({ order });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.getOrder = async (req, res) => {
  return res.send({ order: req.order });
};

exports.addItem = async (req, res) => {
  try {
    if (!req.body.amount) {
      return res.status(400).send({ error: "you must provide amount" });
    }

    const item = await Item.findById(req.body._id);

    if (!item) {
      return res.status(400).send({ error: "item not exist" });
    }

    let { items } = await Order.findById(req.order._id);

    req.body = { ...req.body, ...item.toJSON() };
    items.push(req.body);

    order = await Order.findByIdAndUpdate(
      req.order._id,
      { items },
      { new: true }
    );

    return res.send({ item, order });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.editOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.order._id, req.body, {
      new: true,
    });
    return res.send({ order });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.makeOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.order._id,
      {
        status: "waiting",
      },
      {
        new: true,
      }
    );
    return res.send({ order });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    let orders = [];

    if (req.userType === "purchaser") {
      orders = await Order.find({ purchaserId: req.userId }).sort({
        orderNumber: -1,
      });
    } else if (req.userType === "admin") {
      orders = await Order.find({ purchaserId: req.params.userId });
    }

    return res.send({ orders });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

exports.toggleInstant = async (req, res) => {
  try {
    const config = JSON.parse(await fs.readFileSync(filePath).toString());

    await fs.writeFileSync(
      filePath,
      JSON.stringify({
        active: !config.active,
      })
    );

    return res.send({ active: !config.active });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ error, message: "error when toggle instant orders" });
  }
};

exports.getInstant = async (req, res) => {
  try {
    const config = JSON.parse(await fs.readFileSync(filePath).toString());

    return res.send(config);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ error, message: "error on get instant orders status" });
  }
};
