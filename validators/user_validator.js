import Joi from "joi"

export const userValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    otherNames: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    userRole: Joi.string().valid('farmer', 'buyer').required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref('password'),
    termsAndConditions: Joi.boolean().required(),
    
}).with('password', 'confirmPassword')

export const loginValidator = Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().required(),
});
   