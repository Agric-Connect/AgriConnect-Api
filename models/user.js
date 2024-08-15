import { Schema, model, Types } from "mongoose";
import { toJSON } from '@reis/mongoose-to-json';

const userSchema = new Schema({
     firstName: { type: String },
     lastName: { type: String },
     otherNames: { type: String },
     username: { type: String, lowercase: true, unique: true },
     password: { type: String, },
     role: { type: String, enum: ['Farmer', 'Buyer',], },
     email: { type: String, lowercase: true, unique: true },
     termsAndConditions: { type: Boolean },
     userProfile: { type: Types.ObjectId, ref: 'ProfileType' },
     listings: [{ type: Types.ObjectId, ref: 'listing' }],
     savedListings: [{ type: Types.ObjectId, ref: "listing" }],
     myOrders: [{ type: Types.ObjectId, ref: 'listing' }],
     profileType: {
          type: String,
          enum: ['farmerProfile', 'buyerProfile'],
          default: function () {
               return this.role === 'Farmer' ? 'farmerProfile' : this.role === 'Buyer' ? 'buyerProfile' : null;
          }

     },
     farmInformation: { type: Types.ObjectId, ref: 'Farm' },

}, {
     timestamps: true
});

userSchema.plugin(toJSON)
export const UserModel = model('User', userSchema);