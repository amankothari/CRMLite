starter.controller('TimeLineController', function (getsetDashboard,$rootScope, $scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, notification, $location, $timeout, getsetService, authService, localStorageService, $window, $ionicPopup, XrmServiceToolkit_Soap) {
    $scope.authentication = localStorageService.get('LoggedUser');
    $scope.showAlert = function () {
        $rootScope.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'attention!',
            template: 'Token expire Log in again'
        });
        alertPopup.then(function (res) {
            $scope.Session = {
                "url": $scope.authentication.url, "username": $scope.authentication.username, "password": $scope.authentication.password, "customername": $scope.authentication.customername, "email": $scope.authentication.email, "mobile": $scope.authentication.mobile, "Active": $scope.authentication.Active, "rememberme": true
            };
            localStorageService.remove('LoggedUser');
            localStorageService.set('LoggedUser', $scope.Session);
            $window.location.href = ('#/app/signin');
            $rootScope.hide();
        });
        $timeout(function () {
            alertPopup.close();
        }, 3000);
    };
    var pagecount = 1;
    $scope.Data = [];
    try {
        if ($scope.authentication.isvisible == true) {
            $rootScope.show('Please wait..');
            Personalwall();
        }
        else {
            $scope.showAlert();
        }
        function Personalwall() {
            var strVar = "";
            strVar += " <request xmlns:a=\"http:\/\/schemas.microsoft.com\/xrm\/2011\/Contracts\" xmlns:i=\"http:\/\/www.w3.org\/2001\/XMLSchema-instance\" i:type=\"a:OrganizationRequest\">";
            strVar += "            <a:Parameters xmlns:b=\"http:\/\/schemas.datacontract.org\/2004\/07\/System.Collections.Generic\">";
            strVar += "               <a:KeyValuePairOfstringanyType>";
            strVar += "                  <b:key>PageSize<\/b:key>";
            strVar += "                  <b:value xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\" i:type=\"d:int\">20<\/b:value>";
            strVar += "               <\/a:KeyValuePairOfstringanyType>";
            strVar += "               <a:KeyValuePairOfstringanyType>";
            strVar += "                  <b:key>PageNumber<\/b:key>";
            strVar += "                  <b:value xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\" i:type=\"d:int\">"+pagecount+"<\/b:value>";
            strVar += "               <\/a:KeyValuePairOfstringanyType>";
            strVar += "               <a:KeyValuePairOfstringanyType>";
            strVar += "                  <b:key>CommentsPerPost<\/b:key>";
            strVar += "                  <b:value xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\" i:type=\"d:int\">5<\/b:value>";
            strVar += "               <\/a:KeyValuePairOfstringanyType>";
            strVar += "            <\/a:Parameters>";
            strVar += "            <a:RequestId i:nil=\"true\" \/>";
            strVar += "            <a:RequestName>RetrievePersonalWall<\/a:RequestName>";
            strVar += "         <\/request>";
            $scope.Data = XrmServiceToolkit_Soap.Execute(strVar, true);
            console.log($scope.Data);
            $timeout(function () {
                $rootScope.hide();
            }, 2000);
        }
        
    } catch (error)
    { $rootScope.hide(); }
    finally {
    }
    $scope.Refresh = function () {
        $rootScope.show('Refreshing..');
        pagecount = 1;
        Personalwall();
    }
    $scope.loadMore = function () {
        $timeout(function () {
          pagecount = pagecount + 1;
          Personalwall();
        }, 1000);
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    $scope.$on('$stateChangeSuccess', function () {
        //$scope.loadMore();
    });
})