const responseCreator = require('../../../src/helpers/response-creator');
const { expect } = require("chai");
const sinon = require("sinon");
const Chance = require("chance");

const chance = new Chance();
describe("Response Creator", function () {
    let writer;

    beforeEach(() => {
        writer = sinon.stub();
    });

    it("should build correct create parking response", function () {
        const response = { maxCapacity: 15 };

        const createdRespose = responseCreator.createParkingCreatedResonse(response);

        expect(createdRespose.response).to.equal('Created parking lot with 15 slots');

        createdRespose.write(writer);
        sinon.assert.calledOnce(writer);
        sinon.assert.calledOnceWithExactly(writer, 'Created parking lot with 15 slots');
    });

    it("should build correct status response", function () {
        const responses = [
            {
                slotNo: 1,
                registrationNo: chance.string()
            },
            {
                slotNo: 2,
                registrationNo: chance.string()
            }
        ];
        const expectedResponses = [
            'Slot No. Registration No.',
            `${responses[0].slotNo} ${responses[0].registrationNo}`,
            `${responses[1].slotNo} ${responses[1].registrationNo}`
        ];

        const statusResponse = responseCreator.createStatusResponse(responses);

        expect(statusResponse.response).to.deep.equal(expectedResponses);

        statusResponse.write(writer);
        sinon.assert.calledThrice(writer);
        sinon.assert.calledWithExactly(writer, expectedResponses[0]);
        sinon.assert.calledWithExactly(writer, expectedResponses[1]);
        sinon.assert.calledWithExactly(writer, expectedResponses[2]);
    });
});