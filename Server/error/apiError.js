class ApiError extends Error
{
    constructor(status, message, errors = [])
    {
        super();
        this.status = status;
        this.message = message;
    }

    static BadRequest(message = "Bad request", errors = [])
    {
        return new ApiError(400, `${message}`, errors);
    }

    static Unauthorized(message = "Unauthorized", errors = [])
    {
        return new ApiError(401, `${message}`, errors);
    }

    static Forbidden(message = "Forbidden", errors = [])
    {
        return new ApiError(403, `${message}`, errors);
    }

    static Internal(message = "Internal server error", errors = [])
    {
        return new ApiError(500, `${message}`, errors);
    }
}

module.exports = ApiError;