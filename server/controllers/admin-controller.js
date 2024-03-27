const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const getAllUsers = async (req, res, next) => {
  try {
    // const response = await User.find({},{password:0})
    const response = await User.find().select({ password: 0 });
    if (!response) {
      res.status(404).json({ msg: "Unable to fetch the users!!" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const response = await Contact.find();
    if (!response) {
      res
        .status(404)
        .json({ msg: "Unable to fetch the Contact information!!" });
      return;
    }
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {getAllUsers,getAllContacts};
