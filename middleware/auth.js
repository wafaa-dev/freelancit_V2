const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
  //get token from the header
  const token = req.header("x-auth-token");
  //if no token
  if (!token) {
    return res.status(401).json({ msg: "NO token , authorization denied" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //use the req.user in the protected route
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: "Token not valid" });
  }
};

module.exports = auth;