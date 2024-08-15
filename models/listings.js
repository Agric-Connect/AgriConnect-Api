import { Schema, model, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';


const listingsSchema = new Schema({
    image: { type: String },
    name: { type: String },
    categories: { type: String, enum: ["Fruits", "Vegetables", "Roots and Tubers", "Cereals", "Grains", "Nuts"] },
    harvestDate: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    user: { type: Types.ObjectId, ref: "User", select: false },
}, {
    timestamps: true,
});

listingsSchema.plugin(toJSON)

export const ListingsModel = model('listing', listingsSchema);
