angular.module('app.controllers', [])

  /**
   * Controller for the main view, for listing the records.
   */
  .controller('mainCtrl', function ($rootScope, $scope, SyncService, AuthService, AlertService) {
    SyncService.init();
    $rootScope.$on('sync', function (event, list) {
      $scope.list = list;
      $scope.$apply();
    });

    $scope.delete = function (item) {
      AuthService.canI('sync_user', function (err) {
        if (err) {
          return AlertService.alert(err.message);
        }
        SyncService.deleteItem(item);
      });
    };
  })

  /**
   * Controller for the /tabs/profile route.
   */
  .controller('profileCtrl', function ($state, $stateParams, $location, $scope, SyncService, AuthService, AlertService) {
    $scope.logout = function () {
      AuthService.logout();
    }

    // Run on view init.
    $scope.title = 'My Profile';
    AuthService.loadUserProfile().success(function (profile) {
      $scope.profile = profile;
      $scope.$apply();
    });
  })

  /**
   * Controller for the detail view, for both creating and editing records.
   */
  .controller('editCtrl', function ($state, $stateParams, $location, $scope, SyncService, AuthService, AlertService) {
    $scope.save = function (item) {
      function navigate() {
        $state.go('tabs.main');
      }
      if (item.id) {
        return SyncService.update(item).then(navigate);
      }
      SyncService.save(item).then(navigate);
    };

    // Run on view init.
    if ($stateParams.id) {
      SyncService.getItem($stateParams.id).then(function (item) {
        $scope.item = item;
      });
      $scope.title = 'Edit';
    } else {
      $scope.item = {};
      $scope.title = 'New';
    }
  })

  /**
   * Controller used to change views in the app.
   */
  .controller('tabsCtrl', function($location, $scope, AuthService, AlertService) {
    function changeTab(requiredRole, path) {
      AuthService.canI(requiredRole, function (err) {
        if (err) {
          return AlertService.alert(err.message);
        }
        return $location.path(path);
      });
    }

    $scope.list = function() {
      changeTab('sync_user', '/tabs/main');
    };

    $scope.new = function() {
      changeTab('sync_user', '/tabs/detail/');
    };

    $scope.profile = function() {
      changeTab('sync_user', '/tabs/profile');
    }
  });
