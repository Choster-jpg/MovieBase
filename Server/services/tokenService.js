const jwt = require('jsonwebtoken');

const {Token} = require('../models/models');

class TokenService
{
    generateTokens(payload)
    {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken }
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

    async saveToken(userEmail, refreshToken)
    {
        let tokenData = await Token.findOne({user: userEmail});
        console.log(refreshToken)
        if(tokenData)
        {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await Token.create({user: userEmail, refreshToken: refreshToken});
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
        return await Token.deleteOne({refreshToken: refreshToken});
    }

    async findToken(refreshToken)
    {
        return await Token.findOne({refreshToken: refreshToken});
    }
}

module.exports = new TokenService();