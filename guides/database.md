---
icon: database
label: Database Setup
---

Data storage is important when it comes to persistent loading and saving of data on your server. 

There are many solutions that server use for data storage, but the most two most popular kind is persistent data storage with SQL or NoSQL databases. The simple different between these two are that SQL have structured tables and language for queries, whereas NoSQL utilizes documents (essentially JSON objects).

In our following examples, we will be using MongoDB, a NoSQL database. The reason for this is that MongoDB is a performant database solution, and by the nature of being NoSQL, it makes it extremely easy to perform queries and saving data. One of the big tooling the Go MongoDB library provides is type-safe data fetching so that all you need to do is make your own struct to represent your data.

## Setup

If you have not already done so, install MongoDB on your system and then install the Go package. The tutorial for this is below.

[!ref](/guides/setup.md)

## Data Folder Organization

In the previous setup tutorial to set up your project, we created a `minecraft` directory that held all of our server logic. In this folder, we will create a folder called `data` which will store all our files that are involved with our database and models.

## Database Entry Point

We want to create an entry point to our database so that it is loaded on the server start. To do this without much work, we can utilize Go's `init()` function, which will automatically run whenever the package is imported in any file associated from the main file.

For our current example, we will assume the server will save some type of user/player data, as such, we will make a users collection which will store the user data.

Create a `data.go` in the previously created `minecraft/data` folder, and use the following code:

```go minecraft/data/data.go
package data

import (
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// ctx returns a context.Context.
func ctx() context.Context {
	return context.Background()
}

// db is the Upper database session.
var db *mongo.Database

const URI = "mongodb://localhost"

// init creates the Upper database connection.
func init() {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(URI))
	if err != nil {
		panic(err)
	}
	db = client.Database("minecraft")

	userCollection = db.Collection("users")
}
```

This code simply utilizes an `init()` function to load our database from a specific URI (in this case, we will be using localhost assuming it's a local database). We will then fetch/create a `minecraft` database which will hold the collection of our `users`.

!!! **Note**
There is no need to check if the database nor collection are created, the methods on the database client and database will do this for us!
!!!

## User Collection

You will notice that there is an error because we haven't created a `userCollection` database yet. This will be our next step. Create a `user.go` file in the same directory and use the following code:

!!! **Important**
We will be explaining this code in chunks. Thus, when copying code down, make sure to paste everything code block in this section in the same `user.go` file as you read on.
!!!

```go minecraft/data/user.go
package data

import (
	"errors"
	"log"
	"strings"
	"sync"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	userCollection *mongo.Collection
	userMu         sync.Mutex
	users          = map[string]User{}
)
```

Firstly, we will create our `userCollection` which will hold our actual collection tied to the database. We will then create a `users` map that holds cached users as we do not want to make unneeded calls to the database (along with this, a mutex to preserve concurrent safety).

## User Structure

Next, we want to create our actual `User` struct (note, you should have an error here for an unknown `User` struct, this is what we'll be making):

```go minecraft/data/user.go
type User struct {
	XUID string
    DisplayName string
	Name string
    ExampleField int
}
```

This is an example `User` field that has very simple data fields, you can add more as you go on for your needs. Note that the specific examples covered in the later guides will provide you with data fields to use.

## User Saving

Next, we want to create a function that can manually save a user, to do this, we will using the follow code:

```go minecraft/data/user.go
func saveUserData(u User) error {
	filter := bson.M{"name": bson.M{"$eq": u.Name}}
	update := bson.M{"$set": u}

	res, _ := userCollection.UpdateOne(ctx(), filter, update)

	if res.MatchedCount == 0 {
		_, _ = userCollection.InsertOne(ctx(), u)
	}

	return nil
}
```

## Default User Helper

We will now create a small helper function to create a default user, which will just be a blank user:

```go minecraft/data/user.go
func DefaultUser(name string) User {
	u := User{
		DisplayName: name,
		Name:        strings.ToLower(name),
	}
	return u
}
```

## Data Flushing

Now want a simple lightweight system to store flush our users and store them in a cache as well as have a way to fetch cached users. We want to do this at an interval, so we will combine an `init()` function with a go-routine and tickers:

```go minecraft/data/user.go
func cachedUserCheck(f func(User) bool) (User, bool) {
	userMu.Lock()
	defer userMu.Unlock()
	for _, u := range users {
		if f(u) {
			return u, true
		}
	}
	return User{}, false
}

func FlushCache() {
	userMu.Lock()
	defer userMu.Unlock()
	for _, u := range users {
		err := saveUserData(u)
		if err != nil {
			log.Println("Error saving user data:", err)
			return
		}
	}
}

func init() {
	t := time.NewTicker(5 * time.Minute)
	go func() {
		for range t.C {
			FlushCache()
		}
	}()
}
```

## Data Decoding

Before we get into loading and saving our players, we need to create a simple helper method that will decode our results from the MongoDB format (BSON). You don't really need to understand what goes on in this function, but bear in mind that additional modifications will be made to this in later guides:

```go minecraft/data/user.go
unc decodeSingleUserResult(result *mongo.SingleResult) (User, error) {
	var u = DefaultUser("")

	err := result.Decode(&u)
	if err != nil {
		return User{}, err
	}

	userMu.Lock()
	defer userMu.Unlock()
	users[u.Name] = u

	return u, nil
}
```

## User Loading

Let's now create functions to load our users. We will have two different functions to do this for our needs, `LoadUser` and `LoadUserOrCreate`. The names are self-explanatory where the latter will simply create a user if it's not already made (this is specifically designed for first-time users):

```go minecraft/data/user.go
func LoadUserOrCreate(name string) (User, error) {
	if u, ok := cachedUserCheck(func(u User) bool {
		return u.Name == strings.ToLower(name)
	}); ok {
		return u, nil
	}

	filter := bson.M{"name": bson.M{"$eq": strings.ToLower(name)}}

	result := userCollection.FindOne(ctx(), filter)
	if err := result.Err(); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return DefaultUser(name), nil
		}
		return User{}, err
	}

	u, err := decodeSingleUserResult(result)
	if err != nil {
		return User{}, err
	}

	return u, nil
}

func LoadUser(name string) (User, bool) {
	if u, ok := cachedUserCheck(func(u User) bool {
		return u.Name == strings.ToLower(name)
	}); ok {
		return u, true
	}

	filter := bson.M{"name": bson.M{"$eq": strings.ToLower(name)}}

	result := userCollection.FindOne(ctx(), filter)
	if err := result.Err(); err != nil {
		return User{}, false
	}
	u, err := decodeSingleUserResult(result)
	if err != nil {
		return User{}, false
	}

	return u, true
}
```

## User Saving

Lastly, we need a way to save user data to the cache, we can do this with the method below:

```go minecraft/data/user.go
func SaveUser(u User) {
	userMu.Lock()
	defer userMu.Unlock()
	users[u.Name] = u
}
```

!!!success **Congratulations!**
You just made your first basic database system for Dragonfly! Note, that you will have to use the `data` package outside this package in order for the database to actually start!
!!!

## Recap

A basic recap of the above database system:
- Every 5 minutes, users in the cache are manually saved to the database to prevent performance issues from constantly
- Loading users will first look into the user cache before making a query to the database, after which the decoding writes the data on the default user to return the actual user which needs to be loaded
- Saving users will simply write to the cache which will be manually saved every 5 minutes as previously mentioned
- If a user is not found or an error occurs, a blank user and false value is returned, allowing for proper handling

With this, you should have a flexible database system that is both performant and easy-to-use for whatever your needs are in Dragonfly. Remember that modifications to this file will be needed if you are following the specific server guides.
