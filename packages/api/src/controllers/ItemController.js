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
  } catch (e) {
    return res
      .status(400)
      .send({ error: "create item failed", message: e.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const items = await Item.find();
    return res.send({ items });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "load items failed", message: e.message });
  }
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);
    return res.send({ item });
  } catch (error) {
    return res
      .status(400)
      .send({ error: "load item failed", message: e.message });
  }
};
