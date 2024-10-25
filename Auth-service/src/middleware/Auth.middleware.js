import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const Authoptions = async(res,req,next) => {
    const token = await req.cookie?.accesstoken || req.header("Authorization").replace("Bearer ")

    if(!token){
        return new ApiError(400,"User need to logout")
    }

    const verifiedToken = await jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
    )

    if(!verifiedToken){
        return new ApiError(400,"Invalid Token - can't Verify")
    }

    const user = await User.findById(verifiedToken?._id).select(" -password ")

    if(!user){
        return new ApiError(500,"token invalid no User find")
    }

    const result = user?._conditions

    req.user = result

    next()
}

export { 
    Authoptions
}