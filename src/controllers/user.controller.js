const db = require('../database/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = db.User;

exports.register = (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  }

  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
    });
}

exports.login = (req, res) => {

  User.findOne({
    where: {
      username: req.body.username,
    }
  })
    .then(user => {
      if (user) {

        // check if password matches
        bcrypt.compare(req.body.password, user.password)
          .then(result => {

            if (result) {
              //   create JWT token
              const token = jwt.sign(
                {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
              );
              //   return success response
              res.status(200).send({
                ...user.dataValues,
                accessToken: token,
              });
            } else {
              res.status(401).send({ message: "Invalid password" });
            }
          })

      } else {
        res.status(404).send({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while finding the User." });
    });
}

//get authenticated userInfo
exports.me = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    if(!user) res.status(404).send({message: "User not found"})
    res.send(user)

  } catch (err) {
    res.status(500).send({ message: err.message || "Some error occurred while finding the User." })
  }

}