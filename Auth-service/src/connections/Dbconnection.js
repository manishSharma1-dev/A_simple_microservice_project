import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectDB = async() => {
    try {

        const DBURI = process.env.DBURI
        const DB_COLLECTION_NAME = process.env.COLLECTION_NAME
        const connectionResponse = await mongoose.connect(`${DBURI}/${DB_COLLECTION_NAME}`)
            .then(() => {

                console.log(`DB connection Succeded, Response - ${connectionResponse}`)

            }).catch((error) => {

                return new ApiError(
                    500,
                    "DB connection failed , No Response received - ",
                    error
                )

            })
        
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