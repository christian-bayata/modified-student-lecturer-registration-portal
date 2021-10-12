//Creates the Errorhandler class which is a child of the node Error class;

class ErrorHandler extends error() {
    constructor(message, statusCode) {
        super(message);
    
        this.statusCode = this.statusCode;

        Error.CaptureStackTrace(this, this.constructor);
    }
};

module.exports = ErrorHandler;