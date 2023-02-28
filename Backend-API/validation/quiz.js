const Joi = require('joi');

function validateInput(quiz) {
    const schema = Joi.object({
        description:Joi.string().required(),
    });
    return schema.validateInput(quiz)
}

export default validateInput