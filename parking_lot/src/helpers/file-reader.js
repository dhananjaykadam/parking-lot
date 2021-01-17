
const fileSystem = require('fs');

const FILE_PATH = './functional_spec/fixtures/';

const readFile = (fileName) => {
    return fileSystem.readFileSync(fileName, 'utf8')
        .split(/\r?\n/).map(x => x.trim());
}

module.exports = {
    readFile
}