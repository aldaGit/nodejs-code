var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoDB = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


router.use( function timeLog( req, res, next ) {
  console.log('Time: ' , Date.now() );

  // Open DB
  MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    if (err) throw err;

    console.log("Initiale Verbindung erfolgreich!");
    var dbo = client.db('NoSQLBoosterSamples');
    console.log('database connected!');

    req.client  = client;

    next();
  } );
} );


router.get('/movies/page', function (req, res) {
  res.sendFile(__dirname + '/index.html')

});

// GET all movies
router.get('/movies', function (req, res) {
  console.log('Body of Request: ', req.body);


  // Open DB
  MongoClient.connect('mongodb://localhost:27017', function(err, db) {
    if (err) throw err;

    console.log("Verbindung erfolgreich!");
    var dbo = db.db('NoSQLBoosterSamples')

    console.log('database connected!');
    var collection = dbo.collection('movies');
    collection.find().toArray(function(err, results) {
      if(err) {
        console.log(err);
        process.exit(0);
      }
      console.log(results);
      res.send(results);
    db.close();
    });
  });
  });

// GET a selected Movie
router.get('/movies/:name', function(req, res ) {

  // Open DB
  MongoClient.connect('mongodb://localhost:27017', function(err, db) {
    if (err) throw err;
    var dbo = db.db('NoSQLBoosterSamples')
    var collection = dbo.collection('movies');
    collection.find( {title : req.params.name } ).toArray(function(err, results) {
      if(err) {
        console.log(err);
        process.exit(0);
      }
      console.log(results);
      res.send(results);
      db.close();
    });
  });
});



// POST = create a new Movie
router.post('/movies/create', function(req, res ) {

  // Open DB
  MongoClient.connect('mongodb://localhost:27017', function(err, db) {
    if (err) throw err;

    console.log("Connection to MongoDB successfull !");
    var dbo = db.db('NoSQLBoosterSamples')

    var collection = dbo.collection('movies');

    var data = {  "title" : req.body.name , "year" : req.body.year }

    collection.insert( data , function (err , result) {
      if (err) {
        console.log(err)
      }
      console.log("New movie has been inserted: " + req.body.name)
    })
    res.send("Movie inserted");
    db.close();
  });

});

// DELETE = delete a Movie
router.delete('/movies/:name/delete', function(req, res, next) {

  // Open DB
  MongoClient.connect('mongodb://localhost:27017', function(err, db) {
    if (err) throw err;

    console.log("Verbindung erfolgreich!");
    var dbo = db.db('NoSQLBoosterSamples')

    var collection = dbo.collection('movies');

    collection.deleteOne( { title : 'Matrix' } , function (err , result) {
      if (err) {
        console.log(err)
      }
      console.log("Movie has been deleted: " + req.params.name)
    })
    res.send("Movie deleted with Name: " + req.params.name );
    db.close();
  });

});



module.exports = router;
