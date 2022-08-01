'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  card.init({
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    width: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    rotation: DataTypes.FLOAT,
    draggable: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'card',
  });
  return card;
};