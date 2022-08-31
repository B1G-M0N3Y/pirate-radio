'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.hasMany(models.Song, {
        foreignKey: 'albumId',
        as: 'Songs'
      });
      Album.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'Artist'
      });
    }
  }
  Album.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
