const parkingService = require('../../../src/services/parking-service');
const responseCreator = require('../../../src/helpers/response-creator');
const fileReader = require('../../../src/helpers/file-reader');
const commandHandler = require('../../../src/helpers/command-handler');
const { main } = require('../../../src/main/main');
const sinon = require("sinon");
const { Chance } = require('chance');
const { CREATE_PARKING_LOT, PARK, LEAVE, STATUS } = require('../../../src/constants/commands');

const chance = new Chance();

describe("Main app", function () {
    beforeEach(() => {
        sinon.stub(parkingService, 'initializeWithCapacity');
        sinon.stub(parkingService, 'listParkingSlots');
        sinon.stub(parkingService, 'parkVehicle');
        sinon.stub(parkingService, 'releaseVehicle');

        sinon.stub(responseCreator, 'createParkingCreatedResonse');
        sinon.stub(responseCreator, 'createVehicleReleaseResponse');
        sinon.stub(responseCreator, 'createStatusResponse');
        sinon.stub(responseCreator, 'createParkingResponse');

        sinon.stub(fileReader, 'readFile').returns([]);
        sinon.stub(commandHandler, 'buildCommands').returns([]);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should read commands from file", function () {
        const args = chance.string();

        main(args);

        sinon.assert.calledOnceWithExactly(fileReader.readFile, args);
    });

    it("should build commands", function () {
        const args = chance.string();
        const expectedReaderResponse = chance.n(chance.string, 3);
        fileReader.readFile.returns(expectedReaderResponse);

        main(args);

        sinon.assert.calledOnceWithExactly(commandHandler.buildCommands, expectedReaderResponse);
    });

    it("should handle create parking lot command correctly", function () {
        const args = chance.string();
        const writer = sinon.stub();
        commandHandler.buildCommands.returns([{
            type: CREATE_PARKING_LOT,
            data: 15
        }]);
        parkingService.initializeWithCapacity.returns({
            maxCapacity: 15
        });
        responseCreator.createParkingCreatedResonse.returns({
            response: chance.hash(),
            write: writer
        });

        main(args);

        sinon.assert.calledOnce(fileReader.readFile);
        sinon.assert.calledOnce(commandHandler.buildCommands);
        sinon.assert.calledOnceWithExactly(parkingService.initializeWithCapacity, 15);
        sinon.assert.calledOnceWithExactly(responseCreator.createParkingCreatedResonse, {
            maxCapacity: 15
        });
        sinon.assert.calledOnceWithExactly(writer, console.log);
    });

    it("should handle park command correctly", function () {
        const args = chance.string();
        const writer = sinon.stub();
        const registrationNo = chance.string()
        commandHandler.buildCommands.returns([{
            type: PARK,
            data: registrationNo
        }]);
        parkingService.parkVehicle.returns({
            slotNo: 15,
            success: true
        });
        responseCreator.createParkingResponse.returns({
            response: chance.hash(),
            write: writer
        });

        main(args);

        sinon.assert.calledOnce(fileReader.readFile);
        sinon.assert.calledOnce(commandHandler.buildCommands);
        sinon.assert.calledOnceWithExactly(parkingService.parkVehicle, registrationNo);
        sinon.assert.calledOnceWithExactly(responseCreator.createParkingResponse, {
            slotNo: 15,
            success: true
        });
        sinon.assert.calledOnceWithExactly(writer, console.log);
    });

    it("should handle leave command correctly", function () {
        const args = chance.string();
        const writer = sinon.stub();
        const hours = 2;
        const registrationNo = chance.string()
        commandHandler.buildCommands.returns([{
            type: LEAVE,
            data: {
                registrationNo,
                hours
            }
        }]);
        parkingService.releaseVehicle.returns({
            slotNo: 15,
            registrationNo,
            charge: 30,
            success: true
        });
        responseCreator.createVehicleReleaseResponse.returns({
            response: chance.hash(),
            write: writer
        });

        main(args);

        sinon.assert.calledOnce(fileReader.readFile);
        sinon.assert.calledOnce(commandHandler.buildCommands);
        sinon.assert.calledOnceWithExactly(parkingService.releaseVehicle, registrationNo, hours);
        sinon.assert.calledOnceWithExactly(responseCreator.createVehicleReleaseResponse, {
            slotNo: 15,
            registrationNo,
            charge: 30,
            success: true
        });
        sinon.assert.calledOnceWithExactly(writer, console.log);
    });


    it("should handle status command correctly", function () {
        const args = chance.string();
        const writer = sinon.stub();
        const hours = 2;
        const registrationNo = chance.string()
        commandHandler.buildCommands.returns([{
            type: STATUS,
            data: ''
        }]);
        parkingService.listParkingSlots.returns([{
            slotNo: 15,
            registrationNo
        }]);
        responseCreator.createStatusResponse.returns({
            response: chance.hash(),
            write: writer
        });

        main(args);

        sinon.assert.calledOnce(fileReader.readFile);
        sinon.assert.calledOnce(commandHandler.buildCommands);
        sinon.assert.calledOnce(parkingService.listParkingSlots);
        sinon.assert.calledOnceWithExactly(responseCreator.createStatusResponse, [{
            slotNo: 15,
            registrationNo
        }]);
        sinon.assert.calledOnceWithExactly(writer, console.log);
    });
});