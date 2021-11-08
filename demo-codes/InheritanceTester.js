// Definiert den Person Konstruktor
function Person(firstName) {
    this.firstName = firstName;
}

// Fügt Methoden zum Person.prototype hinzu
Person.prototype.walk = function(){
    console.log("I am walking!");
};
Person.prototype.sayHello = function(){
    console.log("Hello, I'm " + this.firstName);
};

// Definiert den Student Konstruktor
function Student(firstName, subject) {
    // Call the parent constructor, making sure (using Function#call)
    // that "this" is set correctly during the call
    Person.call(this, firstName);

    // Initialize our Student-specific properties
    this.subject = subject;
};

// Erstellt ein Student.prototype Objekt das von Person.prototype erbt.
// Hinweis: Ein häufiger Fehler ist der Einsatz von "new Person()" beim erstellen vomeines
// Student.prototype. Das ist falsch aus einigen Gründen, nicht nur
// das wir keinen Parameter der Person für "firstName" mitgeben können.
// Der korrekte Ort für den Aufruf von Person ist oben, wo wir es
// von Student aufrufen.
Student.prototype = Object.create(Person.prototype); // See note below

// Setzt die "constructor" Eigenschaft um auf Student zu referenzieren.
Student.prototype.constructor = Student;

// Ersetzt die "sayHello" Methode
Student.prototype.sayHello = function(){
    console.log("Hello, I'm " + this.firstName + ". I'm studying "
        + this.subject + ".");
};

// Fügt die "sayGoodBye" Methode hinzu
Student.prototype.sayGoodBye = function(){
    console.log("Goodbye!");
};

// Beispieleinsatz:
var student1 = new Student("Janet", "Applied Physics");
student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk();       // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"

// Check that instanceof works correctly
console.log(student1 instanceof Person);  // true
console.log(student1 instanceof Student); // true