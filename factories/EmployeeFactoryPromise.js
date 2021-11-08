const Employee = require("./employee");

function createEmployee (attributes) {

 return new Promise(  (resolve, reject) => {
    // for debugging only, just to invoke the reject method of the (internal) promise
    let status = false;

    if (status) {
        return reject(new Error('Creation of object went wrong!'))
    } else {
        return resolve ( new Employee( attributes ) );
    }
    // return new Employee( attributes );
}) };

module.exports = {   createEmployee   };
