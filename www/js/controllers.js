angular.module('app.controllers', [])

  .controller('mainCtrl', function($rootScope, $scope, sync) {
    sync.init();
    $rootScope.$on('sync', function(event, list) {
      $scope.list = list;
      $scope.$apply();
    });

    $scope.delete = function(item) {
      sync.deleteItem(item);
    };
  })

  .controller('editCtrl', function($state, $stateParams, $location, $scope, sync) {
    if ($stateParams.id) {
      sync.getItem($stateParams.id).then(function(item) {
        $scope.item = item;
      });
      $scope.title = 'Edit';
    } else {
      $scope.title = 'New';
    }

    $scope.new = function() {
      $scope.item = {};
      $location.path('/tabs/detail/')
    };

    $scope.save = function(item) {
      function navigate() {
        $state.go('tabs.main');
      }
      if (item.id) {
        sync.update(item).then(navigate);
      } else {
        sync.save(item).then(navigate);
      }
    };
  });
