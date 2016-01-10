/**
 * Created by qoder on 16-1-9.
 */
angular.module('myApp', ['ngAnimate', 'ui.bootstrap','ui.router']);
angular.module('myApp').controller('myCtrl', function ($scope, $uibModal, $log, $http) {
        $scope.items = ['item1', 'item2', 'item3'];
        $scope.animationsEnabled = true;
        $scope.open = function (size) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'alertCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        }
        $http.get("data.JSON")
            .success(function (res) {
                $scope.datas = res.record;
                console.log($scope.datas);
            })

        $scope.oneAtATime = true;

    })

    .config(function ($stateProvider) {
        $stateProvider
            .state('clubMess',{
                url:'/clubMess',
                templateUrl:'./template/clubMess.html'
            })
            .state('allperson',{
                url:'/allperson',
                templateUrl:'./template/tpl.html'
            })

    })


angular.module('myApp').controller('alertCtrl', function ($scope, $uibModalInstance, items) {
    $scope.searchSparePerson = function () {
        console.log($scope.search.weekday);
        console.log($scope.search.myclass);
        console.log($scope.search.department);
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});