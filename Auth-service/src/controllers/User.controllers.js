import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

const LoginUser = async(req,res) => {
    //steps to login User 
    // 1 - take the credential from the user
    // 2 - Chack validation of it 
    // 3 - Check if User exits in the db or not
    // 4 - matched the hashed password with the unhashed password 
    // 5 - check if the details are matched or not - if not return message 
          // + if yes 
               // - generate an accesstoken 
               // - return the acces token in the user session

    const { email, password } = await req.json()

    if(password.length === 0 && email.length === 0){
        return new ApiError(400,"Invalid fields, - Fields must be present")
    }

    const existedUser = await User.findOne({
        email : email,
        password : password
    })

    if(!existedUser){
        return new ApiError("Invalid field User Does not Exists")
    }

    const isPasswordCorrect  = await bcrypt.compare(password,existedUser?.password)

    if(isPasswordCorrect === true){
        return new ApiError(404,"Password Doesn't match")
    }

    const logedinUser = await User.findById(existedUser?._id).select(" -password ")

    const accesstoken = await jwt.sign(
        {
            _id : logedinUser?._id
        },
        process.env.JWT_SECRET_KEY,
        {
             expireIn : process.env.JWT_EXPIRE_KEY
        }
    )


    if(accesstoken.length === 0){
        return new ApiError(
            500,
            "Failed in - generating accesstoken"
        )
    }

    const options = {
        httpOnly : true,
        secure : true
    }


    return res
    .status(200)
    .cookie("accesstoken",accesstoken,options)
    .json(
        200,
        "User Logged in - Successfully",
        logedinUser
    )
}

export { 
    RegisterUser,
    LoginUser
}