
starter.controller('SignupController', function ($ionicPopup, $http, $scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService, $window, $ionicPopup, $ionicPopover, $rootScope) {
    $scope.open = function () {
        $window.location.href = ('#/app/landing');
    }

    $scope.showAlert = function () {
        $rootScope.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'attention!',
            template: 'Please enter your Credentials .'
        });
        alertPopup.then(function (res) {
            $window.location.href = ('#/app/signin');
            $rootScope.hide();
        });
        $timeout(function () {
            alertPopup.close();
        }, 3000);
    };

    //$ionicPopover.fromTemplateUrl('templates/popover.html', {
    //    scope: $scope,
    //}).then(function (popover) {     
    //    $scope.popover = popover;      
    //});

    //$scope.openPopover = function ($event) {
    //    $scope.buttonhide = false;
    //    $scope.popover.show($event);
    //};
    //$scope.next = function () {
    //    $ionicSlideBoxDelegate.next();
    //};
    //$scope.previous = function () {
    //    $ionicSlideBoxDelegate.previous();
    //};

    //// Called each time the slide changes
    //$scope.slideChanged = function (index) {
    //    $scope.slideIndex = index;
    //};

    $scope.Login = function (loginData) {
        if (loginData.customername != undefined && loginData.email != undefined && loginData.mobile != undefined) {
            $rootScope.show('Waiting for connection');
            $scope.UserSession = { 
                "customername": loginData.customername,
                "email": loginData.email,
                "mobile": loginData.mobile,              
                "Active":'0'
            };
            //$http.post('http://easycrm.webfortis.in/api/crm', $scope.UserSession).then(function (successData) {
                    //if (successData.status == 200) {                       
                        getsetService.Setdata($scope.UserSession);
                        $rootScope.hide();
                        $window.location.href = ('#/app/signin');
                //    }                      
                //    else {          
                //        $rootScope.hide();
                //        $scope.showAlert();
                //    }
                //})
            }
    }
})