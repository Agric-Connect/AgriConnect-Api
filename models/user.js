import mongoose from "mongoose";
import {toJSON} from '@reis/mongoose-to-json'

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: { type: String, enum: ['farmer', 'buyer'], required: true },
    email: { type: String, required: true, unique: true },
    termsAndConditions: { type: Boolean },
    resetPasswordToken: { type: String},
    resetPasswordExpires: {type: Date},
    
  },{
       timestamps: true
  });
  
  userSchema.plugin(toJSON)
  export const UserModel = mongoose.model('User', userSchema);