const parkingService = require('../services/parking-service');
const fileReader = require('../helpers/file-reader');
const commandHelper = require('../helpers/command-handler');
const {
    CREATE_PARKING_LOT,
    PARK,
    LEAVE,
    STATUS
} = require('../constants/commands');

const commandHandlerMap = {
    [CREATE_PARKING_LOT]: (createCommand) => parkingService.initializeWithCapacity(createCommand.data),
    [PARK]: (parkCommand) => parkingService.parkVehicle(parkCommand.data),
    [LEAVE]: (leaveCommand) => parkingService.releaseVehicle(leaveCommand.data),
    [STATUS]: (_statusCommand) => parkingService.listParkingSlots()
}

function main(arguments) {
    const inputCommands = fileReader.readFile(arguments);
    const commands = commandHelper.readCommands(inputCommands);

    for (const command of commands) {
        console.log(command);
        const response = commandHandlerMap[command.type](command);
        console.log(response);
    }
}

module.exports = {
    main
};