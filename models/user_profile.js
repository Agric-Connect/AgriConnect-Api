import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const buyerSchema = new Schema({
    dateOfBirth: {type: String},
    location: {type: String},
    sex: { type: String, enum: ["male", "female"] },
   profilePicture: {type: String},
   contact: [{type: String}],
   user: {type:Types.ObjectId, ref:"User"},
},{
    timestamps: true,
});

buyerSchema.plugin(toJSON)

export const Buyer = model('buyerProfile', buyerSchema);



const farmerSchema = new Schema({
    dateOfBirth: {type: String},
    sex: { type: String, enum: ["male", "female"] },
    location: {type: String},
   profilePicture: {type: String},
description: {type: String},//(Short description about the farmer, farm history, etc.)
   contact: [{type: String}],
   certification: [{type: String}],
   user: {type:Types.ObjectId, ref:"User"},
},{
    timestamps: true,
});
   farmerSchema.plugin(toJSON)

   export const Farmer = model('farmerProfile', farmerSchema);


