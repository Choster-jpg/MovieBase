const bcrypt = require('bcrypt');
const uuid = require('uuid');

const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dto/userDto');

const sequelize = require('../database/database');
const ApiError = require("../error/apiError");
const { User, UserRelationship } = require('../models/models').Models(sequelize);

class UserService
{
    async register(email, password, full_name, nickname)
    {
        let candidate = await User.findOne({ where: {email: email}});

        if(candidate)
        {
            throw ApiError.BadRequest('User with this email already exists.');
        }

        let hashPassword = await bcrypt.hash(password, 3);
        let activationLink = uuid.v4();

        let completeActivationLink = `${process.env.API_URL}/api/user/activate/${activationLink}`;

        let user = await User.create({email, password: hashPassword, activationLink, full_name, nickname});
        //await mailService.sendActivationMail(email, completeActivationLink);

        let userDto = new UserDto(user);

        return { user: userDto };
    }

    async activate(activationLink)
    {
        let user = await User.findOne({
            where: {
                activationLink: activationLink
            }
        });

        console.log(user);
        if(!user)
        {
            throw ApiError.BadRequest('Wrong activation link');
        }

        await User.updateOne({activationLink: activationLink}, {is_activated: true});
    }

    async checkResetLink(resetLink)
    {
        let user = await User.findOne({
            where: {
                resetLink: resetLink
            }
        });
        console.log(user);
        if(!user)
        {
            throw ApiError.BadRequest('Wrong reset link')
        }

        return new UserDto(user);
    }

    async login(email, password)
    {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if(!user)
        {
            throw ApiError.BadRequest('There is no user with such email.');
        }

        console.log(password, user.password);

        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals)
        {
            throw ApiError.BadRequest('Wrong password');
        }

        /*if(user.is_activated === false)
        {
            // TODO: throw new error
            throw new Error('Account is not activated');
        }*/

        const userDto = new UserDto(user);
        console.log("user dto: ", userDto);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken, userDto.email);

        return { ...tokens, user: userDto };
    }

    async logout(refreshToken)
    {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken)
    {
        if(!refreshToken)
        {
            throw ApiError.Unauthorized();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDb)
        {
            throw ApiError.Unauthorized();
        }

        const user = await User.findOne({
            where: {
                email: userData.email
            }
        });


        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async reset(email)
    {
        let candidate = await User.findOne({
            where: {
                email: email
            }
        });

        if(!candidate)
        {
            throw ApiError.BadRequest("Wrong email");
        }

        let resetLink = uuid.v4();
        let temporaryPassword = uuid.v4();

        let hashPassword = await bcrypt.hash(temporaryPassword, 3);

        let completeResetLink = `${process.env.API_URL}/api/user/reset/${resetLink}`;

        let user = await User.updateOne({email: email},{password: hashPassword, resetLink: resetLink});
        await mailService.sendResetMail(email, completeResetLink, temporaryPassword);

        return { user: user, temporaryPassword: temporaryPassword};
    }

    async resetPassword(email, password) {
        let candidate = await User.findOne({
            where: {
                email: email
            }
        });

        if(!candidate)
        {
            // TODO: throw new error
        }

        let hashPassword = await bcrypt.hash(password, 3);
        let user = await User.updateOne({email: email},{password: hashPassword});
        let userDto = new UserDto(user);
        return { user: userDto };
    }

    async getFriendsIds(user_id) {
        return (await UserRelationship.findAll({
            attributes: ['friend_id'],
            where: {
                friend_owner_id: user_id,
            },
            raw: true,
        })).map(item => item.friend_id);
    }
}

module.exports = new UserService();