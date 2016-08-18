// @formatter:off

// List the module dependencies here
var $ = require('jquery');

// @formatter:on

function Accordion( element ) {

  var _$element = $( element );
  var _$contents = _$element.find('.accordion__content');

  _$element.on('click', '.accordion__trigger', function() {
    var _$trigger = $(this);
    var _$content = _$trigger.next();
    var _$parent = _$trigger.closest('.accordion__item');

    _$content.slideToggle();

    _$contents.not(_$content).slideUp();

    _$element.find('.accordion__item').removeClass('is-active');
    _$parent.addClass('is-active');
  });
}

module.exports = Accordion;

