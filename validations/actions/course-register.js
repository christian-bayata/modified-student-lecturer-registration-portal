const Joi = require('joi');

/* 
    @params: user
    @returns: {*} 
*/

const validateCourseRegister = (user) => {
    const schema = Joi.object({
        
        courseDetails: {
            name:  Joi.string().required(),
            code: Joi.string().required(),
            level: Joi.string().required(),
            courseId: Joi.string().required()
        },
        userDetails: {
            firstName:  Joi.string().required(),
            lastName:  Joi.string().required(),
            department: Joi.string().required(),
            level: Joi.string().required(),
            userId: Joi.string().required() 
        }
    });

    return schema.validate(user);
}

module.exports = validateCourseRegister;