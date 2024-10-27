package model

type UrlshortenDB struct {
	Id              string `json:"id"`
	UrlGiven        string `json:"urlgiven"`
	UrlGenerated    string `json:"urlgenerated"`
	TotalNoofClicks int32  `json:"totalnoofclicks"`
	Createdat       string `json:"createdat"`
}

type UrlRequest struct {
	Url string `json:"url"`
}
