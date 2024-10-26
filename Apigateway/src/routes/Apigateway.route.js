import { Router } from "express";
import { HelpRegister,HelpLogin } from "../controllers/routing.controller";

const router = Router()

router.post("/register", HelpRegister )
router.post("/login", HelpLogin)


export {
    router
}
 

// router.route('/api/registerUser').post(RegisterUser)
// router.route('/api/loginuser').post(LoginUser)
// router.route('/api/updateusername').put(Authoptions,updateusername)
// router.route('/api/updateemail').put(Authoptions,updateemail)
// router.route('/api/updatepassword').put(Authoptions,updatepassword)
// router.route('/api/userdetail').put(Authoptions,Userdetails)

 