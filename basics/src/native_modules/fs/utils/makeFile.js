const fs = require('fs');
const path = require('path');

module.exports = function (dirPath, fileName, data) {
  fs.writeFile(
    path.join(dirPath, fileName),
    data,
    (err) => {
      if (err) throw err;

      console.log(`< makeFile > finished its work. File ${fileName} was created!`);
    });
};
