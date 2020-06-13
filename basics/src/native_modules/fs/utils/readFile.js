const fs = require('fs');
const path = require('path');

module.exports = function (dirPath, fileName) {
  fs.readFile(
    path.join(dirPath, fileName),
    'utf-8',
    (err, data) => {
      if (err) throw err;
      console.log(`< readFile > finished its work. File ${fileName} was read! Data: ${data}`);
    });
};
