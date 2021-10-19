const Joi = require('joi');

/* 
    @params: user
    @returns: {*} 
*/

const validateCourseUpdate = (user) => {
    const schema = Joi.object({
        
        courseDetails: {
            name:  Joi.string().required(),
            code: Joi.string().required(),
            courseId: Joi.string().required()
        }
    });

    return schema.validate(user);
}

module.exports = validateCourseUpdate;