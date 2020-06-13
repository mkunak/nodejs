const fs = require('fs');
const path = require('path');

module.exports = function (dirPath, fileName, data) {
  fs.appendFile(
    path.join(dirPath, fileName),
    data,
    (err) => {
      if (err) throw err;

      console.log(`< appendFile > finished its work. File ${fileName} was changed!`);
    });
};
