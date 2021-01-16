const parkingRepository = require('../repositories/parking-repository');
const chargesCalculator = require('../helpers/charges-calculator');

const hasCapacity = () => parkingRepository.hasCapacity();
const initializeWithCapacity = (maxCapacity) => parkingRepository.initializeWithCapacity(maxCapacity);
const listParkingSlots = () => parkingRepository.listParkingSlots();
const parkVehicle = (registrationNo) => parkingRepository.parkVehicle(registrationNo);

const releaseVehicle = (registrationNo, hours) => {
    const releaseResponse = parkingRepository.releaseVehicle(registrationNo);
    if (releaseResponse.success) {
        return {
            ...releaseResponse,
            charges: chargesCalculator.calculateCharges(hours)
        }
    }
    return releaseResponse;
}

module.exports = {
    hasCapacity,
    initializeWithCapacity,
    listParkingSlots,
    parkVehicle,
    releaseVehicle
};