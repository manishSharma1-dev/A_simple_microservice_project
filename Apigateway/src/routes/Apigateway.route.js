import { Router } from "express";
import { HelpRegister,HelpLogin,HelpUpdateUsername,HelpGetUserDetail,HelpEmail,HelpUpdatePassword, HelpGetallUrl, HelpRedirecttoOriginalUrl, HelpShortenUrl } from "../controllers/routing.controller.js";
import { Authoptions  } from "../middleware/Apigateway.middleware.js"

const router = Router()

// user Authentication route
router.post("/register", HelpRegister )
router.post("/login", HelpLogin)
router.put("/updateusername",Authoptions,HelpUpdateUsername)
router.put("/updateemail",Authoptions,HelpEmail)
router.put("/updatepassword",Authoptions,HelpUpdatePassword)
router.get("/getuserdetail",Authoptions,HelpGetUserDetail)

// url routes
router.get("/getallurls",HelpGetallUrl)
router.get("/:id",HelpRedirecttoOriginalUrl)
router.post("/shorten-url",HelpShortenUrl)


export {
    router
}

 