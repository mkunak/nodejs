const path = require('path');

console.log(__filename);

console.log(path.basename(__filename));
console.log(path.dirname(__filename));
console.log(path.extname(__filename));

console.log(path.parse(__filename));
console.log(path.parse(__filename).name);

console.log(path.join(__dirname, 'testdir', 'test.js'));
console.log(path.join(__dirname, '/testdir', 'test.js'));

console.log(path.resolve(__dirname, '/anothertestdir', 'anothertest.js'));
