const {DataTypes, Model} = require('sequelize');

// TODO: add sequelize

class User extends Model {}

let modelsSetUp = (sequelize) => {
    User.init
    (
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            email: { type: DataTypes.STRING, unique: true, allowNull: false },
            password: { type: DataTypes.STRING, unique: true, allowNull: true },
            full_name: { type: DataTypes.STRING, allowNull: false },
            nickname: { type: DataTypes.STRING, allowNull: true },
            image: { type: DataTypes.STRING(1000), allowNull: true },
            is_activated: { type: DataTypes.BOOLEAN, defaultValue: false },
            activation_link: { type: DataTypes.STRING, allowNull: true },
            reset_link: { type: DataTypes.STRING, allowNull: true },
            //role: { type: DataTypes.STRING, defaultValue: "USER" },
        },
        {
            sequelize: sequelize,
            modelName: "user",
            tableName: "user",
            timestamps: true
        }
    );
}

module.exports.Models = (sequelize) => modelsSetUp(sequelize);