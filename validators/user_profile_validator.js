import joi from 'joi';

export const buyerValidator = joi.object({
    dateOfBirth: joi.string(),
    sex: joi.string().valid('male', 'female'),
    location: joi.string(),
    profilePicture: joi.string(),
    contact: joi.array().items(joi.string().email()),
    user: joi.string(),
})

export const farmerValidator = joi.object({
    dateOfBirth: joi.string(),
    sex: joi.string().valid('male', 'female'),
    location: joi.string(),
    profilePicture: joi.string(),
    description: joi.string(),
    // contact: joi.array().items(joi.string().email()),
    contact: joi.string(),
    certification: joi.array().items(joi.string()),
    user: joi.string(),
})
