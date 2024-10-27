package controllers

import (
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/manishSharma1-dev/url-Shortner-service/src/model"
)

var UrlDB []*model.UrlshortenDB //temp DB

// to generate random string
func GenerateRandomString(num int, r *rand.Rand) string {
	var letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	b := make([]byte, num) // creating a slice b with size num

	// rand.Intn(len(letter)): This generates a random index within the bounds of the letter string. rand.Intn returns a random integer from 0 to len(letter)-1.

	for i := range b {
		b[i] = letter[r.Intn(len(letter))]
	}

	return string(b)
}

// func to generate short url
func ShortenUrl(c *gin.Context) {
	var url model.UrlRequest

	if err := c.BindJSON(&url); err != nil {
		panic(err)
	}

	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	RandomString := GenerateRandomString(7, r)

	newurl := "http://localhost:4000/" + RandomString

	id := RandomString

	UrlDB = append(UrlDB,
		&model.UrlshortenDB{Id: id, UrlGiven: url.Url, UrlGenerated: newurl, TotalNoofClicks: 0, Createdat: time.Now().Format("01-02-2006 Monday")},
	)

	c.JSON(http.StatusOK, newurl)

}

// func to get all urls
func GetallUrls(c *gin.Context) {
	fmt.Println("Getting all the urls")
	c.JSON(http.StatusOK, UrlDB)
}

// func to redirect url
func RedirecttoOriginalUrl(c *gin.Context) {
	ID := c.Param("id")

	for _, index := range UrlDB {
		if ID == index.Id {
			index.TotalNoofClicks = index.TotalNoofClicks + 1
			c.Redirect(http.StatusFound, index.UrlGiven)
			return
		}
	}

	c.JSON(http.StatusFound, gin.H{"message": "Invalid Id"})

}

// func for the "/" route
func Homepage(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"message": "hello from go server"})
}
