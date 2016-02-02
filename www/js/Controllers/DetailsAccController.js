starter.controller('DetailsAccCotroller', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService, $compile) {
    $scope.singleuser = getsetService.Getdata();



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
        title: $scope.singleuser.Name
    });
    marker.setMap(map);
    moveMarker(map, marker);
    function moveMarker(map, marker) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: $scope.singleuser.address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                setTimeout(function () {
                    marker.setPosition(results[0].geometry.location);
                    map.panTo(results[0].geometry.location);
                }, 500);
            }
            else {
                geocoder.geocode({
                    address: $scope.singleuser.city
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




     //   var contentString = '<div id="content">' +
     //'<div id="siteNotice">' +
     //'</div>' +
     //'<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
     //'<div id="bodyContent">' +
     //'<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
     //'sandstone rock formation in the southern part of the ' +
     //'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
     //'south west of the nearest large town, Alice Springs; 450&#160;km ' +
     //'(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
     //'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
     //'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
     //'Aboriginal people of the area. It has many springs, waterholes, ' +
     //'rock caves and ancient paintings. Uluru is listed as a World ' +
     //'Heritage Site.</p>' +
     //'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
     //'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
     //'(last visited June 22, 2009).</p>' +
     //'</div>' +
     //'</div>';

     //   var infowindow = new google.maps.InfoWindow({
     //       content: contentString
     //   });

     //       marker.addListener('click', function () {
     //           infowindow.open(map, marker);
     //   });
    };
});