const crypto = require('crypto');

/*
    @params: user;
    @returns: {resetToken};
*/

const getResetPasswordToken = (user) => {
    //Generate random token with crypto
    const resetToken = crypto.randomBytes(20).toString('hex');
    //Hash the random token
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    //Set the expiration time of the token to 30 mins
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
    
    return resetToken;
}

module.exports = getResetPasswordToken;