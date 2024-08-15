import { UserModel } from "../models/user.js";
import { Farmer } from "../models/farmer.js";
import { farmerValidator } from "../validators/user_profile_validator.js";
import { ProfileTypeModel } from "../models/user_profile.js";

//Create farmer profile
export const addFarmerProfile = async (req, res, next) => {
  try {
    console.log('Request files:', req.files); // Log all files
    // Access file details
    const profilePicture = req.files?.profilePicture?.[0]?.filename;
    const certification = req.files?.certification?.[0]?.filename;
        
    console.log('Profile Picture Filename:', profilePicture);
    console.log('Certification Filename:', certification);
    
    //Validating Profile
    const {error, value} = farmerValidator.validate({
      ...req.body,
      profilePicture,
      certification
    });
    if (error) {
      return res.status(400).send(error.details[0].message)
    }
    console.log(value)
    const userId = req.session?.user.id || req.user?.id
  
    const user = await UserModel.findById(userId)
    if(!user){
      return res.status(404).send('User not found')
    }
  
  const farmerProfile = await Farmer.create({...value, user: userId});
  //Find profile type
  let profileType = await ProfileTypeModel.findOne({type: 'farmerProfile', profileRef: farmerProfile.id})
  
  if(!profileType){
    profileType = await ProfileTypeModel.create({
      type: 'farmerProfile',
      profileRef: farmerProfile._id
    });
  }
   // Ensure profileType is not null
   if (!profileType) {
    return res.status(500).send('Failed to create or retrieve ProfileType');
  }
  
  // associate the User document with the new ProfileType
  user.userProfile = profileType.id
  await user.save();
  
  return res.status(201).json(farmerProfile);
  } catch (error) {
    next(error)
  }
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
      return res.status(404).json({ message: 'Profile not found', profile });
    }

    res.status(200).json({ profile });
  } catch (error) {
    return res.status(500).json({ error })
  }
};

//Updating  farmer profile

export const updateFarmerProfile = async (req, res) => {
  const { error, value } = farmerValidator.validate({
    ...req.body,
    profilePicture: req.files?.profilePicture?.filename,
    certification: req.files?.certification?.filename
  });
  if (error) {
    return res.status(400).send(error.details[0].message)
  };

 

  const userId = req.session?.user?.id || req.user.id
  //find
  const user = await UserModel.findById(userId)
  if (!user) {
    return res.status(404).send("User not found");
  }

  //find the farmer profile type
  const userProfileId  = user.userProfile;
  console.log(`UserProfile ID: ${userProfileId}`);
   
  const profileType = await ProfileTypeModel.findById(userProfileId)
  if (!profileType) {
    console.log(`ProfileType not found for user ${user}`);
      return res.status(404).send("ProfileType not found");
  }
  console.log(`ProfileType found: ${profileType}`);

  //find the farmer profile id
  const farmerProfileId = profileType.profileRef;
  console.log(`FarmerProfile ID: ${farmerProfileId}`);

  const farmerProfile = await Farmer.findById(farmerProfileId);

    if (!farmerProfile) {
      console.log(`Farmer profile not found for user ${user}`);
      return res.status(404).send("Farmer profile not found");
    }

  console.log(`Farmer profile found: ${farmerProfile}`);

  // Update the Farmer profile with validated data
  const updatedProfile = await Farmer.findByIdAndUpdate(
    farmerProfile._id,
    { ...value },
    { new: true }
  )

  if (!updatedProfile) {
    return res.status(500).send("Error updating Farmer profile");
  }

  // Send the updated profile in the response
  res.status(200).json({ updatedProfile });
};

// Delete a farmer profile
export const deleteFarmerProfile = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const userProfileId = user.userProfile;
    const profileType = await ProfileTypeModel.findById(userProfileId);
    if (!profileType) {
      return res.status(404).send("ProfileType not found");
    }

    const farmerProfileId = profileType.profileRef;
    const deletedProfile = await Farmer.findByIdAndDelete(farmerProfileId);
    if (!deletedProfile) {
      return res.status(404).send('Farmer profile not found');
    }

    user.userProfile = null;
    await user.save();

    res.status(200).json("Farmer profile deleted successfully");
  } catch (error) {
    res.status(500).send('Server error');
  }
};