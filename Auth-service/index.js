import express from "express";
import { configDotenv } from "dotenv"
import { connectDB } from "./src/connections/Dbconnection.js"
import { ApiError } from "./src/utils/ApiError.js";
import cookieParser from "cookie-parser";

const app = express()
const PORT = process.env.PORT ?? 5000
configDotenv('./.env.local')

// const corsOptions = {
//     origin: 'http://localhost:5173', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true, // Allow cookies to be sent with requests
// };

app.use(express.urlencoded({ extended : true }))
app.use(express.json())
app.use(cookieParser)


connectDB()
    .then(() => {
        
        app.listen(PORT,() => console.log(`Server Started at PORT ${PORT}`))
        
    })
    .catch((error) => {
        return new ApiError(500,"Issue In Starting Server",error)
    })
