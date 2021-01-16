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
    console.log("yeah", arguments);

    const inputCommands = fileReader.readFile(arguments);
    const commands = commandHelper.readCommands(inputCommands);

     console.log(commands);

    console.log(parkingService.hasCapacity());
    parkingService.initializeWithCapacity(10);
    console.log(parkingService.hasCapacity());
    //console.log(parkingService.listParkingSlots());


    for(const command of commands){
        console.log(command);
        console.log(commandHandlerMap[command.type]);
        const response = commandHandlerMap[command.type](command);
        console.log(response);
    }
}

module.exports = {
    main
};