import mongoose from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';

const userSchema = new mongoose.Schema({
     firstName: { type: String },
     lastName: { type: String },
     otherNames: { type: String },
    username: { type: String, lowercase: true, unique: true },
    password: { type: String, },
    userRole: { type: String, enum: ['farmer', 'buyer'],},
    email: { type: String, lowercase: true, unique: true },
    termsAndConditions: { type: Boolean },
    
  },{
       timestamps: true
  });
  
  userSchema.plugin(toJSON)
  export const UserModel = mongoose.model('User', userSchema);