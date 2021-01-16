
const chargesCalculator = require('./charges-calculator');

const wrapResponse = (responseToWrap) => ({
    response: responseToWrap,
    write: (writter) => writter(responseToWrap)
});

const createParkingCreatedResonse = (maxCapacity) => wrapResponse(`Created parking lot with ${maxCapacity} slots`);

const createParkingResponse = (parkingStatus) => {
    if (parkingStatus.success) {
        return wrapResponse(`Allocated slot number: ${parkingStatus.slotNo}`);
    }
    return wrapResponse('Sorry, parking lot is full');
}

const createVehicleReleaseResponse = (releaseStatus) => {
    if (releaseStatus.success) {
        const totalCharge = chargesCalculator.calculateCharges(releaseStatus.startTime);
        return wrapResponse(`Registration number ${releaseStatus.registrationNo} with Slot Number 3 is free with Charge ${totalCharge}`);
    }
    return wrapResponse(`Registration number ${releaseStatus.registrationNo} not found`);
}

const createStatusResponse = (parkingSlots) => {
    const response = parkingSlots.map(slot => `${slot.slotNo} ${slot.registrationNo}`);
    response.unshift('Slot No. Registration No.');
    return {
        response: response,
        write: (writter) => response.forEach(response => writter(response))
    };
}

module.exports = {
    createParkingCreatedResonse,
    createParkingResponse,
    createVehicleReleaseResponse,
    createStatusResponse
}