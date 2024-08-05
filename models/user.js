import mongoose from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const userSchema = new mongoose.Schema({
     firstName: { type: String },
     lastName: { type: String },
     otherNames: { type: String },
    username: { type: String, lowercase: true, unique: true },
    password: { type: String, },
    role: { type: String, enum: ['Farmer', 'Buyer',],},
    email: { type: String, lowercase: true, unique: true },
    termsAndConditions: { type: Boolean },
    profileType: {
     type: String,
     enum: ['farmerProfile', 'buyerProfile'],
     default: function() {
       return this.role === 'Farmer' ? 'farmerProfile' : this.role === 'Buyer' ? 'buyerProfile' : null;
     }
   },
   userProfile: { type: mongoose.Schema.Types.ObjectId, refPath: 'profileType' },
    
  },{
       timestamps: true
  });
  
  userSchema.plugin(toJSON)
  export const UserModel = mongoose.model('User', userSchema);