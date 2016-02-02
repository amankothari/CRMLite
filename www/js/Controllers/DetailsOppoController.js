starter.controller('DetailsOppoController', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService) {
    $scope.singlelead = getsetService.Getdata();
});