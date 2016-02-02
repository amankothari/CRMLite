starter.controller('DetailsIncController', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService) {   
    $scope.singlecase = getsetService.Getdata();  
});