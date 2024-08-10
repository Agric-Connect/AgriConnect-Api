import { Schema, model, Types } from "mongoose";
import {toJSON} from '@reis/mongoose-to-json';


const profileTypeSchema = new Schema({
    type: {
      type: String,
      enum: ['farmerProfile', 'buyerProfile'],
      required: true,
    },
    profileRef: { // This will point to the actual profile document
        type: Types.ObjectId,
        refPath: 'profileType', // Dynamically set reference based on `profileType`
      },
  });
 
  profileTypeSchema.plugin(toJSON)

export const ProfileTypeModel = model('ProfileType', profileTypeSchema);
