// @formatter:off

// List the module dependencies here
var $ = require('jquery');
var Random = require('lodash/random');
var Sample = require('lodash/sample');
var Pull = require('lodash/pull');
var clients = require('json!../../../data/content/clients.json');

// Config
var config = {
  clientsToShowOnDesktop: 9,
  clientsToShowOnMobile: 8,
};

// @formatter:on

function Clients( element ) {

  var _$window = $( window);
  var _$element = $( element );
  var _$items = _$element.find('.clients__client');
  var clientsToShow = 0;
  var interval;

  var loopInitializedScreenSize = '';

  // Reinitialize the slider when the user resizes from mobile to desktop
  _$window.on('resize', function() {
    if (_$window.width() > 1023 && loopInitializedScreenSize !== 'desktop') {
      createLogoLoop('desktop');
    } else if (_$window.width() <= 1023 && loopInitializedScreenSize !== 'mobile') {
      createLogoLoop('mobile');
    }
  });

  if (_$window.width() > 1023) {
    createLogoLoop('desktop');
  } else {
    createLogoLoop('mobile');
  }

  function createLogoLoop(screenSize) {
    clearInterval(interval);

    var activeClients = [];
    var nonActiveClients = [];

    // determine how many clients to show, base on screen size
    if (screenSize === 'desktop') {
      clientsToShow = config.clientsToShowOnDesktop;
    } else {
      clientsToShow = config.clientsToShowOnMobile;
    }

    // create index of clients that are shown
    for (var i = 0, length = clientsToShow; i < length; i++) {
      activeClients.push(i);
      _$items.eq(i).attr('src', clients[i].image);
    }

    // create index of clients that are hidden
    for (var i = clientsToShow, length = clients.length - clientsToShow; i < length + clientsToShow; i++) {
      nonActiveClients.push(i);
    }

    // hide clients based on how many clients should be shown
    _$items
      .removeClass('clients__client--is-hidden')
      .slice(clientsToShow, clients.length)
      .addClass('clients__client--is-hidden');

    // switch an active client with a non active client, after a set interval
    interval = setInterval(function() {
      var index = Random(0, clientsToShow - 1);
      var currentClientId = activeClients[index];
      var newClientId = Sample(nonActiveClients);
      var newClient = clients[newClientId];

      _$items.eq(index).fadeOut(function() {
        _$items.eq(index).attr('src', newClient.image);
        _$items.eq(index).fadeIn();

        // add current client to nonactive array
        nonActiveClients.push(currentClientId);

        // remove current client from active array
        Pull(activeClients, currentClientId);

        // add new client to active array
        activeClients.splice(index, 0, newClientId);
        activeClients.join();

        // remove new client from nonactive array
        Pull(nonActiveClients, newClientId);
      });
    }, 2000);

    loopInitializedScreenSize = screenSize;
  }
}

module.exports = Clients;
