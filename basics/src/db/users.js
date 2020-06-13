const users = [{
  name: "Nick Walker",
  age: 19,
  job: 'Web developer',

  sayHello() {
    return `Hello, my name is ${this.name}!`;
  }
}, {
  name: "John Doe",
  age: 48,
  job: 'Designer',

  sayHello() {
    return `Hello, my name is ${this.name}!`;
  }
}, {
  name: "Jane Lee",
  age: 25,
  job: 'Team leader',

  sayHello() {
    return `Hello, my name is ${this.name}!`;
  }
}];

module.exports = users;