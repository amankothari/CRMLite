starter.controller('DetailsLeadController', function ($compile, $scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService) {
    $scope.singlelead = getsetService.Getdata();
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: new google.maps.LatLng(22.71957, 75.85773),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    var infowindow = new google.maps.InfoWindow();
    var marker;
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(22.71957, 75.85773),
        map: map,
        zoom: 12,
        title: $scope.singlelead.fullname
    });
    marker.setMap(map);
    moveMarker(map, marker);
    function moveMarker(map, marker) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: $scope.singlelead.address1_city
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                setTimeout(function () {
                    marker.setPosition(results[0].geometry.location);
                    map.panTo(results[0].geometry.location);
                }, 500);
            }
            else {
                geocoder.geocode({
                    address: $scope.singlelead.address1_city
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
        //google.maps.event.addListener(marker, 'click', function () {
        //    infowindow.setContent('<div><strong>' + $scope.singlelead.address1_composite + '</strong><br>' +
        //    'Lead Name ' + $scope.singlelead.fullname + '<br> </div>');
        //    infowindow.open(marker, this);
        //});
    };
});