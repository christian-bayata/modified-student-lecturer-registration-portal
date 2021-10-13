
// /* 
//     @params: user
//     @params: statusCode
//     @params: res
//     @returns : {Promise<void>}
// */

const storeToken = (user, statusCode, res) => {
    //Import token from the User model
    const token = user.generateAuthToken();

    //Cookie options
    const options = {
        expires: new Date(Date.now + process.env.COOKIE_EXP_DATE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = storeToken;
