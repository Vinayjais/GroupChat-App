const Sequelize = require('sequelize');

const sequelize = new Sequelize('v-chat','vinay','vinay2410',{
    dialect: 'mysql',
    host: 'database-1.c4ydiiv1lqn6.eu-north-1.rds.amazonaws.com'
});

module.exports = sequelize;

//241021@Vinay
