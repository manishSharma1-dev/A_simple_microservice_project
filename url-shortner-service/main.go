package main

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type UrlshortenDB struct {
	Id           int    `json:"id"`
	UrlGiven     string `json:"urlgiven"`
	UrlGenerated string `json:"urlgenerated"`
}

type UrlRequest struct {
	Url string `json:"url"`
}

var UrlDB []*UrlshortenDB

// generating random string
func GenerateRandomString(num int, r *rand.Rand) string {
	var letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!£$%^&*()@"

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

	newurl := "http://localhost:8000/" + RandomString

	var id int = 2

	UrlDB = append(UrlDB,
		&UrlshortenDB{Id: id, UrlGiven: url.Url, UrlGenerated: newurl},
	)

	c.JSON(http.StatusOK, newurl)

}

func main() {
	fmt.Println("Creating a Url-Shortner-Serivce")

	router := gin.Default()

	router.POST("/shorten-url", ShortenUrl)
	router.Run("localhost:4000")
}
