package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type UrlshortenDB struct {
	Id           string `json:"id"`
	UrlGiven     string `json:"urlgiven"`
	UrlGenerated string `json:"urlgenerated"`
}

type UrlRequest struct {
	Url string `json:"url"`
}

var UrlDB []*UrlshortenDB

// generating random string
func GenerateRandomString(num int, r *rand.Rand) string {
	var letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	b := make([]byte, num) // creating a slice b with size num

	// rand.Intn(len(letter)): This generates a random index within the bounds of the letter string. rand.Intn returns a random integer from 0 to len(letter)-1.

	for i := range b {
		b[i] = letter[r.Intn(len(letter))]
	}

	return string(b)
}

// post method to shorten the url
func ShortenUrl(c *gin.Context) {
	var url UrlRequest

	if err := c.BindJSON(&url); err != nil {
		panic(err)
	}

	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	RandomString := GenerateRandomString(7, r)

	newurl := "http://localhost:4000/" + RandomString

	id := RandomString

	UrlDB = append(UrlDB,
		&UrlshortenDB{Id: id, UrlGiven: url.Url, UrlGenerated: newurl},
	)

	c.JSON(http.StatusOK, newurl)

}

func getallUrls(c *gin.Context) {
	fmt.Println("Getting all the urls")

	c.JSON(http.StatusOK, UrlDB)
}

func RedirecttoOriginalUrl(c *gin.Context) {
	ID := c.Param("id")
	fmt.Println("Received ID:", ID)

	for _, index := range UrlDB {
		fmt.Println("Checking ID:", index.Id)
		if ID == index.Id {
			c.Redirect(http.StatusFound, index.UrlGiven)
			return
		}
	}

	c.JSON(http.StatusFound, gin.H{"message": "Invalid Id"})

}

func homepage(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "hello from go server"})
}

func main() {
	fmt.Println("Creating a Url-Shortner-Serivce")

	router := gin.Default()

	router.GET("/", homepage)
	router.POST("/shorten-url", ShortenUrl)
	router.GET("/getallurl", getallUrls)
	router.GET("/:id", RedirecttoOriginalUrl)

	router.Run("localhost:4000")
}
