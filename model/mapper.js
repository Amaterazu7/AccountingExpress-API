
module.exports.payment = () => new Map([[0, 'CREDIT'], [1, 'DEBIT'], ['CREDIT', 0], ['DEBIT', 1]]);

module.exports.status = () => new Map([
    [0, 'PROCESSING'], ['PROCESSING', 0],
    [1, 'REGISTERED'], ['REGISTERED', 1],
    [2, 'FAILED'], ['FAILED', 2],
    [3, 'CANCELLED'], ['CANCELLED', 3]
]);
