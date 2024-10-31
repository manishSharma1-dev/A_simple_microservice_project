import mongoose from "mongoose"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import bcrypt from "bcrypt"

const RegisterUser = async(req,res) => {
    
    try {
        // Don't pass content type while exceuting this function 
        
        const { username, fullname, email, password } = await req.body

        const isvalid = [username,fullname,email,password].some((field) => {
            field.trim() === ""
        })

        if(isvalid){
            return res.status(400).json(
                new ApiError(
                    400,
                    `Fields must be valid`
                )
            )
        }

        const existedUser = await User.findOne({
            username : username,
            email : email
        })

        if(existedUser){
            return res.status(400).json(
                new ApiError(
                    400,
                    `User already exits`
                )
            )
        }
    
        const hashedPassword = await bcrypt.hash(password,10)
    
        if(!hashedPassword){
            return res.status(400).json(
                new ApiError(
                    400,
                    `Hashing Passwordd failed, retry`
                )
            )
        }
    
        const newUser = await User.create(
            {
                username : username,
                fullname : fullname,
                email : email,
                password : hashedPassword
            }
        )

        await newUser.save({ validateBeforeSave : true })
     
        const checkifUserCreatedorNot = await User.findById(newUser._id).select(" -password ")

        if(!checkifUserCreatedorNot){
            return res.status(400).json(
                new ApiError(
                    400,
                    `User Registration Failed`
                )
            )
        }
    
        return res.status(201).json(
            new Apiresponse(
                201,
                "User Registered",
                checkifUserCreatedorNot
            )
        )
    } catch(error) {
        return res.status(500).json(
            new ApiError(
                500,
                `Internal Error, User Registration Failed`,
                error?.message
            )
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

    try {

        console.log("test 1")

        const { username, email, password } = await req.body

        console.log(username,email,password)

        console.log("test 2")

        if (!email && !username) {
            return res.status(400).json(
                new ApiError(
                    400,
                    "Invalid fields - Fields must be present"
                )
            );
        }

        if (email && username) {
            return res.status(400).json(
                new ApiError(
                    400,
                    "Only One field is Required"
                )
            );
        }

        console.log("test 3")

        if(!password){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Invalid fields, - Fields must be present"
                )
            ) 
        }

        console.log("test 4")

        const existedUser = await User.findOne({
            $or : [
                {
                    username : username
                },
                {
                    email : email
                }
            ]
        })

        console.log("test 5")
        

        if(!existedUser){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Invalid field User Does not Exists"
                )
            ) 
        }

        console.log("test 6")

        const isPasswordCorrect  = await bcrypt.compare(password,existedUser?.password)

        if(isPasswordCorrect == false ){  // note if it is true -> mean passwors incorrexct
            return res.status(404).json(
                new ApiError(
                    404,
                    "Password Doesn't match"
                )
            ) 
        }

        console.log("test 7")

        const logedinUser = await User.findById(existedUser?._id).select(" -password ")



        // if user is already login then we wont create any token for him/her - wanted

        // const token = await req.cookie?.accesstoken || req.header("Authorization").replace("Bearer ") 

        // console.log("token received",token)

        // if(token){
        //     return res.status(404).json(
        //         new ApiError(
        //             404,
        //             "User already has accesstoken"
        //         )
        //     ) 
        // }

        // const verifytoken = await jwt.verify(token,process.env.JWT_SECRET_KEY)

        // console.log("veified ot not",verifytoken)

        // if(verifytoken){
        //     return res.status(400).json(
        //         new ApiError(
        //             400,
        //             "User is already Login,- token verified"
        //         )
        //     ) 
        // }

        // const accesstoken = await jwt.sign(
        //     {
        //         _id : logedinUser?._id
        //     },
        //     process.env.JWT_SECRET_KEY,
        //     {
        //         expiresIn : process.env.JWT_EXPIRE_KEY
        //     }
        // )

        // if(accesstoken.length === 0){
        //     return res.status(500).json(
        //         new ApiError(
        //             500,
        //             "Failed in - generating accesstoken"
        //         )
        //     ) 
        // }

        // const options = {
        //     httpOnly : true,
        //     secure : true
        // }

        // return res
        // .status(200)
        // .cookie("accesstoken",accesstoken,options)
        // .json(
        //     new Apiresponse(
        //         200,
        //         "User Logged in - Successfully",
        //         logedinUser
        //     )
        // )

        
        return res
        .status(200)
        .json(
            new Apiresponse(
                200,
                "User Logged in - Successfully",
                logedinUser
            )
        )

        } catch (error) {

            return res.status(500).json(
                new ApiError(
                    500,
                    "User Logged in -faield",
                    error?.message
                )
            )

        }
}

const updateusername = async(req,res) => {

    try {

        const { username,logedinUserid } = await req.body

        if(username.length === 0 ){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Username field is - required"
                )
            );
        }
    
        const userId = logedinUserid// getting it from the middleware
    
        if(!userId){
            return res.status(400).json(
                new ApiError(
                    400,
                    "User is -Logged Out"
                )
            );
        }
    
        const Updated_Username = await User.findByIdAndUpdate(
            userId,
            {
                username : username
            },
            { new : true }
        ).select(" -password ")
    
        if(!Updated_Username){
            return res.status(500).json(
                new ApiError(
                    500,
                   "Username Updation Failed"
                )
            );
        }
    
        return res.status(201).json(
            new Apiresponse(
                201,
                "Username -Updated",
                Updated_Username.username
            )
        )
    } catch (error) {
        return res.status(500).json(
            new Apiresponse(
                500,
                "Username -Updation failed",
                error?.message
            )
        )
    }
}

const updateemail = async(req,res) => {
    try {

        const { email,logedinUserid } = await req.body
    
        if(!email){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Email field is - required"
                )
            );
        }
    
        const userId = logedinUserid // getting it from the middleware
    
        if(!userId){
            return res.status(400).json(
                new ApiError(
                    400,
                    "User -Logged Out"
                )
            );
        }
    
        const Updated_Email = await User.findByIdAndUpdate(
            userId,
            {
                email : email
            },
            {
                new : true
            }
        ).select(" -password ")
    
        if(!Updated_Email){
            return res.status(500).json(
                new ApiError(
                    500,
                    "Email Updation Failed"
                )
            );
        }
    
        return res.status(201).json(
            new Apiresponse(
                201,
                "Email -Updated",
                Updated_Email?.email
            )
        )
    } catch (error) {
        return res.status(500).json(
            new Apiresponse(
                500,
                "Email Updation -failed",
                error
            )
        )
    }

}

const updatepassword = async(req,res) => {

    try {
        const { oldpassword , newpassword , logedinUserid } = await req.body

        if(!oldpassword && !newpassword){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Invalid Password, -Password field is required "
                )
            );
        }
    
        const userId = logedinUserid // getting it from the middleware
        
        if(!userId){
            return res.status(400).json(
                new ApiError(400,"User -Logged Out")
            )
        }
    
        const existedUser = await User.findById(userId)
    
        const isPasswordCorrect = await bcrypt.compare(oldpassword,existedUser?.password)
    
        if(!isPasswordCorrect){
            return res.status(405).json(
                new ApiError(405,"Password Incorrect , - you cannot change the password")
            )
        }
    
        const Updated_Password = await User.updateOne({
            password : newpassword
        })
    
        if(!Updated_Password){
            return res.status(400).json(
                new ApiError(400,"Password Updation Failed")
            )
        }
    
        return res.status(201).json(
            new Apiresponse(
                201,
                "Password -Updated",
            )
        )

    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500,
                "Password -Updation Failed",
                error?.message
            )
        )
    }
}

const Userdetails = async(req,res) => {
    try {

        const { id } = req.params
            
        if(!id){
            return res.status(400).json(
                new ApiError(400,"User need to be login for this request")
            )
        }
    
        const existedUser = await User.findById(id).select(" -password")

        if(!existedUser){
            return res.status(400).json(
                new ApiError(400,"Invalid Id - No User found")
            )
        }
    
        return res.status(200).json(
            new Apiresponse(
                200,
                "User Details -founded",
                existedUser
            )
        )
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500,
                "Failed - Not founded User detail",
                error?.message
            )
        )
    }

}


export { 
    RegisterUser,
    LoginUser,
    updateusername,
    updateemail,
    updatepassword,
    Userdetails
}