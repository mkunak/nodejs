const fs = require('fs');
const path = require('path');

module.exports = function (dirPath, fileName, fileNameNew) {
  fs.rename(
    path.join(dirPath, fileName),
    path.join(dirPath, fileNameNew),
    (err) => {
      if (err) throw err;

      console.log(`< renameFile > finished its work. File ${fileName} was renamed! New name is ${fileNameNew}`);
    });
};
