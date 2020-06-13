const fs = require('fs');
const path = require('path');

module.exports = function (dirPath) {
  fs.mkdir(
    path.join(dirPath),
    (err) => {
      if (err) throw err;

      console.log(`< makeDir > finished its work. Directory ${dirPath} was created!`);
    })
};
