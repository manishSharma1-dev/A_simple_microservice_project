import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectDB = async() => {
    try {

        const DBURI = process.env.MONGO_URI

        const connectionResponse = await mongoose.connect(`${DBURI}/urlshortnerAuthService`)

        if(!connectionResponse){
            return new ApiError(
                500,
                "DB connection failed , No - Response received",
            )
        }

        console.log(`Database connection Succeded`)

    } catch (error) {
        return new ApiError(
            500,
            "DB connection Failed",
            error
        )
    }
}

export { 
    connectDB
}