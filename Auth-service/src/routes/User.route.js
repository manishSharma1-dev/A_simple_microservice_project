import { Router } from "express"
import { RegisterUser,LoginUser,updateemail, updateusername, updatepassword, Userdetails } from "../controllers/User.controllers.js"

const router = Router()


router.route('/api/registeruser').post(RegisterUser)
router.route('/api/loginuser').post(LoginUser)
router.route('/api/updateusername').put(updateusername)
router.route('/api/updateemail').put(updateemail)
router.route('/api/updatepassword').put(updatepassword)
router.route('/api/userdetail/:id').get(Userdetails)


export {
    router
}
