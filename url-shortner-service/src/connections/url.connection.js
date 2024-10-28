import mongoose from "mongoose";
import { ApiError } from "../Utils/Apierror.utils.js";

const ConnectDB = async() => {
    const ConnectionString = process.env.MONGO_URL
    const CollectionName = process.env.DB_COLLECTION_NAME
    const connectionResult = await mongoose.connect(`${ConnectionString}${CollectionName}`)

    if(!connectionResult){
        return new ApiError(500,"Didn't get the connection Result")
    }

    console.log("Database Connected Successfully")
}

export {
    ConnectDB
}