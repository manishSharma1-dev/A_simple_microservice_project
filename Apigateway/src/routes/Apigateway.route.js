import { Router } from "express";
import { HelpRegister,HelpLogin,HelpUpdateUsername,HelpGetUserDetail,HelpEmail,HelpUpdatePassword, HelpGetallUrl, HelpRedirecttoOriginalUrl, HelpShortenUrl } from "../controllers/routing.controller.js";

const router = Router()

router.post("/register", HelpRegister )
router.post("/login", HelpLogin)
router.put("/updateusername",HelpUpdateUsername)
router.put("/updatepassword",HelpUpdatePassword)
router.put("/updateemail",HelpEmail)
router.get("/getuserdetail",HelpGetUserDetail)


router.get("/getallurls",HelpGetallUrl)
router.get("/:id",HelpRedirecttoOriginalUrl)
router.post("/shorten-url",HelpShortenUrl)


export {
    router
}

 