'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    age: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    character: DataTypes.INTEGER,
    school: DataTypes.INTEGER,
    grade: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};