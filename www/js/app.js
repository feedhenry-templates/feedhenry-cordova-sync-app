var fhSync = require('fh-sync-js');
var createCloudHandler = require('./keycloak/cloud-handler');
var keycloak = require('keycloak-js')(require('../../config/keycloak-config.json'));
var syncConfig = require('../../config/sync-config.json');

var angular = require("angular");
require("angular-animate");
require("angular-ui-router");
require("ionic-scripts");
require("angular-sanitize");

// Use injector to get the $http module from angular, used for web handler.
$http = angular.injector(["ng"]).get("$http");

/**
 * We need to ensure that, if running on a device, the 'deviceready' event has
 * been emitted before invoking Keycloak. This is because Keycloak wants to use
 * the in-app browser. This is only available once the event has been emitted.
 *
 * The event will never be emiited on a browser so we have a check here. When
 * an app is running it will not have a http-like url scheme. We can use this
 * to detect whether we should wait for 'deviceready' or not.
 */
var isApp = document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
if (isApp) {
  document.addEventListener("deviceready", onDeviceReady, false);
} else {
  onDeviceReady();
}

/**
 * We need to initialise Keycloak. Once done we should have a token available
 * to us. We can include this in a header for every request made by the sync
 * framework by creating a custom cloud handler.
 */
function onDeviceReady() {
  keycloak.init({
      onLoad: 'login-required',
      flow: 'implicit'
    })
    .success(function () {
      // Create a custom sync handler, include Authorization header with token.
      var keycloakCloudHandler = createCloudHandler(syncConfig.uri + '/sync/', {
        headers: {
          Authorization: 'Bearer ' + keycloak.token
        }
      }, $http, function (err, res, cb) {
        if (err) {
          return err.status === 403 ? keycloak.logout() : cb();
        }
        return cb();
      });
      // Update the cloud handler for sync, tokens will be sent from now on.
      fhSync.setCloudHandler(keycloakCloudHandler);
    })
    .error(function () {
      alert('Failed to initialize Keycloak. Please try again.');
    });
}

angular
  .module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services'])
  .constant('fhSync', fhSync)
  .constant('fhSyncConfig', syncConfig)
  .constant('keycloak', keycloak)
  .constant('moment', require("moment"))
  .config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
  }])
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  });
