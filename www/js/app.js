//this file gets browserified any updates to it will not be reflected in the studio preview

var angular = require("angular");
require("angular-animate");
require("angular-ui-router");
require("ionic-scripts");
require("angular-sanitize");

angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services'])
.constant('fhSync', require('fh-sync-js'))
.constant('fhSyncConfig', require('../../sync-config.json'))
.constant('moment', require("moment"))

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
