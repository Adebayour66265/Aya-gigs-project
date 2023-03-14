import Joi from "joi";

export const registerValidation = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  phoneNumber: Joi.number().required(),
  role: Joi.string().required(),
  email: Joi.string().email().min(3).max(70).lowercase().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password does not match password.",
  }),
  password: Joi.string().min(5).required(),
});

export default registerValidation;
