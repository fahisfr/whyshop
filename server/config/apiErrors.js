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
    static Forbidden(message) {
        return new ApiError(message, 403);
    }
    static InternalServerError(message) {
        console.log(message)
        return new ApiError('Oops somthing went worng', 500);
    }
}

module.exports = ApiError;