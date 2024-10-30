import { ApiError } from "../utils/Apierror.utils.js"
import axios from "axios"
import { Apiresponse } from "../utils/Apiresponse.utils.js"

const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL
const SHORTENSERVICEURL = process.env.SHORTEN_SERVICE_URL

const HelpRegister = async(req,res) => {
    try {

        const response = await axios.post(`${AUTHSERVICEURL}/api/registerUser`, req.body)

        if(!response){
            return new ApiError(500,"Error -Response didn't received")
        }

        return res.status(201).json(
            new Apiresponse(
                201,
                "Rgisterd User -Success",
                response.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -routing to Register",
                error ?? error.message
            )
        )
    }
}


const HelpLogin = async(req,res) => {

    try {

        const response = await axios.post(`${AUTHSERVICEURL}/api/loginuser`, req.body)

        if(!response){
            return new ApiError(500,"Error -Response didn't received")
        }

        return res.status(201).json(
            new Apiresponse(
                201,
                "User Login -Success",
                response.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -routing to Login",
                error ?? error.message
            )
        )
    }
}

const HelpUpdateUsername = async(req,res) => {
    try {

        const response = await axios.put(`${AUTHSERVICEURL}/api/updateusername`, req.body)

        if(!response){
            return new ApiError(500,"Error -Response didn't received")
        }

        return res.status(200).json(
            new Apiresponse(
                200,
                "UserName Updated -Success",
                response.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -Updating UserName",
                error ?? error.message
            )
        )
    }
}

const HelpEmail = async(req,res) => {
    try {

        const response = await axios.put(`${AUTHSERVICEURL}/api/updateemail`, req.body)

        if(!response){
            return new ApiError(500,"Error -Response didn't received")
        }

        return res.status(200).json(
            new Apiresponse(
                200,
                "Email Updated -Success",
                response.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -Updating Email",
                error ?? error.message
            )
        )
    }
}

const HelpUpdatePassword = async(req,res) => {
    try {

        const response = await axios.put(`${AUTHSERVICEURL}/api/updatepassword`, req.body)

        if(!response){
            return new ApiError(500,"Error -Response didn't received")
        }

        return res.status(200).json(
            new Apiresponse(
                200,
                "Password Updated -Success",
                response.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -Updating Password",
                error ?? error.message
            )
        )
    }
}

const HelpGetUserDetail = async(req,res) => {

    try {

        const response = await axios.get(`${AUTHSERVICEURL}/api/userdetail`)

        if(!response){
            return new ApiError(500,"Error -Response didn't received")
        }

        return res.status(200).json(
            new Apiresponse(
                200,
                "Fetched Userdetail -Success",
                response.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -Fetching Userdetail",
                error ?? error.message
            )
        )
    }
}

// controllers for Url shortner service

const HelpGetallUrl = async(req,res) => {
   try {
     const response = axios.get(`${SHORTENSERVICEURL}/getallurl`)
 
     if(!response){
         return new ApiError(500,"Error -Response didn't received")
     }
 
     return res.status(200).json(
         new Apiresponse(
             200,
             "Fetched all Url -Success",
             response.data
         )
     )
   } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -Fetching AllUrls",
                error ?? error.message
            )
        )
   }
}


const HelpShortenUrl = async(req,res) => {
  try {
      const response = await axios.post(`${SHORTENSERVICEURL}/api/updatepassword`, req.body)
  
      if(!response){
          return new ApiError(500,"Error -Response didn't received")
      }
  
      return res.status(200).json(
          new Apiresponse(
              200,
              "Created New Url -Success",
              response.data
          )
      )
  } catch (error) {
    return res.status(500).json(
        new ApiError(
            500  || error.response?.status,
            "Failed -Creating newUrl",
            error ?? error.message
        )
    )
  }
}


const HelpRedirecttoOriginalUrl = async(req,res) => {
    try {
        await axios.get(`${SHORTENSERVICEURL}/:id`)
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -to redirect to the newUrl",
                error ?? error.message
            )
        )
    }
}


export {
    HelpRegister,
    HelpLogin,
    HelpUpdateUsername,
    HelpEmail,
    HelpUpdatePassword,
    HelpGetUserDetail,
    HelpGetallUrl,
    HelpShortenUrl,
    HelpRedirecttoOriginalUrl
}