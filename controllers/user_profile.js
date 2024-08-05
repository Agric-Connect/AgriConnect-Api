import mongoose from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const buyerSchema = new mongoose.Schema({
    dateOfBirth: {type: String},
    address: {type: String},
    phoneNumber: {type: String},
    location: {type: String},
   profilePicture: {type: String},
},{
    timestamps: true,
});
buyerSchema.plugin(toJSON)
export const Buyer = mongoose.model('Buyer', buyerSchema);




