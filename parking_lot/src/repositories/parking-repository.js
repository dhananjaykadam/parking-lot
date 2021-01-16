
const parkingDB = {
    maxCapacity: 0,
    parkingLot: [

    ]
};

const RELEASED_PARKING_SLOT = {
    isOccupied: false,
    vehicleDetail: null,
    startTime: null
};

const hasCapacity = () => {
    return parkingDB.parkingLot.some(parkingLot => !parkingLot.isOccupied);
}

const buildParkingSlot = (slotNo) => ({
    slotNo: slotNo,
    isOccupied: false,
    vehicleDetail: null,
    startTime: null
});

const initializeWithCapacity = (maxCapacity) => {
    while (parkingDB.parkingLot.length <= maxCapacity) {
        const slotNo = parkingDB.parkingLot.length + 1;
        parkingDB.parkingLot.push(buildParkingSlot(slotNo))
    }
}

const listParkingSlots = () => {
    return parkingDB.parkingLot;
}

const parkVehicle = (numberPlate) => {
    if (!hasCapacity()) return false;

    let availableParkingSlot = parkingDB.parkingLot.find(parkingLot => !parkingLot.isOccupied);
    if (availableParkingSlot) {
        availableParkingSlot = {
            isOccupied: true,
            vehicleDetail: numberPlate,
            startTime: Date.now()
        }
        return true;
    }
    return false;
}
const releaseVehicle = (numberPlate) => {
    let parkedVehicle = parkingDB.parkingLot.find(parkingLot => parkingLot.vehicleDetail === numberPlate);
    if (parkVehicle) {
        parkedVehicle = {
            ...RELEASED_PARKING_SLOT
        };
        return true;
    }
    return false;
}

module.exports = {
    hasCapacity,
    initializeWithCapacity,
    listParkingSlots,
    parkVehicle,
    releaseVehicle
};
