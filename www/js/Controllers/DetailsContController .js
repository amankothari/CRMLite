starter.controller('DetailsContController', function ($compile, $scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService, $cordovaInAppBrowser) {
    $scope.singleContact = getsetService.Getdata();

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(22.71957, 75.85773),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var marker;
    marker = new google.maps.Marker({
        map: map,
        zoom: 12,
        title: $scope.singleContact.Name
    });
    marker.setMap(map);
    moveMarker(map, marker);
    function moveMarker(map, marker) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: $scope.singleContact.address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                setTimeout(function () {
                    marker.setPosition(results[0].geometry.location);
                    map.panTo(results[0].geometry.location);
                }, 500);
            }
            else {
                geocoder.geocode({
                    address: $scope.singleContact.city
                }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        setTimeout(function () {
                            marker.setPosition(results[0].geometry.location);
                            map.panTo(results[0].geometry.location);
                        }, 500);
                    }
                });
            }

        });

        //var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        //var compiled = $compile(contentString)($scope);

        //var infowindow = new google.maps.InfoWindow({
        //    content: compiled[0]
        //});

        //console.log(marker);
        //google.maps.event.addListener(marker, 'click', function () {
        //    infowindow.open(map, marker);
        //});

    };
});


