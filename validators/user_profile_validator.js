import joi from 'joi';

export const buyerValidator = {
    dateOfBirth: joi.string(),
    sex: joi.string().valid('male', 'female'),
    location: joi.string(),
    profilePicture: joi.string(),
    contact: joi.array().items(joi.string()),
    user: joi.string(),
}

export const farmerValidator = {
    dateOfBirth: joi.string(),
    sex: joi.string().valid('male', 'female'),
    location: joi.string(),
    profilePicture: joi.string(),
    description: joi.string(),
    contact: joi.array().items(joi.string()),
    certification: joi.array().items(joi.string()),
    user: joi.string(),
}
