import { URL } from "../models/url.model.js"
import { ApiError } from "../Utils/Apierror.utils.js"
import { Apiresponse } from "../Utils/Apiresponse.utils.js"

function GenerateRandomString(length){
    let letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * letter.length);
        result += letter[randomIndex];
    }

    return result
}

const ShortenUrl = async(req,res) => {
    try {
        const { url } = await req.json()
    
        let RandomString = GenerateRandomString(7)
    
        const newurl = "http://localhost:4000/" + RandomString
    
        const NewlyaddedUrlInfotoDb = await URL.create({
            ID : RandomString,
            Urlgiven : url,
            UrlGenerated : newurl,
            TotalNoofClicks : 0,
            Createdat : Date.now()
        })
    
        const newAddedUrlexist = URL.findById(NewlyaddedUrlInfotoDb?._id)
    
        if(!newAddedUrlexist){
            return new ApiError(500,"Failed to Add new Url to the Db")
        }
    
        return res.status(200).json(
            new Apiresponse(
                200,
                "Created New Url -Success",
                newAddedUrlexist
            )
        )
    } catch (error) {
        return new ApiError(
            500,
            "Failed to Create new Short Url",
            error
        )
    }
}

const Getallurls = async(req,res) => {
    try {
        const allUrl = await URL.find({ })
    
        if(!allUrl){
            return new ApiError(400,"Failed to get the url")
        }
    
        if(allUrl.length === 0){
            return new ApiError(500,"No Url to show")
        }
    
        return res.status(200).json(
            new Apiresponse(
                200,
                "Fetched all urls",
                allUrl
            )
        )
    } catch (error) {
        return new ApiError(
            500,
            "faield to get all the urls",
            error
        )
    }
}

const RedirectToOriginalUrl = async(req,res) => {
    try {
        const { id } = await req.params
    
        const findUrl = await URL.findById(id)
    
        if(!findUrl){
            return new ApiError("Invalid :ID Passed")
        }
    
        const urltoredirect = findUrl?.Urlgiven
    
        res.redirect(urltoredirect)

    } catch (error) {
        return new ApiError(
            500,
            "Failed to redirect User to the Original Url",
            error
        )
    }
}

export { 
    ShortenUrl,
    Getallurls,
    RedirectToOriginalUrl
}