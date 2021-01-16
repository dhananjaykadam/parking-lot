const MINIMUM_CHARGES = 10;
const PER_HOUR_CHARGE = 10;

const calculateCharges = (hours) => (hours <= 2) ? MINIMUM_CHARGES : MINIMUM_CHARGES + (hours - 2) * PER_HOUR_CHARGE;

module.exports = {
    calculateCharges
}