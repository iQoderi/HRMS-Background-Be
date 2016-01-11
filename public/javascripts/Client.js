/**
 * Created by qoder on 16-1-9.
 */
angular.module('myApp', ['ngAnimate', 'ui.bootstrap', 'ui.router']);
angular.module('myApp').controller('myCtrl', function ($scope, $uibModal, $log, $http, $state) {
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
        Ajax('/allPerson', 'GET', "", function (data, header, config, status) {
            $scope.datas = data;
        }, function (data, header, config, status) {
            console.log('error');
        });


        $scope.searchSomeone = function () {
            var chtest = /^[\u4e00-\u9fa5]{1,4}$/;
            if ($scope.SBusername !== undefined) {
                if (true) {
                    var username = JSON.stringify({username: $scope.SBusername});
                    Ajax('/searchSomeone', 'POST', username, function (data, header, config, status) {
                        $scope.searchedPerson = data;
                        $state.go('searchSomeone');
                    }, function (data, header, config, status) {
                        alert('Not Found');
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

        $scope.getIndex = function (index) {
            var Week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
            return Week[index];
        }
    })


    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('clubMess', {
                url: '/clubMess',
                templateUrl: '../template/clubMess.html',
            })

            .state('allPerson', {
                url: '/allPerson',
                templateUrl: '../template/allperson.html',
            })
            .state('searchSomeone', {
                url: '/searchSomeone',
                templateUrl: '../template/searchSomeone.html',
            })
            .state('searchSparePerson', {
                url: '/searchSparePerson',
                templateUrl: '../template/searchSparePerson.html'
            })
        $urlRouterProvider.otherwise("/clubMess");
    })

angular.module('myApp').controller('alertCtrl', function ($scope, $uibModalInstance, $http, $state, $rootScope) {
    $scope.haha = "haha";
    $scope.$emit('transfer.type', $scope.haha);
    $scope.searchSparePerson = function () {
        var senddata = {
            weekday: $scope.search.weekday,
            myclass: $scope.search.myclass,
            department: $scope.search.department
        }

        senddata = JSON.stringify(senddata);
        $http.post('/searchSparePerson', senddata)
            .success(function (data) {
                $rootScope.sparePersons = data;
                console.log(data);
                $state.go('searchSparePerson');
                $scope.cancel();
            }).error(function (error) {
            console.log('error');
        })
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});