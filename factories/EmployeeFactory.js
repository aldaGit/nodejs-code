const Employee = require("./employee");

function createEmployee ( attributes ) {
    console.log( "The internal ID: " , Employee.id );
    return new Employee( attributes );
};

module.exports = {   createEmployee   };
