package connections

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

const ConnectionString = ""
const DBname = "url-shortner-service-go"
const Collectionname = "url-shortner-service-go-client"

var Collection *mongo.Collection

func init() {
	fmt.Println("Making Connection to the DB")

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	ClientOptions := options.Client().ApplyURI(ConnectionString).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(context.TODO(), ClientOptions)

	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	fmt.Println("Database Connected Successfully")

	Collection := client.Database(DBname).Collection(Collectionname)

	fmt.Println("Collection Instance is ready")

}
