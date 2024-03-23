const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to home page" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      const status = 400;
      const message = "Email already exits";
      const error = {
        status,
        message,
      };
      return next(error);
    }

    //Hashing the password;
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    res.status(200).json({
      msg: "Register succesfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//Login

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      // return res.status(400).json({ message: "User not found" });

      const status = 400;
      const message = "User not found";
      const error = {
        status,
        message,
      };
      return next(error);
    }
    const user = await userExist.comparePassword(password);

    if (!user) {
      // return res.status(400).json({message:"Invalid password"})
      const status = 400;
      const message = "Invalid password";
      const error = {
        status,
        message,
      };
      return next(error);
    }

    res.status(200).json({
      msg: "Login succesfull",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};





module.exports = { home, register, login };
