const Sequelize = require('sequelize');

module.exports = new Sequelize("intexsoft_courses_makar_i", "makar", "981hJgr/dWww", {
    dialect: "mysql",
    host: "nisnas.synology.me",
    define: {
        freezeTableName: true
    }
});