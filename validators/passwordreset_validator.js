import Joi from "joi";

export const forgotPasswordValidator = Joi.object({
    email: Joi.string().email().required(),
});

export const resetPasswordValidator = Joi.object({
    resetToken: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
});
