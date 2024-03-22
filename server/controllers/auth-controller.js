const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to home page" });
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exits" });
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
  }
};

//Login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }
    const user =await userExist.comparePassword(password);

    
    
    if(!user){
      return res.status(400).json({message:"Invalid password"})
    }

    res.status(200).json({
      msg:"Login succesfull",
      token:await userExist.generateToken(),
      userId:userExist._id.toString()
    })


  } catch (error) {
    console.log(error);
  }
};

module.exports = { home, register, login };
