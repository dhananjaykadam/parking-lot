const parkingRepository = require('../repositories/parking-repository');

const hasCapacity = () => parkingRepository.hasCapacity();
const initializeWithCapacity = (maxCapacity) => parkingRepository.initializeWithCapacity(maxCapacity);
const listParkingSlots = () => parkingRepository.listParkingSlots();
const parkVehicle = (numberPlate) => parkingRepository.parkVehicle(numberPlate);

module.exports = {
    hasCapacity,
    initializeWithCapacity,
    listParkingSlots,
    parkVehicle
};