angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('tabs.main', {
      url: '/main',
      views: {
        'main': {
          templateUrl: 'templates/main.html',
          controller: 'mainCtrl'
        }
      }
    })

    .state('tabs.edit/new', {
      url: '/detail/:id',
      views: {
        'detail': {
          templateUrl: 'templates/detail.html',
          controller: 'editCtrl'
        }
      }
    })

    .state('tabs', {
      url: '/tabs',
      abstract:true,
      templateUrl: 'templates/tabs.html'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tabs/main');

});