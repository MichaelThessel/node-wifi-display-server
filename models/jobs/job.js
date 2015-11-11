function Job() {
    this.priority = 'INFO';
    this.data = [];
    this.formatterOptions = [];
}

/*
 * Get job priority
 */
Job.prototype.getPriority = function() {
    return this.priority;
}

/*
 * Get job data
 */
Job.prototype.getData = function(callback) {
    callback(this);
}

/*
 * Get formatter options
 */
Job.prototype.getFormatterOptions = function() {
    return this.formatterOptions;
}

/*
 * Returns whether or not to display the results of the job execution
 */
Job.prototype.doDisplay = function() {
    return this.hasData;
}

module.exports = Job;
