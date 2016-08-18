// @formatter:off

// List the module dependencies here
var $ = require('jquery');

// @formatter:on

function Video( element ) {

  var _$element = $( element );
  var _$container = _$element.closest('.agencies');

  _$container.on('mouseenter', function() {
    _$element[0].play();
  });

  _$container.on('mouseleave', function() {
    _$element[0].pause();
  });

}

module.exports = Video;
