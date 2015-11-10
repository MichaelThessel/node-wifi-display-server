var display = require('./display.js');

// Jobs that will be processed by the queue
var jobs = [
    require('./jobs/time.js'),
    require('./jobs/system_load.js'),
    require('./jobs/gratificator.js'),
];

/**
 * Job Queue
 */
function Queue(jobs) {
    this.jobs = jobs;
    this.priorityTtl = {
        "ALERT": 30,
        "NOTICE": 10,
        "INFO": 5
    };
    this.jobIndex = 0;
    this.currentJobTtl = 0;
};

/*
 * Set the time before the next job will be executed
 */
Queue.prototype.setCurrentJobTtl = function(job) {
    var jobPriority = job.getPriority();

    if (typeof this.priorityTtl[job.getPriority()] == 'undefined') {
        this.currentJobTtl = this.priorityTtl.INFO;
        return;
    }

    this.currentJobTtl = this.priorityTtl[job.getPriority()];
}

/*
 * Job callback function
 */
Queue.prototype.callback = function (job) {
    if (!job.doDisplay()) { return; }

    display(job.data, job.getFormatterOptions());
}

/*
 * Execute the job queue
 */
Queue.prototype.execute = function () {
    var job;

    this.currentJobTtl--;
    if (this.currentJobTtl > 0) { return; }

    job = this.jobs[this.jobIndex];
    job.getData(this.callback);
    this.setCurrentJobTtl(job);

    this.jobIndex++;
    if (this.jobIndex >= this.jobs.length) { this.jobIndex = 0; }
}

/*
 * Check the jqb queue once every second if there is a new job to execute
 */
Queue.prototype.run = function () {
    setInterval(function(_this) { _this.execute(); } , 1000, this);
}

module.exports = new Queue(jobs);
