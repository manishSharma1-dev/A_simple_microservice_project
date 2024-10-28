import express from "express"
import { configDotenv} from "dotenv"
import { router } from "./src/routes/url.route.js"
import { ConnectDB } from "./src/connections/url.connection.js"
import { ApiError } from "./src/Utils/Apierror.utils.js"

const app = express()

configDotenv("./.env.local")
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use("/",router)

ConnectDB()
  .then(() => {
      const PORT = process.env.PORT ?? 8000
      app.listen(PORT,() => console.log(`Server Started at PORT ${PORT}`))
  })
  .catch((error) => {
    return new ApiError(
        500,
        "Internal Server Error",
        error
    )
  })
