import { Farm } from "../models/farm_information.js";
import { UserModel } from "../models/user.js";
import { farmInfoValidator } from "../validators/farminfo_validator.js";

export const createFarmInfo = async(req, res, next) => {
    try {
      const {error, value} = farmInfoValidator.validate({
          ...req.body,
          image: req.file?.filename
  
      })
  
      if (error) {
          return res.status(400).send(error.details[0].message);
        }
  
        const userId = req.session?.user?.id || req?.user?.id
  
        const user = await UserModel.findById(userId)
  
        if (!user) {
          return res.status(404).send("User not found");
        }
  
        const farmInfo = await Farm.create({value, user: userId});
  
        user.farmInformation =  farmInfo.id
  
        await user.save();
  
        res.status(201).json({ farmInfo});
    } catch (error) {
      next(error)
    }
}

// Get all user skills
export const getAllFarmInfo = async (req, res) => {
  try {
    const userId = req.session?.user?.id || req?.user?.id
    const allFarmInfo = await Farm.find({ user: userId });
    
    res.status(200).json({ Information: allFarmInfo });
  } catch (error) {
    return res.status(500).send("Server error");
  }
};

//Get one farm info