
const chargesCalculator = require('./charges-calculator');

const wrapResponse = (responseToWrap) => ({
    response: responseToWrap,
    write: (writter) => writter(responseToWrap)
});

const createParkingCreatedResonse = (createResponse) => wrapResponse(`Created parking lot with ${createResponse.maxCapacity} slots`);

const createParkingResponse = (parkingStatus) => {
    if (parkingStatus.success) {
        return wrapResponse(`Allocated slot number: ${parkingStatus.slotNo}`);
    }
    return wrapResponse('Sorry, parking lot is full');
}

const createVehicleReleaseResponse = (releaseStatus) => {
    if (releaseStatus.success) {
        return wrapResponse(`Registration number ${releaseStatus.registrationNo} with Slot Number ${releaseStatus.slotNo} is free with Charge ${releaseStatus.charges}`);
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