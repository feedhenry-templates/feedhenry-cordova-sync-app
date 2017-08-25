angular.module('app.controllers', [])

.controller('mainCtrl', function ($rootScope, $scope, SyncService, AuthService, AlertService) {
  SyncService.init();
  $rootScope.$on('sync', function (event, list) {
    $scope.list = list;
    $scope.$apply();
  });

  $scope.delete = function (item) {
    AuthService.guard('user:posts:delete', function (err) {
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
  $scope.logout = function() {
    AuthService.getKeycloakInstance().logout();
  }

  $scope.logout = function() {
    AuthService.getKeycloakInstance().logout();
  }

  $scope.title = 'My Profile';
  AuthService.getKeycloakInstance().loadUserProfile().success(function(profile) {
    $scope.profile = profile;
    $scope.$apply();
  });
})

.controller('editCtrl', function ($state, $stateParams, $location, $scope, SyncService, AuthService, AlertService) {
  if ($stateParams.id) {
    AuthService.guard('user:posts:update', function (err) {
      if (err) {
        $location.path('/tabs/main');
        return AlertService.alert(err.message);
      }
      SyncService.getItem($stateParams.id).then(function (item) {
        $scope.item = item;
      });
      $scope.title = 'Edit';
    });
  } else {
    AuthService.guard('user:posts:create', function (err) {
      if (err) {
        $location.path('/tabs/main');
      }
      $scope.title = 'New';
    });
  }

  $scope.new = function () {
    AuthService.guard('user:posts:create', function (err) {
      if (err) {
        return AlertService.alert(err.message);
      }
      $scope.item = {};
      $location.path('/tabs/detail/');
    });
  };

  $scope.profile = function () {
    $location.path('/tabs/profile');
  };

  $scope.save = function (item) {
    function navigate() {
      $state.go('tabs.main');
    }
    if (item.id) {
      return SyncService.update(item).then(navigate);
    }
    SyncService.save(item).then(navigate);
  };
});
