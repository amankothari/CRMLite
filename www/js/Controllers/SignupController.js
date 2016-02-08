
starter.controller('SignupController', function ($ionicPopup, $http, $scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService, $window, $ionicPopup, $ionicPopover, $rootScope) {
    $scope.open = function () {
        $window.location.href = ('#/app/landing');
    }
    $scope.showAlert = function () {
        $rootScope.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'attention!',
            template: 'Internal server error please try after some time...'
        });
        alertPopup.then(function (res) {
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
        try{
            if (loginData.customername != undefined && loginData.email != undefined && loginData.mobile != undefined) {
                $rootScope.show('please wait...');
                $scope.UserSession = {
                    "customername": loginData.customername,
                    "email": loginData.email,
                    "mobile": loginData.mobile,
                    "Active": '0'
                };
                $http.post('http://crmapp-store.com/api/crm', $scope.UserSession)
                getsetService.Setdata($scope.UserSession);
                $timeout(function ()
                {                  
                    $rootScope.hide();
                    $window.location.href = ('#/app/signin');
                }, 4000);
            }
        }
        catch(error)
        {
            $rootScope.hide();
            $scope.showAlert();
        }
        finally {
            //$rootScope.hide();
        }
    }
})