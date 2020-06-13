const users = require('../db/users');

console.log('Hello Node Project');
console.log(users);
users.forEach(user => console.log(user.sayHello()));
