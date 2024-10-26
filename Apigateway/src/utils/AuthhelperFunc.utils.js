import { ApiError } from "../utils/Apierror.utils.js"
import { Apiresponse } from "../utils/Apiresponse.utils.js"

//  + points to remember 
//  -> pathstring  :- it refers to the api string after /api like registerUser,loginuser,updateusername etc
//  -> reponseMessage :- it refers to the message that we will pass to the frontend
//  -> ResponseStatus :- it refers to the status code that wew will pass when we get success reponse
//  -> method :- it refers to the method that we will be using like 400, 404, 201, 200 ,500 etc
//  -> errorMessage : it refers to the message that we will pass when we fail in the catch part 
//  -> errorStatus : it refers to the status that we will pass after we fail

const HelperFunctionTemplate = async({ pathstring, responseMessage,ReponseStatus,method, errorMessage, errorStatus, req,res }) => {

    try {

        const AUTHSERVICEURL = process.env.AUTH_SERVICE_URL

        const response = await fetch(`${AUTHSERVICEURL}/api/${pathstring}`, {
            method : method,
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(req.body)
        })

        const data = await response.json()

        return res.status(ReponseStatus).json(
            new Apiresponse(
                ReponseStatus,
                responseMessage,
                data
            )
        )
        
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                errorStatus  || error.response?.status,
                errorMessage,
                error ?? error.message
            )
        )
    }

}

export {
    HelperFunctionTemplate
}