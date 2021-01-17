const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

describe("Files reader", function () {
    it("should read file contents and return lines", function () {
        const fileName = "anyFileName";
        const responseString = `create_parking_lot 6
                                park KA-01-HH-1234`;
        const exppectedResponse = ['create_parking_lot 6', 'park KA-01-HH-1234'];

        const readFileSync = sinon.stub().returns(responseString);;
        const proxiedFileReader = proxyquire('../../../src/helpers/file-reader',
            {
                'fs': { readFileSync }
            });

        const response = proxiedFileReader.readFile(fileName);

        expect(exppectedResponse).to.deep.equals(response);
        sinon.assert.calledOnceWithExactly(readFileSync, fileName, 'utf8');
    });
});