var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoDB = require('mongodb');


var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    if (err) throw err;

    console.log("Verbindung erfolgreich!");
    var db = client.db('NoSQLBoosterSamples')

    db.collection('movies').findOne({}, function (findErr, result) {
      if (findErr) throw findErr;
      console.log(result.year);
      client.close();
    });
});



/* GET users listing. */

function  sum (x , y) {
  var result = x + y;
  return result;
}

router.use( function timeLog( req, res, next ) {
  console.log('Time: ' , Date.now() );
  console.log( sum(2,3) );

  next();

} );

router.get('/', function(req, res, next) {
  res.send('respond with a resource please');
});

router.get('/page', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

router.post('/quotes', function (req, res) {
  console.log('Body of Request: ' , req.body);

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

router.get('/:userID', function(req, res, next) {
  res.send( 'Received number: ' + req.params.userID );
});

module.exports = router;
