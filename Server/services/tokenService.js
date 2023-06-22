const jwt = require('jsonwebtoken');

const sequelize = require('../database/database');
const {Token} = require('../models/models').Models(sequelize);

class TokenService
{
    generateTokens(payload)
    {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15s'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken}
    }

    validateAccessToken(token)
    {
        try
        {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        }
        catch(e)
        {
            return null;
        }
    }

    validateRefreshToken(token)
    {
        try
        {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        }
        catch(e)
        {
            return null;
        }
    }

    async saveToken(user_id, refreshToken)
    {
        let tokenData = await Token.findOne({
            where: { user: user_id }
        });
        if(tokenData)
        {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await Token.create({user: user_id, refreshToken: refreshToken});
    }

    async parseTokenFromRequest(request)
    {
        const authorizationHeader = request.headers.authorization;
        if(!authorizationHeader)
        {
            return null;
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken)
        {
            return null;
        }

        return this.validateAccessToken(accessToken);
    }

    async removeToken(refreshToken)
    {
        return await Token.destroy({
            where: {
                refreshToken: refreshToken
            }
        });
    }

    async findToken(refreshToken)
    {
        return await Token.findOne({
            where: {
                refreshToken: refreshToken
            }
        });
    }
}

module.exports = new TokenService();