import Joi from "joi";

export const loginInstructorValidation = Joi.object({
  companyId: Joi.number().required(),
  password: Joi.string().required(),
  role: Joi.string()
});

export default loginInstructorValidation;
