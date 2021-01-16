const parkingRepository = require('../repositories/parking-repository');

const hasCapacity = () => parkingRepository.hasCapacity();
const initializeWithCapacity = (maxCapacity) => parkingRepository.initializeWithCapacity(maxCapacity);
const listParkingSlots = () => parkingRepository.listParkingSlots();
const parkVehicle = (registrationNo) => parkingRepository.parkVehicle(registrationNo);
const releaseVehicle = (registrationNo) => parkingRepository.releaseVehicle(registrationNo);

module.exports = {
    hasCapacity,
    initializeWithCapacity,
    listParkingSlots,
    parkVehicle,
    releaseVehicle
};