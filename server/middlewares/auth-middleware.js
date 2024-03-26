const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    //if you attempt to use an expired token, you will get this error
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }
  const jwtToken = token.replace("Bearer ", "").trim();
  console.log("token from the auth middleware", jwtToken);

  try {
    
    const isVerfied = jwt.verify(jwtToken, process.env.SECRET_KEY);
    // console.log(isVerfied);
    const userData = await User.findOne({ email: isVerfied.email }).select({
      password: 0,
    });
  
    req.user = userData;
    req.token = token;
    req.userId = userData._id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized Invalid token",
    });
  }
};

module.exports = authMiddleware;
