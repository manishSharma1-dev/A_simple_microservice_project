import { ApiError } from "../utils/Apierror.utils.js"
import { Apiresponse } from "../utils/Apiresponse.utils.js"
import axios from "axios"
import jwt from "jsonwebtoken"

// const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL
// const SHORTENSERVICEURL = process.env.SHORTEN_SERVICE_URL

const HelpRegister = async(req,res) => {

    try {

        const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL
        
        const response = await axios.post(`${AUTHSERVICEURL}/api/registerUser`, req.body)

        if(!response){
            return res.status(500).json(
                new ApiError(
                    500,
                    "Error -Response didn't received"
                )
            )
        }

        console.log("Response from the Backend")

        return res.json(
            new Apiresponse(
                await response?.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -routing to Register",
                error.response?.data
            )
        )
    }
}


const HelpLogin = async(req,res) => {

    try {

        const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL

        const response = await axios.post(`${AUTHSERVICEURL}/api/loginuser`, req.body)

        if(!response){
            return res.status(500).json(
                new ApiError(
                    500,
                    "Error -Response didn't received"
                )
            )
        }

        const logedinUserId = await response?.data?.data?._id

        console.log(logedinUserId)

        const accesstoken = await jwt.sign(
            {
                _id : logedinUserId
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn : process.env.JWT_EXPIRE_KEY
            }
        )

        if(accesstoken.length === 0){
            return res.status(500).json(
                new ApiError(
                    500,
                    "Failed in - generating accesstoken"
                )
            ) 
        }

        const options = {
            httpOnly : true,
            secure : true
        }


        return res
        .cookie("accesstoken",accesstoken,options)
        .json(
            new Apiresponse(
                await response?.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500  || error.response?.status,
                "Failed -routing to Login",
                error.response?.data
            )
        )
    }
}

const HelpUpdateUsername = async(req,res) => {
    try {

        const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL

        const userid = req.user._id

        const response = await axios.put(`${AUTHSERVICEURL}/api/updateusername`, {
            ...req.body,
            logedinUserid : userid
        })

        if(!response){
            return res.status(500).json(
                new ApiError(
                    500,
                    "Error -Response didn't received"
                )
            )
        }

        return res.json(
            new Apiresponse(
                await response?.data
            )
        )
        
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                "Failed -Updating UserName",
                error.response?.data
            )
        )
    }
}

const HelpEmail = async(req,res) => {
    try {

        const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL

        const userid = req.user._id

        const response = await axios.put(`${AUTHSERVICEURL}/api/updateemail`,  {
            ...req.body,
            logedinUserid : userid
        })

        if(!response){
            return res.status(500).json(
                new ApiError(
                    500,
                    "Error -Response didn't received"
                )
            )
        }

        return res.json(
            new Apiresponse(
                response.data
            )
        )
        
        
    } catch (error) {
        return res.json(
            new ApiError(
                error.response?.data
            )
        )
    }
}

const HelpUpdatePassword = async(req,res) => {
    try {

        const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL

        const userid = req.user._id

        const response = await axios.put(`${AUTHSERVICEURL}/api/updatepassword`,  {
            ...req.body,
            logedinUserid : userid
        })

        if(!response){
            return res.status(500).json(
                new ApiError(
                    500,
                    "Error -Response didn't received"
                )
            )
        }

        console.log("Response from the Backend",await response.data)

        return res.json(
            new Apiresponse(
                response.data
            )
        )
        
        
    } catch (error) {
        return res.json(
            new ApiError(
                error.response?.data
            )
        )
    }
}

const HelpGetUserDetail = async(req,res) => {

    try {

        const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL

        const id = req.user._id

        const response = await axios.get(`${AUTHSERVICEURL}/api/userdetail/${id}`)

        if(!response){
            return res.status(500).json(
                new ApiError(
                    500,
                    "Error -Response didn't received"
                )
            )
        }

        console.log("Response from the Backend",await response.data)

        return res.json(
            new Apiresponse(
                response.data
            )
        )
        
        
    } catch (error) {
        return res.json(
            new ApiError(
                error.response?.data
            )
        )
    }
}

// controllers for Url shortner service
//in this ypu need to pass the authorization token to get all the url ans fpr generating Short url

const HelpGetallUrl = async(req,res) => {

   try {

    const SHORTENSERVICEURL = process.env.SHORTEN_SERVICE_URL

    if(!SHORTENSERVICEURL){
        return res.status(400).json(
            new ApiError(
                400,
                "Shortner Service url not provided"
            )
        )
    }
 
     if(!response){
        return res.status(500).json(
            new ApiError(
                500,
                "Error -Response didn't received"
            )
        )
    }

     return res.json(
         new Apiresponse(
            await response.data
         )
     )
   } catch (error) {
        return res.json(
            new ApiError(
                error.response?.data
            )
        )
   }
}


const HelpShortenUrl = async(req,res) => {
  try {

        const SHORTENSERVICEURL = process.env.SHORTEN_SERVICE_URL

        if(!SHORTENSERVICEURL){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Shortner Service url not provided"
                )
            )
        }
    

      const response = await axios.post(`${SHORTENSERVICEURL}/url/shorten-url`, req.body)

      if(!response){
        return res.status(500).json(
            new ApiError(
                500,
                "Error -Response didn't received"
            )
        )
    }
  
      return res.json(
          new Apiresponse(
              await response.data
          )
      )

  } catch (error) {
    return res.json(
        new ApiError(
            error.response?.data
        )
    )
  }
}


const HelpRedirecttoOriginalUrl = async(req,res) => {
    try {

        const SHORTENSERVICEURL = process.env.SHORTEN_SERVICE_URL

        if(!SHORTENSERVICEURL){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Shortner Service url not provided"
                )
            )
        }

        const { id } = req.params

        await axios.get(`${SHORTENSERVICEURL}/${id}`)

    } catch (error) {
        return res.json(
            new ApiError(
                error.response?.data
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