"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productcars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productcars.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      size: DataTypes.STRING,
      pict: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "productcars",
    }
  );
  return productcars;
};
