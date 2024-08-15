import joi from "joi";

export const listingsValidator = joi.object({
    image: joi.string().required(),
    name: joi.string().required(),
    categories: joi.string().valid('Fruits', 'Vegetables', 'Roots and Tubers', 'Cereals', 'Grains', 'Nuts').required(),
    harvestDate: joi.string().required(),
    quantity: joi.string().required(),
    price: joi.number().required(),
    user: joi.string(),


})