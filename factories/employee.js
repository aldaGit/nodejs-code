// oder: const Employee = function ( arguments ) {  ... }

function Employee( arguments ) {
    this.id = arguments.id || "1";
    this.name = arguments.name || "no set";
    this.department = arguments.department || "Marketing";
    this.dateOfConstruction = "12-10-2019";

    this.printDescription = function () {
        console.log("Name of the Employee " + this.name + ", created at: " + this.dateOfConstruction );
    };
    this.toString = function () {
        return JSON.stringify(this);
    }

    // kein Return notwendig im Konstruktor

};

module.exports = Employee;
module.exports.id = 1;

