const parkingService = require('../services/parking-service');
const fileReader = require('../helpers/file-reader');
const commandHelper = require('../helpers/command-handler');
const {
    CREATE_PARKING_LOT,
    PARK,
    LEAVE,
    STATUS
} = require('../constants/commands');
const responseCreator = require('../helpers/response-creator');

const commandHandlerMap = {
    [CREATE_PARKING_LOT]: (createCommand) => responseCreator.createParkingCreatedResonse(parkingService.initializeWithCapacity(createCommand.data)),
    [PARK]: (parkCommand) => responseCreator.createParkingResponse(parkingService.parkVehicle(parkCommand.data)),
    [LEAVE]: (leaveCommand) => responseCreator.createVehicleReleaseResponse(parkingService.releaseVehicle(leaveCommand.data.registrationNo, leaveCommand.data.hours)),
    [STATUS]: (_statusCommand) => responseCreator.createStatusResponse(parkingService.listParkingSlots())
}

function main(arguments) {
    const inputCommands = fileReader.readFile(arguments);
    commandHelper.buildCommands(inputCommands)
        .map(command => commandHandlerMap[command.type](command))
        .forEach(writer => writer.write(console.log));
}

module.exports = {
    main
};