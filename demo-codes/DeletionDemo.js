// Object Creation with Constructor (no class!)
function Person(firstName) {
    this.firstName = firstName;
    this.sayHello = function () {
        console.log("My first name: " + this.firstName);
    }
}

// Object Creation
var person1 = new Person("Alice");

//Adding a new Attribute
person1.lastName = "Maier";
console.log("Person: " + person1.firstName + " "+ person1.lastName); // Person: Alice Maier
console.log( person1 ); // Person { firstName: 'Alice', sayHello: [Function], lastName: 'Maier' }

// Deleting the new Attribute
delete person1.lastName;
console.log( person1 ); // Person { firstName: 'Alice', sayHello: [Function] }
console.log( person1.lastName ); //undefined
