import { Schema, model, Types } from 'mongoose';
import { toJSON } from '@reis/mongoose-to-json';

const farmInformationSchema = new Schema({
    name: { type: String },
    size: { type: String },
    location: { type: String },
    image: { type: String },
    contact: { type: String },
    farmType: { type: String },
    description: { type: String },
    harvestTime: { type: String },
    crops: [{ type: String }],
    additionalDetails: { type: String },
    user: { type: Types.ObjectId, ref: "User" },


}, {
    timestamps: true,
});

farmInformationSchema.plugin(toJSON)

export const Farm = model('Farm', farmInformationSchema);