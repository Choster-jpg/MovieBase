const ApiError = require('../error/apiError');

module.exports = function (err, req, res, next)
{
    if(err instanceof ApiError)
    {
        return res.status(err.status).json({code: err.status, message: err.message, errors: err.errors});
    }

    return res.status(500).json({message: "Unknown server error", err: err});
}