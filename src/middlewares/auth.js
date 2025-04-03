const jwt = require('jsonwebtoken');
const db = require('../database/database');
const User = db.User;

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Invalid request" });
  }
  else {
    try {
      const token = await req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      const user = decodedToken
      req.user = user
      //check user in db
      const foundUser = await User.findByPk(user.id);
      if (!foundUser) {
        return res.status(401).send({ message: "User not found" });
      }
      next();

    } catch (err) {
      res.status(401).send({ message: err.message || "Invalid request" });
    }
  }
}
exports.auth = auth;