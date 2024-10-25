import { Router } from "express"
import { RegisterUser } from "../controllers/User.controllers.js"


const router = Router()


router.route('/api/registerUser').post(RegisterUser)


export {
    router
}
