
const calculateCharges = (startTime) => (startTime - Date.now()) / 1000 * 60 * 60;

module.exports = {
    calculateCharges
}