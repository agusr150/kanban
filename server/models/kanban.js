'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kanban = sequelize.define('Kanban', {
    title: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    },
    category: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    },
    note: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Kanban.associate = function(models) {
    Kanban.belongsTo(models.User, {foreignKey: "UserId"})
    // associations can be defined here
  };
  return Kanban;
};