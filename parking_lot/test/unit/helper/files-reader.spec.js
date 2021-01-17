const fileReader = require('../../../src/helpers/file-reader');
var { expect } = require("chai");
var sinon = require("sinon");
var proxyquire = require("proxyquire");

describe("Files reader", function () {
    it("should read file contents and return lines", function () {
        const fileName = "anyFileName";
        const responseString = `create_parking_lot 6
                                park KA-01-HH-1234`;
        const readFileSync = sinon.stub().returns(responseString);;
        const proxiedFileReader = proxyquire('../../../src/helpers/file-reader',
            {
                'fs': { readFileSync }
            });

        const exppectedResponse = `create_parking_lot 6 /\r?\n/park KA-01-HH-1234`.split('/\r?\n/').map(x => x.trim());
        const response = proxiedFileReader.readFile(fileName);

        expect(exppectedResponse).to.deep.equals(response);
        sinon.assert.calledOnceWithExactly(readFileSync, `./functional_spec/fixtures//${fileName}`, 'utf8');
    });
});