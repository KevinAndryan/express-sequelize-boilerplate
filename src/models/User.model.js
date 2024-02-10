const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      username: {
        type: Sequelize.STRING(16),
        unique: true,
      },
      password: {
        type: Sequelize.STRING(128),
      },
      name: {
        type: Sequelize.STRING(64),
      },
      email: {
        type: Sequelize.STRING(64),
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(16),
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
  );
    User.addHook('beforeCreate', (user, options) => {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(user.password, salt);
      console.log(user);
    });
  return User;
}