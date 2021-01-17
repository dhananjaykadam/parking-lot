const {
    CREATE_PARKING_LOT,
    PARK,
    LEAVE,
    STATUS
} = require('../constants/commands');

const BASE_OF_10 = 10;
const buildCreateCommand = {
    canParse: (command) => command.startsWith(CREATE_PARKING_LOT),
    buildCommand: (command) => ({
        type: CREATE_PARKING_LOT,
        data: parseInt(command.split(' ')[1], BASE_OF_10)
    })
}
const buildParkCommand = {
    canParse: (command) => command.startsWith(PARK),
    buildCommand: (command) => ({
        type: PARK,
        data: command.split(' ')[1]
    })
}
const buildLeaveCommand = {
    canParse: (command) => command.startsWith(LEAVE),
    buildCommand: (command) => ({
        type: LEAVE,
        data: {
            registrationNo: command.split(' ')[1],
            hours: parseInt(command.split(' ')[2]),
        }
    })
}
const buildStatuCommand = {
    canParse: (command) => command.startsWith(STATUS),
    buildCommand: (_command) => ({
        type: STATUS,
        data: ''
    })
}
const buildCommands = (commands) => {
    const commandHandlers = [buildCreateCommand, buildParkCommand, buildLeaveCommand, buildStatuCommand];
    return commands.map(command => commandHandlers.find(handler => handler.canParse(command)).buildCommand(command));
}

module.exports = {
    buildCommands
}