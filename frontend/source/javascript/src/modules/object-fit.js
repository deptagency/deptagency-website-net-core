// @formatter:off

// List the module dependencies here
var $             = require('jquery'),
    Throttle      = require('lodash/throttle'),
    imagesLoaded  = require('imagesloaded/imagesloaded');

// @formatter:on

function ObjectFit( element ) {

  var _$element = $( element ),
      div               = document.createElement('div'),
      vendors           = 'Khtml Ms O Moz Webkit'.split(' '),
      len               = vendors.length,
      imageIsWiderClass = 'image--is-wider';

  if (!testObjectFit('object-fit')) {
    $('body').addClass('no-objectfit');

    setElementStyles();

    $(window).on('resize', Throttle(setElementStyles, 300));
  }

  function testObjectFit(prop) {
    if (prop in div.style) return true;

    prop = prop.replace(/^[a-z]/, function(val) {
      return val.toUpperCase();
    });

    while (len--) {
      if (vendors[len] + prop in div.style) {
        // browser supports box-shadow. Do what you need.
        // Or use a bang (!) to test if the browser doesn't.
        return true;
      }
    }

    return false;
  }

  function setElementStyles() {

      imagesLoaded(_$element, function () {

        var elementWidth        = _$element.width(),
            elementHeight       = _$element.height(),
            parentWidth         = _$element.parent().width(),
            parentHeight        = _$element.parent().height(),
            elementAspectRatio  = elementWidth / elementHeight,
            parentAspectRatio   = parentWidth / parentHeight;

        if (elementAspectRatio > parentAspectRatio && !_$element.hasClass(imageIsWiderClass)) {
          _$element.addClass(imageIsWiderClass);
        }
        else if (elementAspectRatio <= parentAspectRatio && _$element.hasClass(imageIsWiderClass)) {
          _$element.removeClass(imageIsWiderClass);
        }
      });

  }
}

module.exports = ObjectFit;

