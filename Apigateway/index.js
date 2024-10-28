import express from "express";
import { configDotenv } from "dotenv"
import { router } from "./src/routes/Apigateway.route.js"
import cors from "cors"

const app = express()
configDotenv("./.env.local")

const corsOptions = {
    origin : "",
    methods : 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(cors(corsOptions))

app.use('/',router)

const PORT = process.env.PORT ?? 7000
app.listen(PORT,() => console.log(`Server Started at PORT ${PORT}`))
