const add = require('../functions/adding')
const { minus , multiply } = require('../functions/computing')

const result = add(1,2);
console.log('result' , result);
console.log('reuslt' , add(2,3));

const result1 = minus(3,2);
let result3 = multiply(3,6);

console.log('Test' , result1);
console.log('Test' , result3);

// Setting a global variable
global.myName = "Sascha";

// Can be accessed from a different file
console.log( myName );

