"use strict";

// Require the module init function
// This function will instantiate all modules found with a given selector.
var moduleInit = require( './src/modules/util/module-init' );

// Initialize modules
moduleInit( '.js-accordion', require('./src/modules/accordion') );
moduleInit( '.js-intro', require('./src/modules/intro-reveal') );
moduleInit( '.js-slider', require('./src/modules/slider') );
moduleInit( '.image--cover', require('./src/modules/object-fit') );
moduleInit( '.js-navigation', require('./src/modules/navigation') );
moduleInit( '.header', require('./src/modules/header') );
moduleInit( '.js-clients', require('./src/modules/clients') );
