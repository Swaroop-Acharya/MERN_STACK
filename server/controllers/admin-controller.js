const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Project = require("../models/project-model");
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

const getAdminProjects = async (req, res) => {
  try {
    const response = await Project.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

const addProject = async (req, res) => {
  try {
    const response = req.body;
    await Project.create(response);
    res.status(200).json({ message: "Project added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Project  failed to add" });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    await Project.deleteOne({ _id: id });
    return res.status(200).json({ message: "Project deleted succesfully!" });
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Project.findOne({ _id: id });
    return res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
};

const updateProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProjectData = req.body;
    const response = await Project.updateOne(
      { _id: id },
      { $set: updatedProjectData }
    );
    return res.status(200).json({ message: response });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch single Project from backend" });
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUser,
  getUserById,
  updateUserById,
  deleteContact,
  getAdminProjects,
  addProject,
  deleteProject,
  getProjectById,
  updateProjectById,
};
