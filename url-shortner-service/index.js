import express from "express"
import { config } from "dotenv"
import { router } from "./src/routes/url.route.js"
import { ConnectDB } from "./src/connections/url.connection.js"
import { ApiError } from "./src/Utils/Apierror.utils.js"
import cors from "cors"

const app = express()

const corsOptions = {
  origin: 'http://localhost:5000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies to be sent with requests
};

config("./.env")

app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use("/",router)
app.use(cors(corsOptions))

await ConnectDB()
  .then(() => {
      const PORT = process.env.PORT ?? 8080
      app.listen(PORT,() => console.log(`Server Started at PORT ${PORT}`))
  })
  .catch((error) => {
    return res.status(500).json(
      new ApiError(
          500,
          "Internal Server Error",
          error
      )
    )
  }
)
