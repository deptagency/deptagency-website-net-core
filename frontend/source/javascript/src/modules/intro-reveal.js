// @formatter:off

// List the module dependencies here
var $ = require('jquery');

// @formatter:on

function IntroReveal( element ) {

  var _$element = $( element );
  var _$trigger = _$element.find('.intro__read-more');
  var visible = false;
  var readMore = 'Read more';
  var readLess = 'Read less';

  _$trigger.on('click', toggleContent);

  function toggleContent() {
    if(visible) {
      _$element
        .animate({
          maxHeight: 350,
        });

      _$trigger.text(readMore);
    } else {
      var totalHeight = 0;

      _$element.find('.intro__title, .intro__description').each(function() {
        totalHeight += $(this).outerHeight(true);
      });

      _$element
        .animate({
          maxHeight: totalHeight,
        });

      _$trigger.text(readLess);
    }

    _$element.toggleClass('is-visible');

    visible = !visible;
  }
}

module.exports = IntroReveal;

