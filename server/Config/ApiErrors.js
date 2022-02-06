class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
    static ApiValidationError(message) {
        return new ApiError(message, 200);
    }
    static BadRequest(message) {
        return new ApiError(message, 400);
    }
    static Unauthorized(message) {
        return new ApiError(message, 401);
    }
    static InternalServerError(message) {
        return new ApiError(message, 500);
    }
}

module.exports = ApiError;