import { model, Schema, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const ordersSchema = new Schema({
    user: { type: Types.ObjectId, ref: "User", required: true },
    vendor: { type: Types.ObjectId, ref: "Farmer", required: true },
    item: [{ type: Types.ObjectId, ref: "listing", required: true }],
    status: { type: String, enum: ["processing", "out for delivery", "delivered"], default: "processing" },
    price: { type: Number, required: true },
    payment: { type: Boolean, default: false }
}, {
    timestamps: true
})
ordersSchema.plugin(toJSON)

export const OrdersModel = model("Order", ordersSchema);