const parkingService = require('../../../src/services/parking-service');
const parkingRepository = require('../../../src/repositories/parking-repository');
const { expect } = require("chai");
const sinon = require("sinon");
const { Chance } = require('chance');
const chance = new Chance();

describe("Parking Service", function () {
    beforeEach(() => {
        sinon.stub(parkingRepository, 'hasCapacity').returns(false);
        sinon.stub(parkingRepository, 'initializeWithCapacity');
        sinon.stub(parkingRepository, 'listParkingSlots');
        sinon.stub(parkingRepository, 'parkVehicle');
        sinon.stub(parkingRepository, 'releaseVehicle');
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should check for capacity", function () {
        const reponse = parkingService.hasCapacity();

        sinon.assert.calledOnce(parkingRepository.hasCapacity);
        expect(reponse).to.equal(false);
    });

    it("should initialize with given capacity", function () {
        parkingRepository.initializeWithCapacity.returns({
            success: true,
            maxCapacity: 15
        });

        const reponse = parkingService.initializeWithCapacity(15);
        sinon.assert.calledOnceWithExactly(parkingRepository.initializeWithCapacity, 15);
        expect(reponse).to.deep.equals({
            success: true,
            maxCapacity: 15
        });
    });

    it("should list parking lot", function () {
        const expectedResponse = [
            {
                slotNo: 1,
                registrationNo: chance.string()
            }
        ];
        parkingRepository.listParkingSlots.returns(expectedResponse);

        const response = parkingService.listParkingSlots(15);

        sinon.assert.calledOnceWithExactly(parkingRepository.listParkingSlots);
        expect(response).to.deep.equals(expectedResponse)
    });

    it("should calculate charges for released vehicle", function () {
        const expectedResponse = {
            [chance.word()]: chance.string(),
            success: true
        };
        const registrationNo = chance.string();
        parkingRepository.releaseVehicle.returns(expectedResponse);

        const response = parkingService.releaseVehicle(registrationNo, 2);

        sinon.assert.calledOnceWithExactly(parkingRepository.releaseVehicle, registrationNo);
        expect(response).to.deep.equals({
            ...expectedResponse,
            charges: 10
        })
    });
    it("should not calculate charges when fail to release vehicle", function () {
        const expectedResponse = {
            [chance.word()]: chance.string(),
            success: false
        };
        const registrationNo = chance.string();
        parkingRepository.releaseVehicle.returns(expectedResponse);

        const response = parkingService.releaseVehicle(registrationNo, 2);

        sinon.assert.calledOnceWithExactly(parkingRepository.releaseVehicle, registrationNo);
        expect(response).to.deep.equals(expectedResponse)
    });
});