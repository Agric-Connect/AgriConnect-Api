import { UserModel } from "../models/user.js";
import { Buyer, Farmer } from "../models/user_profile.js";
import { buyerValidator, farmerValidator } from "../validators/user_profile_validator.js";


//creating a user profile
export const createUserProfile = async (req, res, next) => {
    try {
        //Validating 
        let validator;
        if(user.role === 'Farmer'){
            validator = farmerValidator;
        }else if (user.role === 'Buyer'){
            validator = buyerValidator;
        } else{
            return res.status(400).send(error.details[0].message);
        }
        //Data
        let validationData;
    if (user.role === 'Farmer') {
      validationData = {
        ...req.body,
        profilePicture: req.files?.profilePicture?.filename,
        certification: req.files?.certification?.filename
      };
    } else {
      validationData = {
        ...req.body,
        profilePicture: req.files?.profilePicture?.filename,
      };
    }
       const {error, value } = validator.validate(validationData)
       if (error) {
        return res.status(400).send(error.details[0].message);
       }
        
       const userId = req.session?.user?.id || req?.user.id;
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({msg: "User not found"});
        }
     //Create the profile for both fields
        const profile = await(user.role === 'Farmer' ? Farmer : Buyer).create({
            ...value,
            user: userId
        })
    
        //saving the profile in the profile id
        user.userProfile = profile.id
        await user.save()
    
        res.status(201).json({message:"Profile created successfully", profile})
    
    } catch (error) {
        console.log(error);
        next(error)
    }
}


export const patchProfile = async(req,res,next) => {
    
}



