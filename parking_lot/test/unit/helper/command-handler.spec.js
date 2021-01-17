const commandHandler = require('../../../src/helpers/command-handler');
const { expect } = require("chai");
const { CREATE_PARKING_LOT, PARK, STATUS, LEAVE } = require('../../../src/constants/commands');

describe("Command Handler", function () {
    it("should build correct create parking lot command", function () {

        const createCommand = "create_parking_lot 15";

        const builtCommand = commandHandler.buildCommands([createCommand])[0];

        expect(builtCommand.type).to.equal(CREATE_PARKING_LOT);
        expect(builtCommand.data).to.equal(15);
    });

    it("should build correct park command", function () {

        const parkCommand = "park KA-01-HH-1234";

        const builtCommand = commandHandler.buildCommands([parkCommand])[0];

        expect(builtCommand.type).to.equal(PARK);
        expect(builtCommand.data).to.equal('KA-01-HH-1234');
    });

    it("should build correct leave command", function () {

        const leaveCommand = "leave KA-01-HH-3141 4";

        const builtCommand = commandHandler.buildCommands([leaveCommand])[0];

        expect(builtCommand.type).to.equal(LEAVE);
        expect(builtCommand.data.registrationNo).to.equal('KA-01-HH-3141');
        expect(builtCommand.data.hours).to.equal(4);
    });

    it("should build correct status command", function () {

        const statusCommand = "status";

        const builtCommand = commandHandler.buildCommands([statusCommand])[0];

        expect(builtCommand.type).to.equal(STATUS);
        expect(builtCommand.data).to.equal('');
    });
});