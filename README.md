# social-media-be

![](https://img.shields.io/badge/license-MIT-blue.svg)
    
## Description

This is a simple social media RESTFul API.  It provides basic functionality for:

1. Managing Users
2. Managing friends
3. Managing user thoughts
4. Managing user reactions to thoughts

It uses Node.Js and MongoDb.


## Table of Contents 

* [Installation](#installation)

* [Setting Up the Database](#setting-up-the-database)

* [Usage](#usage)

* [API](#API)

* [Screenshots](#screenshots)

* [Questions](#questions)

* [To Do](#ToDo)

## Installation
    
'npm i' to install the necessary dependencies.

Create a file named .env with the following contents (This assumes you are using a default local MongoDb to host the application):

```
DATABASE_URL=mongodb://localhost:27017/
```

### Setting up the database

#### Add a user
```
curl --request POST \
  --url http://localhost:3000/api/users \
  --header 'Content-Type: application/json' \
  --data '{
	"username":"Test1",
	"email":"test1@test.com"
}'
```
#### Add an associated thought
Using the Id generated with the precious call:
```
curl --request POST \
  --url http://localhost:3000/api/thoughts \
  --header 'Content-Type: application/json' \
  --data '{
        "thoughtText": "This is a test thought for Test1 by Test2",
        "user_Id": "[Your-New-USERID-Goes-HERE]",
        "username": "Test1"
}'
```


## Usage

Use the provided insomnia collection to use all the available routes

## API

An insomnia collection can be found in this git repository

## License
    
This project is licenced under MIT

## Questions

[More of my work can be found here](https://github.com/ChrisAylen)

## ToDo

The application needs better error messaging, tests, and a better UI.

