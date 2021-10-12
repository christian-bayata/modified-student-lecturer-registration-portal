const status = require('http-status');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;

    //Since we are only concerned with NODE_ENV=DEVELOPMENT for now;
    if(process.env.NODE_ENV === "DEVELOPMENT") {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack       
        })
    }

    //TODO .... process.env.NODE_ENV === "TESTING";
}