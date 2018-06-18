export default class ResponseError extends Error {
    constructor(message: string, code: number = 500) {
        super(message);
        this.code = code;
        this.message = message;
    }

    static NotFound(message: string) {
        return new ResponseError(message, 404);
    }

    static BadRequest(message: string) {
        return new ResponseError(message, 400);
    }

    static Unauthorized(message: string) {
        return new ResponseError(message, 401);
    }

    static InternalError(message: string) {
        return new ResponseError(message);
    }
}
