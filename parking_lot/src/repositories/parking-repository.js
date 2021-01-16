
const parkingDB = {
    maxCapacity: 0,
    parkingLot: [

    ],
    parkingHistory: []
};

const hasCapacity = () => {
    return parkingDB.parkingLot.some(parkingLot => !parkingLot.isOccupied);
}

const buildParkingSlot = (slotNo) => ({
    slotNo: slotNo,
    isOccupied: false,
    registrationNo: null,
    startTime: null
});

const initializeWithCapacity = (maxCapacity) => {
    while (parkingDB.parkingLot.length <= maxCapacity) {
        const slotNo = parkingDB.parkingLot.length + 1;
        parkingDB.parkingLot.push(buildParkingSlot(slotNo))
    }
}

const listParkingSlots = () => {
    return parkingDB.parkingLot.filter(slot => slot.isOccupied)
        .map(({ slotNo, registrationNo }) => ({
            slotNo,
            registrationNo
        }));
}

const parkVehicle = (registrationNo) => {
    if (!hasCapacity()) return false;

    let availableParkingSlot = parkingDB.parkingLot.find(parkingLot => !parkingLot.isOccupied);
    if (availableParkingSlot) {
        const allocationResponse = {
            registrationNo,
            slotNo: availableParkingSlot.slotNo,
            success: true
        };

        availableParkingSlot.isOccupied = true;
        availableParkingSlot.registrationNo = registrationNo;
        availableParkingSlot.startTime = Date.now();
        return allocationResponse;
    }
    return {
        status: false
    };
}

const releaseVehicle = (registrationNo) => {
    let parkedVehicle = parkingDB.parkingLot.find(parkingLot => parkingLot.registrationNo === registrationNo);
    if (parkVehicle) {
        const releaseResponse = {
            registrationNo,
            startTime: parkedVehicle.startTime,
            success: true
        };
        parkingDB.parkingHistory.push({
            ...parkVehicle
        });

        parkedVehicle.isOccupied = false;
        parkedVehicle.registrationNo = null;
        parkedVehicle.startTime = null;

        return releaseResponse;
    }
    return {
        registrationNo,
        success: false
    };
}

module.exports = {
    hasCapacity,
    initializeWithCapacity,
    listParkingSlots,
    parkVehicle,
    releaseVehicle
};
