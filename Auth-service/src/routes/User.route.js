import { Router } from "express"
import { RegisterUser,LoginUser } from "../controllers/User.controllers.js"


const router = Router()


router.route('/api/registerUser').post(RegisterUser)
router.route('/api/loginuser').post(LoginUser)


export {
    router
}
