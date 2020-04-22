class CustomError {

    constructor(message, status, stack) {
        this.name = 'CustomError';

        this.message = message;
        this.status = status;

        if (stack) {
            this.stack = stack;
        } else if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError);
        } else {
            this.stack = (new Error()).stack;
        }
    }

    static fromError(e, defaultStatus) {
        let err;

        if (e instanceof this) {
            err = e;
        } else if (e instanceof Error) {
            err = new this(e.message, defaultStatus, e.stack);
        }

        err = new this(e, defaultStatus);

        return err;
    }

}

module.exports = CustomError;
