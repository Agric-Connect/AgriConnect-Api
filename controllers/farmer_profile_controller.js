import { UserModel } from "../models/user.js";
import { Farmer } from "../models/farmer.js";
import { farmerValidator } from "../validators/user_profile_validator.js";
import { ProfileTypeModel } from "../models/user_profile.js";

//Create farmer profile
export const addFarmerProfile = async (req, res) => {
  //Validating
  const { error, value } = farmerValidator.validate({
    ...req.body,
    profilePicture: req.files?.profilePicture?.filename,
    certification: req.files?.certification?.filename
  });
  if (error) {
    return res.status(400).send(error.details[0].message)
  };

  //find the user
  const userId = req.session?.user?.id || req.user?.id
  const user = await UserModel.findById(userId)

  if (!user) {
    return res.status(404).send('User not found')
  }

  //Create the farmer profile
  const farmerProfile = await Farmer.create({ ...value, user: userId })

  //Find profile
  let profileType = await ProfileTypeModel.findOne({ type: 'farmerProfile', profileRef: farmerProfile.id })

  if (!profileType) {
    profileType = await ProfileTypeModel.create({
      type: 'farmerProfile',
      profileRef: farmerProfile._id,
    });
  }

  // Ensure profileType is not null
  if (!profileType) {
    return res.status(500).send('Failed to create or retrieve ProfileType');
  }

  // Update the User document with the new ProfileType
   user.profilePicture = 'farmerProfile';
   user.userProfile = profileType.id
   await user.save();

   return res.status(201).json(farmerProfile);

}

export const getFarmerUserProfile = async (req, res) => {
  try {
  //  Get user id 
    const userId = req.session?.user?.id || req.user?.id

    // Find the user
    const user = await UserModel.findById(userId).populate({
      path: 'userProfile',
      populate: {
        path: 'profileRef', // Reference to the actual profile document
        select: '-user' // Exclude user field from the populated profile
      }
    })

    // Check the profile type and populate accordingly
    let profile;
    if (user.profileType === 'farmerProfile') {
      profile = await Farmer.findById(user.userProfile.profileRef).populate({
        path: 'user',
        select: '-password' // Exclude sensitive information
      });
    } else {
      return res.status(404).json({ message: 'Profile type not recognized' });
    }

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' , profile});
    }
  
    res.status(200).json({profile});
  } catch (error) {
    return res.status(500).json({error})
  }
};