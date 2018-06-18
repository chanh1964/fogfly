export default class ResponseSuccess {
    constructor(message: string, code: number = 200) {
        // super(message);
        this.code = code;
        this.message = message;
    }

    static Success(message: string) {
        return new ResponseSuccess(message, 200);
    }

    // static BadRequest(message: string) {
    //     return new ResponseSuccess(message, 400);
    // }

    // static Unauthorized(message: string) {
    //     return new ResponseSuccess(message, 401);
    // }

    // static InternalError(message: string) {
    //     return new ResponseSuccess(message);
    // }
}
