'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  wall.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    width: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    rotation: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'wall',
  });
  return wall;
};