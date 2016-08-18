// @formatter:off

// List the module dependencies here
var $ = require('jquery');

// @formatter:on

function Navigation( element ) {

  var _$element = $( element );
  var _$links = _$element.find('.navigation__link');
  var _$navigation__status = $('.navigation__status');
  var _$htmlBody = $('html, body');
  var _$html = $('html');
  var _$window = $(window);
  var lastScrollPosition = 0;

  _$links.on('click', function(e) {
    e.preventDefault();

    var sectionName = $(this).attr('data-link');
    var _$section = $('[data-section="' + sectionName + '"]');

    if(!_$section.length) {
      return false;
    }

    _$navigation__status.prop('checked', false).trigger('change');

    var scrollTop = _$section.offset().top;

    _$htmlBody.animate({
      scrollTop: scrollTop,
    }, 300, 'swing');
  });

  _$navigation__status.on('change', function() {
    if(_$navigation__status.prop('checked')) {
      lastScrollPosition = _$window.scrollTop();

      _$html.addClass('no-scroll');

      _$htmlBody.css({
        marginTop: _$window.scrollTop() * -1,
      });
    } else {
      _$htmlBody.css({
        marginTop: 0,
      });

      _$html.removeClass('no-scroll');

      _$window.scrollTop(lastScrollPosition);
    }
  });
}

module.exports = Navigation;

