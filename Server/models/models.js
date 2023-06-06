const { DataTypes, Model } = require('sequelize');

class User extends Model {}
class Token extends Model {}

let modelsSetUp = (sequelize) => {
    User.init(
        {
            id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
            email: {type: DataTypes.STRING, unique: true},
            password: {type: DataTypes.STRING, allowNull: false},
            full_name: {type: DataTypes.STRING, allowNull: false},
            nickname: {type: DataTypes.STRING, allowNull: false},
            image: {type: DataTypes.STRING},
            is_activated: {type: DataTypes.BOOLEAN, defaultValue: false},
            activation_link: {type: DataTypes.STRING},
            reset_link: {type: DataTypes.STRING},
        },
        {
            sequelize,
        }
    );

    Token.init(
        {
            user: { type: DataTypes.INTEGER, references: {model: User, key: "id"} },
            refreshToken: { type: DataTypes.STRING(1000), allowNull: false }
        },
        {
            sequelize,
            timestamps: false
        }//
    );

    return {User, Token};
}

module.exports.Models = (sequelize) => modelsSetUp(sequelize);