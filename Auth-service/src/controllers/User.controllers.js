import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import bcrypt from "bcrypt"

const RegisterUser = async (req,res) => {
    // steps to Register User
    // 1. take the data from the User
    // 2. check if the User already exits in the Db if yes - then return msg
    // 3. if no + 
            //  - take the password and hash it 
            //  - add the user to the User model and return the message 
            //  - return data to the User

    
    try {
        const { username, fullname, email, password } = await req.json()
        
        [username,fullname,email,password].map((field) => {
            if(field.length === 0){
                return new ApiError(400,`Invalid ${field}, All fields are Requied`)
            }
        })
    
        const existedUser = await User.findOne({
            $or : [{username : username}, {email : email}]
        })
    
        if(!existedUser){
            return new ApiError(400,"User already exits")
        }
    
        const hashedPassword = await bcrypt.hash(password,10)
    
        if(!hashedPassword){
            return new ApiError(500,"Hashing Passwordd failed, retry")
        }
    
        const newUser = await User.create(
            {
                username : username,
                fullname : fullname,
                email : email,
                password : hashedPassword
            }
        )
    
        const checkifUserCreatedorNot = await User.findById(newUser._id).select(" -password ")
    
        if(!checkifUserCreatedorNot){
            return new ApiError(500,"User Registration Failed")
        }
    
    
        return res.status(201).json(
            new Apiresponse(
                201,
                "User Registered",
                checkifUserCreatedorNot
            )
        )
    } catch (error) {
        return new ApiError(
            500,
            "Internal Error, User Registration Failed",
            error
        )
    }
}

export { 
    RegisterUser
}