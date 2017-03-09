Harley.controller("sideNavController", ["$scope", "$rootScope", "CHART_TYPE",
    function ($scope, $rootScope, CHART_TYPE) {
        var selectedChartType = "temp";
        $scope.status = "closed";
        $scope.cities = [];
        $scope.citiesModel = "Rivne";
        $scope.dateFromModel = new Date();
        $scope.dateToModel = new Date();
        $scope.configs = $rootScope.config;
        $scope.chartTypes = CHART_TYPE;

        $scope.$watch('configs', function () {
            $scope.configs.$promise.then(function (data) {
                _.each(data.cities, function (cityName) {
                    $scope.cities.push(cityName.label)
                });
            }, function (err) {
                console.log("configs error: ", err);
            })
        });

        $scope.toggleSideNav = function () {
            $('.side-nav').toggleClass("open close");
            $('.btn-burger').toggleClass("open");
        };

        $scope.setChartType = function (name) {
            angular.forEach($scope.chartTypes, function (element) {
                if (element.name !== name) {
                    element.isSelected = false;
                } else {
                    selectedChartType = element.type;
                    element.isSelected = true;
                }
            });
        };

        $scope.getStatChart = function () {
            $rootScope.statChartParams = {
                periodFrom: _getFormatedDate($scope.dateFromModel),
                periodTo: _getFormatedDate($scope.dateToModel),
                city: $scope.citiesModel,
                type: selectedChartType
            };
        };

        $scope.clear = function () {
            if ($scope.datePickerFrom.opened) {
                $scope.dateFromModel = null;
            } else {
                $scope.dateToModel = null;
            }
        };

        $scope.inlineOptions = {
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateFromPicker = function () {
            $scope.datePickerFrom.opened = true;
        };

        $scope.dateToPicker = function () {
            $scope.datePickerTo.opened = true;
        };
        
        //TODO: change this to bootstrap format date functions
        var _getFormatedDate = function (date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
        $scope.altInputFormats = ['M!/d!/yyyy'];

        $scope.datePickerFrom = {
            opened: false
        };

        $scope.datePickerTo = {
            opened: false
        };

    }]);
