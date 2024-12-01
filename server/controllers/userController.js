import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";


// Register user

export const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required."
            });
        }

        // user already exists or not
        const user = await User.findOne({email});

        // if user already exists
        if(user){
            return res.status(400).json({
                success : false,
                message : "User Already Exists."
            });
        }

        // if user not exists then create new user
        const hashedPassword = await bcrypt.hash(password,10); // sabse pehle password encrypt kro
        await User.create({name,email,password:hashedPassword});

        return res.status(201).json({
            success : true,
            message : "Account Created Successfully."
        });


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Failed to register."
        });
    }
}


// Login user

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "All fields are required."
            });
        }

        // check user exists or not
        const user = await User.findOne({email});

        // if user doesn't exists then no need to login
        if(!user){
            return res.status(400).json({
                success : false,
                message : "Incorrect email or password."
            });
        }

        // if user exists then match password with database 
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : "Incorrect email or password."
            });
        }

        // if password matches, create token logic
        generateToken(res,user,`Welcome back ${user.name}`);

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Failed to register."
        });
    }
}