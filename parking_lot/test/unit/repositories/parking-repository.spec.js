
const { expect } = require("chai");
const { Chance } = require('chance');
const proxyquire = require('proxyquire');

const chance = new Chance();
describe("Parking repository", function () {
    const registrationNo = chance.string();
    let parkingRepository;

    beforeEach(() => {
        parkingRepository = proxyquire('../../../src/repositories/parking-repository', {});
        parkingRepository.initializeWithCapacity(1);
    });
    it("should create parking lot", function () {
        parkingRepository = proxyquire('../../../src/repositories/parking-repository', {});
        expect(parkingRepository.hasCapacity()).to.equal(false);

        parkingRepository.initializeWithCapacity(1);

        expect(parkingRepository.hasCapacity()).to.equal(true);
    });

    it("should have no vehicle parked by default", function () {
        parkingRepository = proxyquire('../../../src/repositories/parking-repository', {});
        const parkingStatus = parkingRepository.listParkingSlots();

        expect(parkingStatus.some(x => x.isOccupied)).to.equal(false);
    });

    it("should park vehicle", function () {
        const parkedVehicle = parkingRepository.parkVehicle(registrationNo)

        expect(parkedVehicle.registrationNo).to.equal(registrationNo);
        expect(parkedVehicle.slotNo).to.equal(1);
        expect(parkedVehicle.success).to.equal(true);
    });

    it("should fail to park vehicle over full capacity", function () {
        parkingRepository.parkVehicle(chance.string())

        const parkedVehicle = parkingRepository.parkVehicle(registrationNo)

        expect(parkedVehicle.success).to.equal(false);
    });

    it("should fail to release bad registration no", function () {
        parkingRepository.parkVehicle(registrationNo)

        const badRegistrationNo = chance.string();
        const parkedVehicle = parkingRepository.releaseVehicle(badRegistrationNo)

        expect(parkedVehicle.success).to.equal(false);
    });

    it("should release correct registration no", function () {
        parkingRepository.parkVehicle(registrationNo)

        const parkedVehicle = parkingRepository.releaseVehicle(registrationNo)

        expect(parkedVehicle.success).to.equal(true);
        expect(parkingRepository.hasCapacity()).to.equal(true);
    });
});