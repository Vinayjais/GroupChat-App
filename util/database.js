const Sequelize = require('sequelize');

const sequelize = new Sequelize('v-chat','root','241021@Vinay',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

//241021@Vinay
