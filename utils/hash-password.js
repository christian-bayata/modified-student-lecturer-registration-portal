const bcrypt = require('bcrypt');

class HashPassword  {

    /* @params: password
        @returns {Promise<void>}
    */

    static async encryptPassword(password) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    }

    /* @params: newPassword
        @params: oldPassword
        @returns: {Promise<void>}
    */

    static async comparePasswords(newPassword, oldPassword) {
        return await bcrypt.compare(newPassword, oldPassword)
    }
}

module.exports = HashPassword;