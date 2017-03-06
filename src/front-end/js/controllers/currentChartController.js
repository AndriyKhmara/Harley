Harley.controller("currentChartController", [
    "$rootScope", "$scope", '$http', 'WeatherService', "Configs",
    function ($rootScope, $scope, $http, WeatherService, Configs) {

        $scope.config = $rootScope.configs;

        var initialize = function () {
            angular.extend($scope, {
                labels: [],
                data: [],
                options: {},
                cities: [{
                    label: "city",
                    value: "city"
                }],
                params: [{
                    label: 'value',
                    value: 'value'
                }]
            });
            setSelectedOptions();
        };

        $rootScope.$watch('currentWeather', function () {
            $scope.updateChart();
        });

        $scope.$watch('config', function () {
            // console.log("currentChartController", $scope.config);
            // $scope.config.$promise.then(function (data) {
            //     console.log("TEST", _.first($scope.config.cities).value);
            // }, function (err) {
            //     console.log(err);
            // })
        });

        $rootScope.$watch('configs', function () {
            // console.log("currentChartController configs", $rootScope.configs);
        });

        var setSelectedOptions = function () {
            $scope.selectedCity = _.first($scope.cities).value;
            $scope.selectedParam = _.first($scope.params).name;
        };

        $scope.updateChart = function () {
            $scope.labels = [];
            $scope.data = [];
            $scope.options = updateChartOptions();
            _.each($rootScope.currentWeather, function (data) {
                if ((data.cityName == $scope.selectedCity)) {
                    $scope.labels.push(data.sourceAPI);
                    $scope.data.push(data[$scope.selectedParam])
                }
            });
        };

        var getTicksByParam = function () {
            var result = {};
            result.beginAtZero = true;
            _.each($scope.params, function (param) {
                if (param.name === $scope.selectedParam) {
                    result.max = param.max;
                    result.min = param.min;
                    $scope.series = param.label;
                }
            });
            return result;
        };

        var updateChartOptions = function () {
            return {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: getTicksByParam()
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

        initialize();
    }
]);