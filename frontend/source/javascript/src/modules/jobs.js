// @formatter:off

// List the module dependencies here
var $ = require('jquery');

// @formatter:on

var endpoints = {
  jobs: 'https://api.greenhouse.io/v1/boards/dept/embed/jobs',
};

var Jobs = {
  getJobs: function () {
    return $.ajax({
      dataType: 'json',
      url: endpoints.jobs,
    });
  },
};

module.exports = Jobs;
