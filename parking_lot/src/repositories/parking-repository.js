
const parkingDB = {
    maxCapacity: 0,
    parkingLot: [

    ]
};

const hasCapacity = () => {
    return parkingDB.parkingLot.length < parkingDB.maxCapacity;
}

const buildParkingSlot = (slotNo) => ({
    slotNo: slotNo,
    isOccupied: false,
    vehicleDetail: null,
    startTime: null
});

const initializeWithCapacity = (maxCapacity) => {
    parkingDB.maxCapacity = maxCapacity;

    while (parkingDB.parkingLot.length <= maxCapacity) {
        const slotNo = parkingDB.parkingLot.length + 1;
        parkingDB.parkingLot.push(buildParkingSlot(slotNo))
    }
}

const listParkingSlots = () => {
    return parkingDB.parkingLot;
}

const parkVehicle = (numberPlate) => {
    const availableParkingSlot = parkingDB.parkingLot.find(parkingLot => !parkingLot.isOccupied);
    if (availableParkingSlot) {
        const newParkingDetails = {
            isOccupied = true,
            vehicleDetail = numberPlate,
            startTime = Date.now()
        };
        availableParkingSlot = newParkingDetails;
        return true;
    }
    return false;
}

