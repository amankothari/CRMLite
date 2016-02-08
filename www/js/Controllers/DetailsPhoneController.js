starter.controller('DetailsPhoneController', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService) {
    $scope.singlephone = getsetService.Getdata();
});