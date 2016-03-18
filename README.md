# challenge-api-rest-node

## Documentation

## HOW TO INSTALL

``` javascript
$: git clone https://github.com/Ubiwhere/challenge-api-rest-node.git
$: npm install
$: node index.js
```


Assuming that the API will run on http://localhost:8080/api/
### Users

#### GET USERS
Request: 
``` javascript
GET -> http://localhost:8080/api/users
```

Response: 
``` javascript
[{
    "id": 1,
    "username": "Test",
    "email": "test@ubiwhere.com"
}, ...]
```


#### CREATE USER
Request: 
``` javascript
POST -> http://localhost:8080/api/users
```
BODY:
``` javascript

{
    "username": "Test",
    "email": "test@ubiwhere.com"
}

```
Response: 
``` javascript
{
  "message": "User test@ubiwhere.com added with success!",
  "body": {
    "username": "Test",
    "email": "test@ubiwhere.com",
    "id": "92c5ca37-1fc3-4611-9add-49831ffd83c6"
  }
}
```

#### GET USER BY ID

Request: 
``` javascript
GET -> http://localhost:8080/api/users/:ID
```
####### NOTE: ID must correspond to a user id
Response: 
``` javascript
[{
    "id": 1,
    "username": "Test",
    "email": "test@ubiwhere.com"
}]
```
#### DELETE USER 

Request: 
``` javascript
DELETE -> http://localhost:8080/api/users/:id
```

Response: 
``` javascript
{"message": "User deleted with success"}
```

### Musics
#### GET MUSICS
Request: 
``` javascript
GET -> http://localhost:8080/api/musics
```

Response: 
``` javascript
[{
    "album": "slipknot",
    "artist": "slipknot",
    "track": "slipknot"
}, ...]
```


#### CREATE  MUSIC
Request: 
``` javascript
POST -> http://localhost:8080/api/musics
```
BODY:
``` javascript

{
    "album": "music1",
    "artist": "music1",
    "track": "music1"
}

```
Response: 
``` javascript
{
  "message": "Music added with success!",
  "body": {
    "album": "music1",
    "artist": "music1",
    "track": "music1",
    "id": "db688c1a-526b-4759-9df5-bd1e46e5c5b8"
  }
}
```

#### GET MUSIC BY ID

Request: 
``` javascript
GET -> http://localhost:8080/api/musics/:ID
```
####### NOTE: ID must correspond to a music id
Response: 
``` javascript
[{
    "album": "music1",
    "artist": "music1",
    "track": "music1",
    "id": 1
}]
```

#### DELETE MUSIC 

Request: 
``` javascript
DELETE -> http://localhost:8080/api/musics/:id
```

Response: 
``` javascript
{"message": "Music deleted with success"}
```

### Favorites
#### Get user favorites

#### CREATE MUSIC BY ID

Request: 
``` javascript
POST -> http://localhost:8080/api/users/:userid/musics
```

BODY:
``` javascript
{
    "musicid": "music1"
}
```

Response: 
``` javascript
{"message":"Added favorite"}
```

#### GET USER FAVORITES 

Request: 
``` javascript
GET -> http://localhost:8080/api/users/:userid/musics
```

Response: 
``` javascript
[{
    "album": "music1",
    "artist": "music1",
    "track": "music1",
    "id": 1
}, ...]
```
#### DELETE FAVORITE 

Request: 
``` javascript
DELETE -> http://localhost:8080/api/users/:userid/musics/:musicid
```

Response: 
``` javascript
{"message": "Favorite deleted with success"}
```
