const sequelize = require('../database/database');
const { User, UserRelationship, LikeList } = require('../models/models').Models(sequelize);
const userService = require('../services/userService');
const { Op, QueryTypes } = require("sequelize");

const handleImage = require('../utils/handleImage');

class UserController
{
    async register(request, response, next)
    {
        try {
            const {email, password, full_name, nickname} = request.body;
            const userData = await userService.register(email, password, full_name, nickname);

            return response.json(userData);
        }
        catch(e) {
            next(e);
        }
    }

    async login(request, response, next)
    {
        try {
            const {email, password} = request.body;
            const userData = await userService.login(email, password);
            response.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true })

            return response.json(userData);
        }
        catch(e) {
            console.log(e);
            next(e);
        }
    }

    async logout(request, response, next)
    {
        try {
            const { refreshToken } = request.cookies;
            const token = await userService.logout(refreshToken);
            response.clearCookie('refreshToken');
            return response.json(token);
        }
        catch(e) {
            next(e);
        }
    }

    async reset(request, response, next)
    {
        try {
            const { email } = request.body;
            const userData = await userService.reset(email);

            return response.json(userData);
        }
        catch(e) {
            next(e);
        }
    }

    async resetPassword(request, response, next)
    {
        try {
            const { email, password } = request.body;
            const userData = await userService.resetPassword(email, password);

            return response.json(userData);
        }
        catch(e) {
            next(e);
        }
    }

    async refresh(request, response, next)
    {
        try {
            const { refreshToken } = request.cookies;
            const userData = await userService.refresh(refreshToken);
            response.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 1000, httpOnly: true});

            return response.json(userData);
        }
        catch(e) {
            console.log(e);
            next(e);
        }
    }

    async activate(request, response, next)
    {
        try {
            const activationLink = request.params.link;
            await userService.activate(activationLink);
            return response.redirect(process.env.CLIENT_URL);
        }
        catch(e) {
            next(e);
        }
    }

    async checkResetLink(request, response, next)
    {
        try {
            const resetLink = request.params.link;
            const user = await userService.checkResetLink(resetLink);
            if(user)
            {
                response.setHeader('email', user.email);
                return response.redirect(process.env.NEW_PASSWORD_URL);
            }
        }
        catch(e) {
            next(e);
        }
    }

    async setInfo(request, response, next) {
        try {
            const { user_id, nickname, about } = request.body;
            const user = await User.findOne({
                where: {
                    id: user_id,
                }
            })

            user.nickname = nickname;
            user.about = about;
            await user.save();

            return response.json(user);
        }
        catch(e) {
            next(e);
        }
    }

    async setImage(req, res, next) {
        try {
            const { user_id } = req.body;
            const { image } = req.files;
            const fileName = await handleImage(image, 'users');

            const user = await User.update({image: fileName}, {where: {id: user_id}})
            return res.json(user);
        }
        catch(e) {
            next(e);
        }
    }

    async getFriends(req, res, next) {
        try {
            const { user_id } = req.query;
            const ids = await userService.getFriendsIds(user_id);

            const friends = await User.findAll({
                attributes: ['full_name', 'nickname', 'image'],
                where: {
                    id: ids,
                }
            });

            return res.json(friends);
        }
        catch (e) {
            next(e);
        }
    }

    async createFriend(req, res, next) {
        try {
            const { friend_owner_id, friend_id } = req.body;
            const result = await UserRelationship.create({friend_owner_id, friend_id});
            await UserRelationship.create({friend_owner_id: friend_id, friend_id: friend_owner_id});
            return res.json(result);
        }
        catch (e) {
            next(e);
        }
    }

    async removeFriend(req, res, next) {
        try {
            const { friend_owner_id, friend_id } = req.body;
            const result = await UserRelationship.destroy({
                where: {friend_owner_id, friend_id}
            })
            await UserRelationship.destroy({
                where: {friend_owner_id: friend_id, friend_id: friend_owner_id}
            })
            return res.json(result);
        }
        catch (e) {
            next(e);
        }
    }

    async getUsersByName(req, res, next) {
        try {
            const { query } = req.query;
            const result = await User.findAll({
                where: {
                    [Op.or]: [
                        {
                            nickname: {
                                [Op.like]: `%${query}%`
                            }
                        },
                        {
                            full_name: {
                                [Op.like]: `%${query}%`
                            }
                        }
                    ]
                },
                attributes: ["full_name", "nickname", "image"],
            })

            return res.json(result);
        }
        catch(e) {
            next(e);
        }
    }

    async getUserData(req, res, next) {
        try {
            const { user_id } = req.query;

            const result = await sequelize.query("SELECT User.image, User.nickname, User.full_name, User.about, User.createdAt," +
                " COUNT(DISTINCT `UserRelationship`.id) AS friends," +
                " COUNT(DISTINCT `LikeList`.id) AS likes," +
                " COUNT(DISTINCT `Review`.id) AS reviews" +
                " FROM `User`" +
                " LEFT JOIN `UserRelationship` ON `User`.id = `UserRelationship`.friend_owner_id" +
                " LEFT JOIN `LikeList` ON User.id = LikeList.UserId" +
                " LEFT JOIN `Review` ON User.id = Review.UserId WHERE User.id = ? GROUP BY `User`.id;",
                {
                    replacements: [user_id],
                    type: QueryTypes.SELECT
                });

            return res.json(result);
        }
        catch(e) {
            console.log(e);
            next(e);
        }
    }

    async getFriendsLikedMovie(req, res, next) {
        const { user_id } = req.query;
        const ids = await userService.getFriendsIds(user_id);

        const friends_ids = await LikeList.findAll({
            where: {
                UserId: {
                    [Op.in]: ids,
                }
            },
            attributes: ["UserId"]
        });

        const result = await User.findAll({
            where: {
                id: {
                    [Op.in]: friends_ids,
                }
            },
            attributes: ["image"],
        });

        return res.json(result);
    }
}

module.exports = new UserController();