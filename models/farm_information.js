import mongoose from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const farmInformationSchema = new mongoose.Schema({
    name: {type: String},
    address: {type: String},
    size: {type: String},
    location: {type: String},
   image: {type: String},
   contact: {type: String},
   farmType: {type: String},
   harvestTimes:{type: String},
   crops: [{type: String}],
   additionalDetails: {type: String},
   
},{
    timestamps: true,
});

farmInformationSchema.plugin(toJSON)

export const Farm  = mongoose.model('Farm', buyerSchema);