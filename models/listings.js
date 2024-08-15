import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const listingsSchema = new Schema({
    name: {type: String},
    harvestDate: {type: String},
    quantity: { type: String,},
   price: {type: Number},
   user: {type: Types.ObjectId, ref:"User", select: false},
},{
    timestamps: true,
});

listingsSchema.plugin(toJSON)

export const ListingsModel = model('listing', listingsSchema);
