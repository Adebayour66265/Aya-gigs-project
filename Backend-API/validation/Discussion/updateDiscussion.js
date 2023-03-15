const Joi = require('joi')

export const updateDiscussion = function validate(input) {
  const schema = Joi.object({
    image: Joi.string(),
    title: Joi.string(),
    author: Joi.string(),
    body: Joi.string(),
  })
  return schema.validate(input)
}