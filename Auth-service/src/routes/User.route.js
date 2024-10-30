import { Router } from "express"
import { RegisterUser,LoginUser,updateemail, updateusername, updatepassword, Userdetails } from "../controllers/User.controllers.js"
import { Authoptions } from "../middleware/Auth.middleware.js"


const router = Router()




router.route('/api/registeruser').post(RegisterUser)
router.route('/api/loginuser').post(LoginUser)
router.route('/api/updateusername').put(Authoptions,updateusername)
router.route('/api/updateemail').put(Authoptions,updateemail)
router.route('/api/updatepassword').put(Authoptions,updatepassword)
router.route('/api/userdetail').put(Authoptions,Userdetails)


export {
    router
}
