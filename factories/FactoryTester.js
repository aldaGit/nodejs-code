const Factory = require("./factories/EmployeeFactory");
const AsyncFactory = require("./factories/EmployeeFactoryAsync");
const HandlerFactory = require("./factories/EmployeeFactoryHandler");
const PromiseFactory = require("./factories/EmployeeFactoryPromise");
const express = require('express');
const app = express();

// Traditional way of calling a factory in a synchronous way.
// This variant may block the whole execution environment (the process) in case of a long running method createEmploy"
app.get( '/employees/:id' , (req , res) => {
    let id = req.params.id;
    let employee = Factory.createEmployee({ id : id } );
    const des = employee.toString();
    res.send( des );
} );

// Asynchrounous behaviour with a callback handler. The request is soley handled within the
// anonymous callback handler. NO blocking of the whole process anymore!
// Drawback: the handling of the callback is complex
app.get( '/employeeshandler/:id' , (req , res) => {
    let id = req.params.id;
    let employee = HandlerFactory.createEmployee({ id : id } , function (error , response) {
        if (error) {
            res.send( "some went wrong from the server" );
        }
        if (response) {
            console.log( response.employee )
            res.send( response.employee );
        }
    } );

} );

// Variant in which the Promise-object - explicitely returned by the function "createEmployee" -
// is consumed by two functions "then" and "catch"
// A promise is commonly defined as a proxy for a value that will eventually become available.
// It is an object that might return a value in the future.
// It accomplishes the same basic goal as a callback function, but with many additional features and a more readable syntax
app.get( '/employeespromise/:id' , (req , res) => {
    let id = req.params.id;
    PromiseFactory.createEmployee({ id : id } )
        .then( employee => { res.send( employee.toString() ) } )
        .catch( error => {res.send( "some went wrong from the server" ); console.log("Some went wrong: " + error) } );

} );

// Variant in which the Promise-object - implicitly returned by the asynchronous function "createEmployee" -
// is consumed by two functions "then" and "catch"
// Benefit: Reduction of code in Factory!
// Drawback yet: a complex implementation method, some coding overhead
app.get( '/employeesasync/:id' ,  (req , res) => {
    let id = req.params.id;
    AsyncFactory.createEmployee({ id : id } )
        .then( employee => { res.send( employee.toString() ) } )
        .catch( error => {res.send( "some went wrong from the server" ); console.log("Some went wrong: " + error) } );
} );

// Usage of the asynchronous function with await directly without coding overhead. Code appears more synchronous.
// This variant is only possible, when the handler function (argument in get) is declared as async!
app.get( '/employeesasync2/:id' ,  async (req, res) => {
    let id = req.params.id;
    let employee = await AsyncFactory.createEmployee({ id : id } ).catch(() => console.log("wrong"));
    const des = employee.toString();
    res.send(des);
} );

app.listen(8080 , () => {
    console.log("Server läuft!");
} );



