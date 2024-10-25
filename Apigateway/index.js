import express from "express";
import { configDotenv } from "dotenv"
import { router } from "./src/routes/Apigateway.route.js"

const app = express()
configDotenv(".env.local")

app.use(express.json())
app.use('/',router)


const PORT = process.env.PORT ?? 7000
app.listen(PORT,() => console.log(`Server Started at PORT ${PORT}`))
