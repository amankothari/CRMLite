starter.controller('DetailsTaskController', function ($rootScope, $ionicPopup, $window, XrmServiceToolkit_Soap, $scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService) {
    $scope.singletask = getsetService.Getdata();
    /// <summary>      
    /// <returns>Edit Account.</returns>
    $scope.Edit = function (editData) {
        var cols = ["subject", "scheduledend", "regardingobjectid", "description", "actualdurationminutes"];
        var retrievedContact = XrmServiceToolkit_Soap.Retrieve("task", editData, cols);
        $scope.format = {
            "subject": retrievedContact.attributes.subject == undefined ? undefined : retrievedContact.attributes.subject.value,
            "scheduledend": retrievedContact.attributes.scheduledend == undefined ? undefined : retrievedContact.attributes.scheduledend.value,
            "regardingobjectid": retrievedContact.attributes.regardingobjectid == undefined ? undefined : retrievedContact.attributes.regardingobjectid.id,
            "regardingobjectname": retrievedContact.attributes.regardingobjectid == undefined ? undefined : retrievedContact.attributes.regardingobjectid.name,
            "description": retrievedContact.attributes.description == undefined ? undefined : retrievedContact.attributes.description.value,
            "actualdurationminutes": retrievedContact.attributes.actualdurationminutes == undefined ? undefined : retrievedContact.attributes.actualdurationminutes.value,
            "activityid": editData
        }
        getsetService.reset();
        getsetService.Setdata($scope.format);
        $window.location.href = ('#/app/addtask');
    }
    $scope.Completed = function (statcode) {
        $rootScope.show('Updating Record...');  
        var createContact = new XrmServiceToolkit_Soap.BusinessEntity("task", statcode);
        createContact.attributes["statecode"] = { value: 1, type: "OptionSetValue" };
        var CreateContacts = XrmServiceToolkit_Soap.Update(createContact);
        $rootScope.hide(); $scope.Dataadded();
        $window.location.href = ('#/app/task/');
    }      
    $scope.Dataadded = function () {
        $rootScope.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'alert!',
            template: 'Task Updated succesfully'
        });
        $timeout(function () {
            alertPopup.close();
        }, 100000);
    };
});