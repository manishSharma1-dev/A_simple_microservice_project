import { Router } from "express";
import { HelpRegister,HelpLogin,HelpUpdateUsername,HelpGetUserDetail,HelpEmail,HelpUpdatePassword } from "../controllers/routing.controller";

const router = Router()

router.post("/register", HelpRegister )
router.post("/login", HelpLogin)
router.put("/updateusername",HelpUpdateUsername)
router.put("/updatepassword",HelpUpdatePassword)
router.put("/updateemail",HelpEmail)
router.get("/getuserdetail",HelpGetUserDetail)


export {
    router
}

 