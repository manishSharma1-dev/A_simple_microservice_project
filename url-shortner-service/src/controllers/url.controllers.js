import { URL } from "../models/url.model.js"
import { ApiError } from "../Utils/Apierror.utils.js"
import { Apiresponse } from "../Utils/Apiresponse.utils.js"

async function GenerateRandomString(length){
    let letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""

    for (let i = 0; i < length; i++) {
        const randomIndex = await Math.floor(Math.random() * letter.length);
        result += letter[randomIndex];
    }

    return result
}

const ShortenUrl = async(req,res) => {
    try {

        const { url } = await req.body

        if(!url){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Url didn't recieved"
                )
            )
        }
    
        let RandomString = await GenerateRandomString(7)

        const PORT = process.env.PORT ?? 7000
    
        const newurl = `http://localhost:${PORT}/` + RandomString

        const date = new Date();

        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long', 
            year: 'numeric',  
            month: '2-digit',
            day: '2-digit'  
        });
    
        const NewlyaddedUrlInfotoDb = await URL.create({
            ID : RandomString,
            Urlgiven : url,
            UrlGenerated : newurl,
            TotalNoofClicks : 0,
            Createdat : formattedDate
        })
    
        const newAddedUrlexist = await URL.findById(NewlyaddedUrlInfotoDb?._id)
    
        if(!newAddedUrlexist){
            return res.status(404).json(
                new ApiError(500,"Failed to Add new Url to the Db")
            )
        }
    
        return res.status(200).json(
            new Apiresponse(
                200,
                "Created New Url -Success",
                newAddedUrlexist
            )
        )

    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500,
                "Failed to Create new Short Url",
                error?.message
            )
        )
    }
}

const Getallurls = async(req,res) => {
    try {

        console.log("test 1")

        const allUrl = await URL.find({ })

        console.log("test 2")
    
        if(!allUrl){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Failed to get the url"
                )
            )
        }

        console.log("test 3")
    
        if(allUrl.length === 0){
            return res.status(404).json(
                new ApiError(404,"No Url to show")
            )
        }

        console.log("test 4")
    
        return res.status(200).json(
            new Apiresponse(
                200,
                "Fetched all urls",
                allUrl
            )
        )
    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500,
                "faield to get all the urls",
                error?.message
            )
        )
    }
}

const RedirectToOriginalUrl = async(req,res) => {

    try {

        const { id } = req.params

        if(!id){
            return res.status(400).json(
                new ApiError(
                    400,
                    "Id Didn't received"
                )
            )
        }

        const findUrl = await URL.findOne(
            {
                ID : id
            }
        )

    
        if(!findUrl){
            return res.status(400).json(
                new ApiError(400,"Invalid :ID Passed")
            )
        }   
        
        const urltoredirect = await findUrl?.Urlgiven
    
        res.redirect(urltoredirect)

    } catch (error) {
        return res.status(500).json(
            new ApiError(
                500,
                "Failed to redirect User to the Original Url",
                error?.message
            )
        )
    }
}

export { 
    ShortenUrl,
    Getallurls,
    RedirectToOriginalUrl
}