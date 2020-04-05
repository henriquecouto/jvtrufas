const { Item } = require("../models/ItemModel");

exports.createItem = async (req, res) => {
  const { name, flavor } = req.body;

  try {
    if (await Item.findOne({ name })) {
      return res.status(400).send({ error: "item already registered" });
    }

    if (!name) {
      return res.status(400).send({ error: "name is required" });
    }

    if (!flavor) {
      return res.status(400).send({ error: "flavor is required" });
    }

    const item = await Item.create(req.body);

    return res.send({ item });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "create item failed", message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const items = await Item.find();
    if (!items.length) {
      return res.status(400).send({ error: "no items finded" });
    }
    return res.send({ items });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "load items failed", message: error.message });
  }
};

exports.getOne = async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(400).send({ error: "no item finded" });
    }
    return res.send({ item });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "load item failed", message: error.message });
  }
};

exports.delete = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(400).send({ error: "no item finded" });
    }

    return res.send({ item });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "remove item failed", message: error.message });
  }
};

exports.edit = async (req, res) => {
  const { itemId } = req.params;

  try {
    if (!Object.keys(req.body).length) {
      return res.status(400).send({ error: "no updates sended" });
    }

    const item = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) {
      return res.status(400).send({ error: "no item finded" });
    }

    return res.send({ item });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "remove item failed", message: error.message });
  }
};
