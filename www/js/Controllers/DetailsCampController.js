starter.controller('DetailsCampCotroller', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService) {
    $scope.singlecampign = getsetService.Getdata();
});