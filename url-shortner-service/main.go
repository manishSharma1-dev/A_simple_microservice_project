package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/manishSharma1-dev/url-Shortner-service/src/controllers"
)

func main() {
	fmt.Println("Creating a Url-Shortner-Serivce")

	router := gin.Default()

	router.GET("/", controllers.Homepage)
	router.GET("/getallurl", controllers.GetallUrls)
	router.GET("/:id", controllers.RedirecttoOriginalUrl)

	router.POST("/shorten-url", controllers.ShortenUrl)
	// router.POST("/noofclicks/:date or day ")  -> this route will tell the no of clicks  for a custom date

	router.Run("localhost:4000")
}
