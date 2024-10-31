import mongoose,{ Schema } from "mongoose"

const UrlSchema = new Schema(
    {
        ID : {
            type : String,
            required : true,
            unique : true
        },
        Urlgiven : {
            type : String,
            required : true
        },
        UrlGenerated : {
            type : String,
            required : true
        },
        TotalNoofClicks : {
            type : Number,
            required  : true
        },
        Createdat  : {
            type : String,
            required : true
        }

    } ,{ timestamps : true }
)


const URL = mongoose.model("URL",UrlSchema)

export { 
    URL
}