import express from "express";
import { config } from "dotenv"
import { router } from "./src/routes/Apigateway.route.js"
import cookieParser from "cookie-parser";
// import cors from "cors"

const app = express()
config("./.env")

// const corsOptions = {
//     origin : "",
//     methods : 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
// }

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cookieParser())
// app.use(cors(corsOptions))

app.use('/',router)

const PORT = process.env.PORT ?? 5000

app.listen(PORT,() => console.log(`Server Started at PORT ${PORT}`))
