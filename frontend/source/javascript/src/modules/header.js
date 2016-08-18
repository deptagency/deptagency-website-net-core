// @formatter:off

// List the module dependencies here
var $ = require('jquery');
var Throttle = require('lodash/throttle');

// @formatter:on

function Header( element ) {

  var _$element = $( element );
  var _$window = $(window);
  var isToggled = false;
  var lastScrollPosition = _$window.scrollTop();

  _$window.on('scroll', Throttle(toggleMenu, 300));

  function toggleMenu() {
    var scrollTop = _$window.scrollTop();

    if (scrollTop <= 10 && isToggled === true) {
      isToggled = false;
      _$element.removeClass('is-hidden');
    } else if (scrollTop > 10 && isToggled === false && scrollTop >= lastScrollPosition) {
      isToggled = true;
      _$element.addClass('is-hidden');
    } else if (scrollTop < lastScrollPosition && isToggled === true) {
      isToggled = false;
      _$element.removeClass('is-hidden');
    }

    lastScrollPosition = _$window.scrollTop();
  }

  toggleMenu();
}

module.exports = Header;

