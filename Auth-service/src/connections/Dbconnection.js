import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const connectDB = async() => {
    try {

        const DBURI = process.env.DBURI
        const connectionResponse = await mongoose.connect(DBURI)
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