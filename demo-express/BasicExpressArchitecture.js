const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Inserting the Middleware function
app.use( bodyParser.json() );

app.get( '/employees/:id' , (req , res) => {
    const id = req.params.id;
    console.log("The submitted ID is: " + id );
    res.send( "{\"id\" : " + id + ", \"name\": \"Maier\"}" );
} );

app.post( '/employees/create/' , function( req, res ) {
    const name = req.body.name;
    const id = req.body.id;
    // create a new Employee (new URI!) --> Store in MongoDB
    res.send("OK"); //maybe sending the new URL
}  );


app.listen( 8081 , () => {
    console.log("Server is running on Port 8081!");
} );