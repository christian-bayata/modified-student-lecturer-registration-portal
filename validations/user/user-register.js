const Joi = require('joi');

/* 
    @params: user
    @returns: {*} 
*/

const validateRegister = (user) => {
    const schema = Joi.object({
        
        firstName: Joi.string()
                    .min(5)
                    .max(50)
                    .required(),
                
        lastName: Joi.string()
                    .min(5)
                    .max(50)
                    .required(),

        regNo: Joi.string()
                    .min(5)
                    .max(50)
                    .required(),

        email: Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: [ 'com', 'net' ] }}),
                    
        password: Joi.string()
                    .min(6)
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    })

    return schema.validate(user);
}

module.exports = validateRegister;