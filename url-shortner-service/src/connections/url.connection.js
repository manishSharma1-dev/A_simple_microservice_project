import mongoose from "mongoose";
import { ApiError } from "../Utils/Apierror.utils.js";

const ConnectDB = async(req,res) => {

    const ConnectionString = process.env.MONGO_URI

    const CollectionName = process.env.DB_COLLECTION_NAME

    const connectionResult = await mongoose.connect(`${ConnectionString}${CollectionName}`)

    if(!connectionResult){
        return res.status(400).json(
            new ApiError(
                500,
                "Didn't get the connection Result"
            )
        )
    }

    console.log("Database Connected Successfully")
}

export {
    ConnectDB
}