const { User } = require("../models/UserModel");
const { Address } = require("../models/AddressModel");
const { isValidObjectId } = require("mongoose");

exports.create = async (req, res) => {
  try {
    await Address(req.body).validate();

    const address = new Address(req.body);

    const { addresses } = await User.findById(req.userId);

    addresses.push(address);

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { addresses } },
      { new: true }
    );

    return res.send({ addresses: user.addresses });
  } catch (error) {
    return res.status(400).send({ message: "error on create address", error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { addresses } = await User.findById(req.userId);
    return res.send({ addresses });
  } catch (error) {
    return res.status(400).send({ message: "error on delete address", error });
  }
};

exports.delete = async (req, res) => {
  if (!isValidObjectId(req.params.addressId)) {
    return res.status(400).send({ message: "required a valid address id" });
  }

  try {
    const { addresses } = await User.findById(req.userId);
    const newAddresses = addresses.filter(
      (v) => String(v._id) !== req.params.addressId
    );

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: { addresses: newAddresses } },
      { new: true }
    );

    return res.send({ addresses: user.addresses });
  } catch (error) {
    return res.status(400).send({ message: "error on delete address", error });
  }
};
