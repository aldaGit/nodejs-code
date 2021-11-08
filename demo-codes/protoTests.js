function Person(firstName) {
    this.firstName = firstName;
}

var person1 = new Person("Alice");
person1.lastName = "Maier";

console.log(person1);

Person.prototype.sayHello = function() {
    console.log("Hello, I'm " + this.firstName);
};

var person2 = new Person("Bob");

// Aufrufen der Methode sayHello der Person.
person1.sayHello(); // logs "Hello, I'm Alice"
person2.sayHello(); // logs "Hello, I'm Bob"

delete person1.firstName;
person1.sayHello();