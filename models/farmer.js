import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const farmerSchema = new Schema({
    dateOfBirth: {type: String},
    sex: { type: String, enum: ["male", "female"] },
    location: {type: String},
   profilePicture: {type: String},
description: {type: String},//(Short description about the farmer, farm history, etc.)
   contact: [{type: String}],
   certification: [{type: String}],
   user: {type: Types.ObjectId, ref:"User", select: false},
},{
    timestamps: true,
});
   farmerSchema.plugin(toJSON)

   export const Farmer = model('farmerProfile', farmerSchema);


