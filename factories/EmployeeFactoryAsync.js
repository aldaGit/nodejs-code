const Employee = require("./employee");


async function createEmployee ( attributes ) {
    // for debugging only, just to invoke the reject method of the (internal) promise
    let status = false;

    if (status) {
        return Promise.reject(new Error('Creation of object went wrong!'))
    }
    return new Employee( attributes );
};

module.exports = {   createEmployee   };
