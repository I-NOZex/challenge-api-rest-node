var express    = require('express');
var app        = express();     

var cors = require('cors');
var _ = require('lodash');

var data = require('./data.js');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

var users = data.users;
var musics = data.musics;
var favorites = data.favorites;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


/*
 *  GET ALL USERS FROM BD
 */

router.get('/users', function(req, res) {
    res.statusCode = 200;
	res.send(users);
});

/*
 *  GET A USER FROM BD
 */

router.get('/users/:id', function(req, res) {
    var user = _.filter(users, function(o){
    	return o.id == req.params.id;
    });
    
    if(user.length > 0){
    	res.statusCode = 200;
    }
    else{
		res.statusCode = 204;
    }
    res.send(user)
    
});

/*
 *  CREATE USER
 */

router.post('/users', function(req, res, next) {
    if(!('username' in req.body) || !('email' in req.body)){
    	res.statusCode = 400;
    	var statusMessage = "No username or email defined.";
    }
    else{
    	var newuser = req.body;
    	newuser.id = uuid.v4();
    	users.push(newuser);
    	res.statusCode = 200;
    	var statusMessage = "User " + req.body.email + " added with success!";
    }
    res.send({message: statusMessage, body: newuser});
});


/*
 *  DELETE USER
 */

router.delete('/users/:id', function(req, res) {
    var index = _.findIndex(users, function(o){
    	return o.id == req.params.id;
    })

    if(index != -1){
    	_.pullAt(users, index);
    	res.statusCode = 410;
    	res.send({"message":"User deleted"})
    }else{
    	res.statusCode = 404;
    	res.send({"message":"User was not found"})
    }

});

/*l
 * USE CASES FOR MUSICS
 */



/*
 *  GET ALL MUSICS FROM BD
 */

router.get('/musics', function(req, res) {
    res.statusCode = 200;
	res.send(musics);
});

/*
 *  GET A USER FROM BD
 */

router.get('/musics/:id', function(req, res) {
    var music = _.filter(musics, function(o){
    	return o.id == req.params.id;
    });
    
    if(music.length > 0){
    	res.statusCode = 200;
    }
    else{
		res.statusCode = 204;
    }
    res.send(music);
    
});

/*
 *  CREATE USER
 */

router.post('/musics', function(req, res, next) {
    if(!('track' in req.body) || !('album' in req.body) || !('artist' in req.body)){
    	res.statusCode = 400;
    	var statusMessage = "No track, album or artist variables are defined.";
    	res.send({message: statusMessage});
    }
    else{
    	var newmusic = req.body;
    	newmusic.id = uuid.v4();
    	musics.push(newmusic);

    	res.statusCode = 200;
    	var statusMessage = "Music added with success!";
    	res.send({message: statusMessage, body: newmusic});
    }
    
});


/*
 *  DELETE USER
 */

router.delete('/musics/:id', function(req, res) {
 	var index = _.findIndex(musics, function(o){
    	return o.id == req.params.id;
    })
    if(index != -1){
    	_.pullAt(musics, index);
    	res.statusCode = 410;
    	res.send({"message":"Music deleted"})
    }else{
    	res.statusCode = 404;
    	res.send({"message":"Music was not found"})
    }
});


/*
 * USE CASES FOR FAVORITES
 */

/*
 * GET FAVORITES FROM A USER
 */

router.get('/users/:userid/musics', function(req, res, next) {
    
    var musicids = _.filter(favorites, function(o){
		return o.userid == req.params.userid;
    })

    if(musicids.length == 0){
    	res.statusCode = 204;
    	res.send({body: usermusics})
    }else{
        var usermusics = [];

        for(id in musicids){
            var music = _.find(musics, function(o){
                return o.id == musicids[id].musicid;
            }); 
            
            usermusics.push(music);
        }
        
        res.statusCode = 200;
        res.send(usermusics);  
        
    }

});


/*
 *  CREATE FAVORITE
 */

router.post('/users/:userid/musics/', function(req, res, next) {
    var requserid = req.params.userid;
    var reqmusicid = req.body.musicid;

    var usermatch = _.find(users, function(o){
        return o.id == requserid;
    });

    var musicmatch = _.find(musics, function(o){
        return o.id == reqmusicid;
    });

    var match = _.find(favorites, function(o){
        return (o.userid == req.params.userid && o.musicid == req.params.musicid)
    });

    if(!usermatch){
        res.statusCode = 400;
        res.send({"message":"User does not exist"});
    }
    else if(!musicmatch){
        res.statusCode = 400;
        res.send({"message":"Music does not exist"});   
    }
    else if(!match){
        var newfavorite = {
            userid: req.params.userid,
            musicid: req.body.musicid
        }

        favorites.push(newfavorite);
        res.statusCode = 200;
        res.send({"message":"Added favorite"});
    }
    else{
        res.statusCode = 409;
        res.send({"message":"User already have that favorite"});
    }
});


/*
 *  DELETE USER
 */

router.delete('/users/:userid/musics/:musicid', function(req, res) {
 	var requserid = req.params.userid;
    var reqmusicid = req.params.musicid;

    var index = _.findIndex(favorites, function(o){
        return (o.userid == requserid && o.musicid == reqmusicid);
    })

    if(index != -1){
        _.pullAt(favorites, index);
        res.statusCode = 200;
        res.send({"message":"Deleted com success!"});
    }
    else{
        res.statusCode = 404;
        res.send({"message":"Match not found!"});   
    }
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);

console.log("Server Listening : http://localhost:" + port + "/api");