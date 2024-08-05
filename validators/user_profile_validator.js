import joi from 'joi';

export const buyerValidator = {
    dateOfBirth: joi.string(),
    location: joi.string(),
    profilePicture: joi.string(),
    contact: joi.array().items(joi.string()),
    user: joi.string(),
}

export const farmerValidator = {
    dateOfBirth: joi.string(),
    location: joi.string(),
    profilePicture: joi.string(),
    description: joi.string(),
    contact: joi.array().items(joi.string()),
    certification: joi.array().items(joi.string()),
    user: joi.string(),
}
