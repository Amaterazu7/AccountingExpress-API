class Status {
    constructor() {
        this.PROCESSING = 'PROCESSING';
        this.REGISTERED = 'REGISTERED';
        this.FAILED = 'FAILED';
        this.CANCELLED = 'CANCELLED';

    }
}

module.exports = Object.freeze( Status );
