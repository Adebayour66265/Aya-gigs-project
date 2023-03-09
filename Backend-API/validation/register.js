import Joi from "joi";

  export const registerValidation = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phoneNumber:Joi.number().required(),
    role: Joi.string().required(),
    email: Joi.string().email().min(3).max(70).lowercase().required(),
    confirmPassword:Joi.string().required(),
    password: Joi.string().required()
      // .pattern(
      //   new RegExp(
      //     '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      //   )
      // )
      .required(),
  });

  export default registerValidation;
