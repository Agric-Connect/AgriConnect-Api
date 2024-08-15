import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { loginValidator, userValidator } from "../validators/user_validator.js";
import { mailTransport } from "../config/email.js";

export const signup = async (req, res,next) => {
    try {
      const {error, value} = userValidator.validate(req.body);
      if (error) {
          return res.status(400).json({message: error.details[0].message});
      }
      const email = value.email;
  
      const ifUserExist = await UserModel.findOne({email});
      if(ifUserExist){
          return res.status(400).json({message: "User already exist"});
      }else {
          const hashedPassword = await bcrypt.hash(value.password, 12);
          value.password = hashedPassword
  
          await UserModel.create(value);
           // Send email to user
           await mailTransport.sendMail({
            from: process.env.SMTP_EMAIL_FROM,
            to: value.email,
            subject: "User Account Created!",
            text: `Dear ${value.firstName},\n\nA user account has been created for you with the following credentials.\n\nUsername: ${value.username}\nEmail: ${value.email}\nRole: ${value.role}\n\nThank you!`,
        });
          return res.status(201).json({message: "User created successfully"});
      }
    } catch (error) {
      next(error)
    }
}

  

//User login token
export const login = async (req, res, next) => {
    try {
      const {error, value} = loginValidator.validate(req.body);
      if(error){
          res.status(400).send(error.details[0].message)
      }
  
  
       //Find a user using their unique identifier
  
       const user = await UserModel.findOne({
          $or: [{email: value.email}, 
              {username: value.username}
          ]
       })
       if(!user){
          return res.status(401).json('No user found')
      }else{
          //Verify password
          const correctPassword = bcrypt.compareSync(req.body.password, user.password);
          if(!correctPassword){
           res.status(401).json('Invalid credentials');
          }else{
              //Generate a token
              const token = jwt.sign (
                  {id: user.id}, 
                  process.env.JWT_PRIVATE_KEY,
                  {expiresIn: '24h'},
                );
                res.status(200).json({
                  message: 'User logged in successfully',
                  accessToken: token
                })
          }
      }
    } catch (error) {
     next(error)
    }
}


//Get a user by username
export const getUserByUsername = async (req, res, next) => {
  try {
      const username = req.params.username.toLowerCase()
  
      const userDetails = await UserModel.findOne({ username}) .select("-password")
      .populate("userProfile")
      .populate("listings")
      return res.status(201).json({user:userDetails})
  } catch (error) {
    next(error)
  }
}


//Get users

export const getUsers = async (req, res, next) => {
 
  try {
      const email = req.query.email?.toLowerCase()
      const username = req.query.username?.toLowerCase();
    
      const filter = {};
      if (email) {
        filter.email = email;
      }
      if (username) {
        filter.username = username;
      }
    
      const users = await UserModel.find(filter);
    
      return res.status(200).json({ users });
  } catch (error) {
    next(error)
  }
  };