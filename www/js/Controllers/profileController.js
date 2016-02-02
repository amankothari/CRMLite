starter.controller('profileController', function ($scope, CustomerService, $ionicPopup, $window, localStorageService, $rootScope, notification, $location) {

    $scope.Profile = {};

    //This method is used for initilization the customer profile data
    $scope.initilizationProfile = function () {
        $rootScope.show("Loading...");
        var getProfileData = CustomerService.CustomerProfile(localStorageService.get('LoggedUser').userId).then(function (result) {
            console.log(result);
            $rootScope.hide();
            $scope.Profile.Email = result.EmailAddress1;
            $scope.Profile.HomeCellNo = result.HomeContactNo;
            $scope.Profile.OrignalEmailAddress = result.EmailAddress1;
        }, function (errr) {
            try {
                $rootScope.notify(JSON.stringify(errr));
            } catch (e) {
                
            }
            finally {
                $rootScope.hide();
            }
        })
    }

    //this method is used for update the customer profile data

    $scope.updateProfile = function (Profile) {
        console.log("Update Profile Method is calling");
        console.log(Profile);
        $rootScope.show("updating..");
        var getUpdateRespond = CustomerService.updateProfile(Profile, localStorageService.get('LoggedUser').userId).then(function (result) {
            $rootScope.hide();
            console.log("Successfully Updated in controller");
            console.log(result);
            if (result == "Successfully") {
                //var alertPopup = $ionicPopup.alert({
                //    title: 'Message',
                //    template: 'Updated Successfully'
                //});
                //alertPopup.then(function (res) {
                //    $window.location.href = ('#/app/home');
                //    $window.location.reload();
                //});
               
                $rootScope.notify("Updated Successfully");
                $location.path('/app/home');
            }
        }, function (errr) {
            try {
                $rootScope.notify("EMail Id already Exist. Not Updated!!");
            } catch (e) {
               
            }
            finally {
                $rootScope.hide();
            }
        })
    }



    $scope.updateProfile1 = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Message',
            template: 'Updated Successfully'
        });
        alertPopup.then(function (res) {
            $window.location.href = ('#/app/home');
            $window.location.reload();
        });
    };

})
