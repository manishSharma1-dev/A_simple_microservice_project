import { Router } from "express"
import { Getallurls, RedirectToOriginalUrl, ShortenUrl } from "../controllers/url.controllers.js"

const router = Router()

router.route('/url/getallurl').get(Getallurls)
router.route('/:id').get(RedirectToOriginalUrl)

router.route('/url/shorten-url').post(ShortenUrl)

export {
    router
}