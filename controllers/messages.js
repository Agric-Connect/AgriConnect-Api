import { Schema, Types, model } from "mongoose";

const messageSchema = new Schema({
    senderID: { type: Types.ObjectId, required: true, ref: "user" },
    recipientID : { type: String, required: true, ref: "user" },
    content: { type: String, required: true },
    status: { type: String, default: "Delivered" },
    user: {type: Types.ObjectId, ref:"User", select: false},
}, {
    timestamps: true
});

export const MessageModel = model("message", messageSchema);