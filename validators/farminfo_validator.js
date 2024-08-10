import joi from 'joi';

export const farmInfoValidator = joi.object({
    name: joi.string(),
    size: joi.string(),
    location: joi.string(),
    image: joi.string(),
    contact: joi.string(),
    harvestTime: joi.string(),
    farmType: joi.string(),
    description: joi.string(),
    crops:joi.array().items(joi.string()),
    additionalDetails:joi.string(),
    user: joi.string(),
})
