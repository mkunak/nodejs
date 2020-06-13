const path = require('path');
const fs = require('fs');

const makeDir = require('./utils/makeDir');
const readFile = require('./utils/readFile');
const makeFile = require('./utils/makeFile');
const appendFile = require('./utils/appendFile');
const renameFile = require('./utils/renameFile');

const users = require('../../db/users');

const dirName = 'sandbox/notes';
const fileName = 'note-1.txt';

const dirPath = path.join(__dirname, dirName);

if (!fs.existsSync(dirPath)) makeDir(dirPath);

const data = JSON.stringify(users);
const createFile = async () => makeFile(dirPath, fileName, data);

createFile()
  .then(() => {
    console.log('< readFile > started its work...');
    readFile(dirPath, fileName);
  })
  .then(() => {
    console.log('< appendFile > started its work...');
    appendFile(dirPath, fileName, ' New string with important content.');
  })
  .then(() => {
    console.log('< readFile > started its work...');
    readFile(dirPath, fileName);
  })
  .then(() => {
    console.log('< renameFile > started its work...');
    renameFile(dirPath, fileName, 'newnote-1.txt');
  });
