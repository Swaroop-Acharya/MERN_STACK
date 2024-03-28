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

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User deleted succesfully!" });
  } catch (error) {
    next(error);
  }
};

//editing the users

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;
    const response = await User.updateOne(
      { _id: id },
      { $set: updatedUserData }
    );
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};


//deleting the contacts
const deleteContact = async (req, res) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact deleted succesfully!" });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUser,
  getUserById,
  updateUserById,
  deleteContact
};
