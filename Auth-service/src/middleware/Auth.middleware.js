import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const Authoptions = async(req,res,next) => {

    const token = await req.cookies?.accesstoken || req.header('Authorization').replace("Bearer ","")

    if(!token){
        return res.status(400).json(
            new ApiError(
                400,
                "User need to logout"
            )
        );
    }

    const verifiedToken = await jwt.verify(
        token,
        process.env.JWT_SECRET_KEY
    )

    if(!verifiedToken){
        return res.status(400).json(
            new ApiError(
                400,
                "Invalid Token - can't Verify"
            )
        );
    }

    const user = await User.findById(verifiedToken?._id).select(" -password ")

    if(!user){
        return res.status(500).json(
            new ApiError(
                500,
                "token invalid no User find"
            )
        );
    }

    const result = user?._id

    req.user = result

    next()
}

export { 
    Authoptions
}