
const fileSystem = require('fs');

const FILE_PATH = './functional_spec/fixtures/';

const readFile = (fileName) => {
    return fileSystem.readFileSync(`${FILE_PATH}/${fileName}`, 'utf8')
        .split(/\r?\n/);
}

module.exports = {
    readFile
}