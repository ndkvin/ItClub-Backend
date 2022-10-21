const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const bcrypt = require('bcrypt');

const User = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notNull: true,
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hased = bcrypt.hashSync(value, salt);
      console.log(hased);
      this.setDataValue('password', hased);
    },
    validate: { 
      notNull: true,
    }
  }
});

module.exports = User;