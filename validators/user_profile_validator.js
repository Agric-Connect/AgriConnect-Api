import joi from 'joi';

export const buyerValidator = joi.object({
    dateOfBirth: joi.string(),
    sex: joi.string().valid('male', 'female'),
    location: joi.string(),
    profilePicture: joi.string(),
    contact: joi.string(),
    user: joi.string(),
})

export const farmerValidator = joi.object({
    dateOfBirth: joi.string(),
    sex: joi.string().valid('male', 'female'),
    location: joi.string(),
    profilePicture: joi.string() ,
    description: joi.string(),
    contact: joi.string(),
    certification: joi.string(),
    user: joi.string(),
})
