import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const buyerSchema = new Schema({
    dateOfBirth: {type: String},
    location: {type: String},
    sex: { type: String, enum: ["male", "female"] },
   profilePicture: {type: String},
   contact: [{type: String}],
   user: {type: Types.ObjectId, ref:"User", select: false},
},{
    timestamps: true,
});

buyerSchema.plugin(toJSON)

export const Buyer = model('buyerProfile', buyerSchema);
