/**
 * Created by qoder on 16-1-9.
 */
angular.module('myApp', ['ngAnimate', 'ui.bootstrap', 'ui.router']);
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
        $scope.oneAtATime = true;

        var Ajax = function (myUrl, myMethod, mydata, succFn, errorFn) {
            $http({
                url: myUrl,
                method: myMethod,
                data: mydata
            }).success(
                succFn        //请求成功时触发的函数
            ).error(
                errorFn       //请求失败时候触发的一些函数
            );
        }

        Ajax('data.JSON', 'GET', "", function (data, header, config, status) {
            $scope.datas = data.record;
        }, function (data, header, config, status) {
            console.log('error');
        });

        $scope.searchSomeone = function () {
            console.log($scope.SBusername);
            var chtest = /^[\u4e00-\u9fa5]{1,4}$/;
            console.log(chtest.test($scope.SBusername));
            if ($scope.SBusername !== undefined) {
                if (chtest.test($scope.SBusername)) {
                    var username = angular.toJson({username: $scope.SBusername});
                    Ajax('/searchSomeone', 'POST', username, function (data, header, config, status) {
                        console.log(data);
                    }, function (data, header, config, status) {
                        console.log('not found');
                    });
                } else {
                    alert('请检查输入格式');
                }
            } else {
                alert('请检查输入格式');
            }
        }
        $scope.$on('transfer.type', function () {
            console.log('传递成功');
        })
    })

    .config(function ($stateProvider) {
        $stateProvider
            .state('clubMess', {
                url: '/clubMess',
                templateUrl: './template/clubMess.html',
                controller: 'clubMessCtrl'
            })

            .state('allperson', {
                url: '/allperson',
                templateUrl: './template/allperson.html',
            })
            .state('searchSomeone', {
                url: '/searchSomeone',
                templateUrl: './template/searchSomeone.html',
            })
    })

angular.module('myApp').controller('clubMessCtrl', function ($scope, $http) {
    $scope.getIndex = function (index) {
        var Week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
        return Week[index];
    }

    $scope.ifHasTime = function (item) {
        if (item === 1) {
            return true
        } else {
            return false;
        }
    }
});

angular.module('myApp').controller('alertCtrl', function ($scope, $uibModalInstance, items) {
    $scope.haha = "haha";
    $scope.$emit('transfer.type', $scope.haha);
    $scope.searchSparePerson = function () {
        console.log($scope.search.weekday);
        console.log($scope.search.myclass);
        console.log($scope.search.department);
    }
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});