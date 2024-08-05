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
        
       const userId = req.session?.user?.id || req?.user?.id;
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
    //Validating 
    try {
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
    
         const {error, value} = validationData.validate(validationData)
         if (error) {
            return res.status(400).send(error.details[0].message);
           }
    
           const userId = req.session?.user?.id || req?.user?.id
           const user = await UserModel.findById(userId)
           if (!user) {
            return res.status(404).send("User not found");
          }
    
          const profile = await (user.role === 'Farmer' ? Farmer : Buyer).findByIdAndUpdate(req.params.id, value, { new: true })
    
          res.status(201).json({message:"User profile updated successfully", profile})
    } catch (error) {
        console.log(error);
        next(error)
    }
}

//get a userprofile
export const getUserProfile = async(req,res, next) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id
    const userRole = req.user?.role
    if (!userId || !userRole) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    let profile;  
    if (userRole === 'Farmer') {
        await Farmer.findOne({  user: userId}).populate({
            path: 'user',
            select: '-password'
          });
    }else if(userRole === 'Buyer'){
        await Buyer.findOne({  user: userId}).populate({
            path: 'user',
            select: '-password'
        })
    }else {
        return res.status(400).json({ message: "Invalid user role" });
      } 
      
      if(!profile){
          return res.status(200).send({message:"Profile not found", profile})
      }
  
      res.status(200).json({profile });
  } catch (error) {
    console.log(error);
        next(error)
  }
}


