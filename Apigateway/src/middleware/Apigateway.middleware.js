import jwt from "jsonwebtoken"
import { ApiError } from "../utils/Apierror.utils.js"

const Authoptions = async(req,res,next) => {

   try { 

     const token = await req.cookies.accesstoken || req.header("Authorization").replace("Bearer ","")

     if(!token){
         return new ApiError(404,"NO token in cookie")
     }
 
     const secretKey = process.env.JWT_SECRET_KEY

     const isTokenValid = await jwt.verify(token,secretKey)
 
     if(!isTokenValid){
         return new ApiError(400,"Invalid Token - can't Verify")
     }

     req.user = isTokenValid
 
     next()

   } catch (error) {
     return res.status(500).json(
        new ApiError(
            500,
            "NO Access to -User",
            error
        )
     )
   }
}

export {
  Authoptions
}