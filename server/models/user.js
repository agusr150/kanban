'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    },
    password: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Kanban, {foreignKey: "UserId"})
    // associations can be defined here
  };
  return User;
};