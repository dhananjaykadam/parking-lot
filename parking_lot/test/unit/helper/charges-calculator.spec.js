const chargesCalculator = require('../../../src/helpers/charges-calculator');
const { expect } = require("chai");

describe("Charges calculator", function () {
    it("should have $10 for first two hour", function () {
        expect(chargesCalculator.calculateCharges(1)).to.equal(10);
        expect(chargesCalculator.calculateCharges(2)).to.equal(10);
    });

    it("should have $10 for first two hour and $10 per hour after that", function () {
        expect(chargesCalculator.calculateCharges(3)).to.equal(20);
    });

    it("should have $10 for less than one hour", function () {
        expect(chargesCalculator.calculateCharges(.5)).to.equal(10);
    });
});