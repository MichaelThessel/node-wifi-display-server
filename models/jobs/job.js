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
Job.prototype.getData = function() {
    return this.data;
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
    return this.data.length;
}

module.exports = Job;
