const Sequelize = require('sequelize');

const sequelize = new Sequelize("intexsoft_courses_makar_i", "makar", "981hJgr/dWww", {
    dialect: "mysql",
    host: "nisnas.synology.me",
    define: {
        freezeTableName: true
    }
});

module.exports = sequelize;