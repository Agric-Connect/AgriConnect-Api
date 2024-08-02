import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { loginValidator, userValidator } from "../validators/user_validator.js";

export const signup = async (req, res) => {

    //Validate user
    try {
        const { error, value } = userValidator.validate(req.body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }

        //Find if user exists
        const email = value.email

        const ifUserExist = await UserModel.findOne({ email })
        if (ifUserExist) {
            res.status(200).json("User already exists")
        } else {
            const hashedPassword = await bcrypt.hash(value.password, 12)
            value.password = hashedPassword

            //create user
            await UserModel.create(value)

            return res.status(201).send({ message: 'User created successfully' })
        }
    } catch (error) {

    }
}

//User login token
export const login = async (req, res, next) => {
    const {error, value} = loginValidator.validate(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const {email, username, password} = req.body;

     //Find a user using their unique identifier

     const user = await UserModel.findOne({
        $or: [{email: email}, 
            {username: username}
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
}

