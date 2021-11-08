const Employee = require("./employee");


function createEmployee ( attributes , callback ) {
    // Methode wird zum Konstruktur, da sie mit new aufgerufen wird.
    console.log( "The internal ID: " , Employee.id );

    if ( !attributes ) {
        return callback(new Error('Something went wrong. No args!'))
    } else {
        return callback(null, {employee:  new Employee( attributes )   } )
    }
};

module.exports = {   createEmployee   };
