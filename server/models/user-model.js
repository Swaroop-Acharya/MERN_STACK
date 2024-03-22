const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//secure the password using the bcryptjs
//Acts like middleware
userSchema.pre("save", async function (next) {
  // console.log(this)
  const user = this;
  if (!user.isModified("password")) {
    next(); //middleware
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});


//Tokens such JWT are not stored in the database.
//Instead they are issued by the server during the authentication process.
//Then it is sent to the client.
//The client will then use the token to authenticate the user.

//login

userSchema.methods.comparePassword=async function(password){
  return bcrypt.compare(password,this.password);
}


//instance methods
userSchema.methods.generateToken= async function(){
  try {
    const token=await jwt.sign(
      {
      userId:this._id.toString(),
      email:this.email.toString(),
      isAdmin:this.isAdmin
    },
    process.env.SECRET_KEY,
    {expiresIn:"1h"}
    )
    return token
  } catch (error) {
    console.log("The token is not generated")
  }
}

//DEFINE THE MODEL OR THE COLLECTION NAME

const User = new mongoose.model("User", userSchema);

module.exports = User;
