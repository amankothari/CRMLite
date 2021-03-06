﻿starter.controller('TaskController', function ($cordovaDatePicker, $scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, notification, $location, $timeout, getsetService, localStorageService, $window, $ionicPopup, $rootScope, XrmServiceToolkit_Soap, $ionicPopover, $stateParams) {
    $scope.Entity = [{ entity: 'Account' }, { entity: 'Contact' }, { entity: 'Opportunity' }];
    $scope.authentication = localStorageService.get('LoggedUser');
    $scope.date = new Date();
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
    $rootScope.show('Please wait..');
    if ($scope.authentication.isvisible ==true)
    {   
        var body = [];
        body.push('<s:Body>');
        body.push('<Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">');
        body.push('<request i:type="a:RetrieveMultipleRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">');
        body.push('<a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');
        body.push('<a:KeyValuePairOfstringanyType>');
        body.push('<b:key>Query</b:key>');
        body.push('<b:value i:type="a:QueryExpression">');
        body.push('<a:ColumnSet>');
        body.push('<a:AllColumns>false</a:AllColumns>');
        body.push('<a:Columns xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
        body.push('<c:string>description</c:string>');
        body.push('<c:string>subject</c:string>');
        body.push('<c:string>scheduledend</c:string>');
        body.push('<c:string>scheduledstart</c:string>');
        body.push('<c:string>regardingobjectid</c:string>');
        body.push('<c:string>createdby</c:string>');
        body.push('<c:string>createdon</c:string>');
        body.push('<c:string>modifiedby</c:string>');
        body.push('<c:string>modifiedon</c:string>');
        body.push('<c:string>ownerid</c:string>');
        body.push('<c:string>actualdurationminutes</c:string>');
        body.push('<c:string>statecode</c:string>');
        body.push('<c:string>actualstart</c:string>');
        body.push('</a:Columns>');
        body.push('</a:ColumnSet>');
        body.push('<a:Criteria>');
        body.push('<a:Conditions />');
        body.push('<a:FilterOperator>And</a:FilterOperator>');
        body.push('<a:Filters>');
        body.push('<a:FilterExpression>');
        body.push('<a:Conditions>');
        body.push('<a:ConditionExpression>');
        body.push('<a:AttributeName>ownerid</a:AttributeName>');
        body.push('<a:Operator>Equal</a:Operator>');
        body.push('<a:Values xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
        body.push('<c:anyType i:type="d:guid" xmlns:d="http://schemas.microsoft.com/2003/10/Serialization/">' + $scope.authentication.SystemUser + '</c:anyType>');
        body.push('</a:Values>');
        body.push('</a:ConditionExpression>');
        body.push('<a:ConditionExpression>');
        body.push('<a:AttributeName>statecode</a:AttributeName>');
        body.push('<a:Operator>Equal</a:Operator>');
        body.push('<a:Values xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
        body.push('<c:anyType i:type="d:int" xmlns:d="http://www.w3.org/2001/XMLSchema">0</c:anyType>');
        body.push('</a:Values>');
        body.push('</a:ConditionExpression>');
        body.push('</a:Conditions>');
        body.push('<a:FilterOperator>And</a:FilterOperator>');
        body.push('<a:Filters />');
        body.push('</a:FilterExpression>');
        body.push('</a:Filters>');
        body.push('</a:Criteria>');
        body.push('<a:Distinct>false</a:Distinct>');
        body.push('<a:EntityName>task</a:EntityName>');
        body.push('<a:LinkEntities />');
        body.push('<a:Orders>');
        body.push(' <a:OrderExpression>');
        body.push('<a:AttributeName>subject</a:AttributeName>');
        body.push('<a:OrderType>Ascending</a:OrderType>');
        body.push('</a:OrderExpression>');
        body.push('</a:Orders>');
        body.push('<a:PageInfo>');
        body.push('<a:Count>0</a:Count>');
        body.push('<a:PageNumber>1</a:PageNumber>');
        body.push('<a:PagingCookie i:nil="true" />');
        body.push('<a:ReturnTotalRecordCount>false</a:ReturnTotalRecordCount>');
        body.push('</a:PageInfo>');
        body.push('<a:NoLock>false</a:NoLock>');
        body.push('</b:value>');
        body.push('</a:KeyValuePairOfstringanyType>');
        body.push('</a:Parameters>');
        body.push('<a:RequestId i:nil="true" />');
        body.push('<a:RequestName>RetrieveMultiple</a:RequestName>');
        body.push('</request>');
        body.push('</Execute>');
        body.push('</s:Body>');
        var xml = [];
        xml.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing">');
        xml.push($scope.authentication.header);
        xml.push(body.join(''));
        xml.push('</s:Envelope>');
        var request = xml.join('');
        var req = new XMLHttpRequest();
        req.open('POST', $scope.authentication.url + 'XRMServices/2011/Organization.svc', true);
        req.setRequestHeader('Content-Type', 'application/soap+xml; charset=utf-8');
        req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                CrmTaskEntity(req.response);
            }
           else if (req.status === 500) {
               $scope.showAlert();
            }
        }
    };
    req.send(request);
    /// <summary>
        /// Retreive xml  data .
        /// </summary>
    function CrmTaskEntity(response) {
        var data = $(response).find('b\\:entity').find('b\\:attributes').each(function (k, i) { $(i).find('b\\:Keyvaluepairofstringanytype') });
        $scope.arrey = [];
        $rootScope.hide();
        for (var i = 0; i < data.length; i++) {
            var newobj = {
                "ownerid": "", "modifiedby": "", "createdby": "", "regardingobjectid": "", "createdon": "", "modifiedon": "", "activityid": "",
                "subject": "", "scheduledend": "", "scheduledstart": "", "description": "", "actualstart": "", "statecode": "", "actualdurationminutes": "", "logicalname": ""
            };
            var a = $($(data[i]).each(function (k, p) { $(p).find('b\\:keyvaluepairofstringanytype') }).context.childNodes).each(function (a, b) { $(b).find('c\\:key') });
            for (var j = 0; j < a.length; j++) {
                if (a[j].childNodes[0].innerText == "ownerid") { newobj.ownerid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "modifiedby") { newobj.modifiedby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "createdby") { newobj.createdby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "regardingobjectid") {
                    newobj.regardingobjectid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML;
                    newobj.logicalname = $(a[j].childNodes[1]).find('b\\:logicalname')[0].innerHTML
                }
                if (a[j].childNodes[0].innerText == "subject") { newobj.subject = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "scheduledend") { newobj.scheduledend = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "scheduledstart") { newobj.scheduledstart = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "description") { newobj.description = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "createdon") { newobj.createdon = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "modifiedon") { newobj.modifiedon = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "actualstart") { newobj.actualstart = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "statecode") { newobj.statecode = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "actualdurationminutes") { newobj.actualdurationminutes = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "activityid") { newobj.activityid = a[j].childNodes[1].innerHTML }
            }
            if (newobj.subject != "")
            { $scope.arrey.push(newobj); }
        }
    }
    }
    else{
        $scope.showAlert();
    }
    $scope.Details = function (data) {
        $rootScope.show('Please wait...');
        getsetService.reset();
        getsetService.Setdata(data);
        $window.location.href = ('#/app/task-details');
        $timeout(function () {
            $rootScope.hide();
        }, 1000);
    }
    $scope.doRefresh = function () {
        if ($scope.authentication.isvisible == true) {
            var body = [];
            body.push('<s:Body>');
            body.push('<Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">');
            body.push('<request i:type="a:RetrieveMultipleRequest" xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">');
            body.push('<a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');
            body.push('<a:KeyValuePairOfstringanyType>');
            body.push('<b:key>Query</b:key>');
            body.push('<b:value i:type="a:QueryExpression">');
            body.push('<a:ColumnSet>');
            body.push('<a:AllColumns>false</a:AllColumns>');
            body.push('<a:Columns xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
            body.push('<c:string>description</c:string>');
            body.push('<c:string>subject</c:string>');
            body.push('<c:string>scheduledend</c:string>');
            body.push('<c:string>scheduledstart</c:string>');
            body.push('<c:string>regardingobjectid</c:string>');
            body.push('<c:string>createdby</c:string>');
            body.push('<c:string>createdon</c:string>');
            body.push('<c:string>modifiedby</c:string>');
            body.push('<c:string>modifiedon</c:string>');
            body.push('<c:string>ownerid</c:string>');
            body.push('<c:string>actualdurationminutes</c:string>');
            body.push('<c:string>statecode</c:string>');
            body.push('<c:string>actualstart</c:string>');
            body.push('</a:Columns>');
            body.push('</a:ColumnSet>');
            body.push('<a:Criteria>');
            body.push('<a:Conditions />');
            body.push('<a:FilterOperator>And</a:FilterOperator>');
            body.push('<a:Filters>');
            body.push('<a:FilterExpression>');
            body.push('<a:Conditions>');
            body.push('<a:ConditionExpression>');
            body.push('<a:AttributeName>ownerid</a:AttributeName>');
            body.push('<a:Operator>Equal</a:Operator>');
            body.push('<a:Values xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
            body.push('<c:anyType i:type="d:guid" xmlns:d="http://schemas.microsoft.com/2003/10/Serialization/">' + $scope.authentication.SystemUser + '</c:anyType>');
            body.push('</a:Values>');
            body.push('</a:ConditionExpression>');
            body.push('<a:ConditionExpression>');
            body.push('<a:AttributeName>statecode</a:AttributeName>');
            body.push('<a:Operator>Equal</a:Operator>');
            body.push('<a:Values xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
            body.push('<c:anyType i:type="d:int" xmlns:d="http://www.w3.org/2001/XMLSchema">0</c:anyType>');
            body.push('</a:Values>');
            body.push('</a:ConditionExpression>');
            body.push('</a:Conditions>');
            body.push('<a:FilterOperator>And</a:FilterOperator>');
            body.push('<a:Filters />');
            body.push('</a:FilterExpression>');
            body.push('</a:Filters>');
            body.push('</a:Criteria>');
            body.push('<a:Distinct>false</a:Distinct>');
            body.push('<a:EntityName>task</a:EntityName>');
            body.push('<a:LinkEntities />');
            body.push('<a:Orders>');
            body.push(' <a:OrderExpression>');
            body.push('<a:AttributeName>subject</a:AttributeName>');
            body.push('<a:OrderType>Ascending</a:OrderType>');
            body.push('</a:OrderExpression>');
            body.push('</a:Orders>');
            body.push('<a:PageInfo>');
            body.push('<a:Count>0</a:Count>');
            body.push('<a:PageNumber>1</a:PageNumber>');
            body.push('<a:PagingCookie i:nil="true" />');
            body.push('<a:ReturnTotalRecordCount>false</a:ReturnTotalRecordCount>');
            body.push('</a:PageInfo>');
            body.push('<a:NoLock>false</a:NoLock>');
            body.push('</b:value>');
            body.push('</a:KeyValuePairOfstringanyType>');
            body.push('</a:Parameters>');
            body.push('<a:RequestId i:nil="true" />');
            body.push('<a:RequestName>RetrieveMultiple</a:RequestName>');
            body.push('</request>');
            body.push('</Execute>');
            body.push('</s:Body>');
            var xml = [];
            xml.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing">');
            xml.push($scope.authentication.header);
            xml.push(body.join(''));
            xml.push('</s:Envelope>');
            var request = xml.join('');
            var req = new XMLHttpRequest();
            req.open('POST', $scope.authentication.url + 'XRMServices/2011/Organization.svc', true);
            req.setRequestHeader('Content-Type', 'application/soap+xml; charset=utf-8');
            req.onreadystatechange = function () {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        CrmTaskEntity(req.response);
                    }
                    else if (req.status === 500) {
                        $scope.showAlert();
                    }
                }
            };
            req.send(request);
            /// <summary>
            /// Retreive xml  data .
            /// </summary>
            function CrmTaskEntity(response) {
                var data = $(response).find('b\\:entity').find('b\\:attributes').each(function (k, i) { $(i).find('b\\:Keyvaluepairofstringanytype') });
                $scope.arrey = [];
                for (var i = 0; i < data.length; i++) {
                    var newobj = {
                        "ownerid": "", "modifiedby": "", "createdby": "", "regardingobjectid": "", "createdon": "", "modifiedon": "", "activityid": "",
                        "subject": "", "scheduledend": "", "scheduledstart": "", "description": "", "actualstart": "", "statecode": "", "actualdurationminutes": "", "logicalname": ""
                    };
                    var a = $($(data[i]).each(function (k, p) { $(p).find('b\\:keyvaluepairofstringanytype') }).context.childNodes).each(function (a, b) { $(b).find('c\\:key') });
                    for (var j = 0; j < a.length; j++) {
                        if (a[j].childNodes[0].innerText == "ownerid") { newobj.ownerid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                        if (a[j].childNodes[0].innerText == "modifiedby") { newobj.modifiedby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                        if (a[j].childNodes[0].innerText == "createdby") { newobj.createdby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                        if (a[j].childNodes[0].innerText == "regardingobjectid") {
                            newobj.regardingobjectid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML;
                            newobj.logicalname = $(a[j].childNodes[1]).find('b\\:logicalname')[0].innerHTML
                        }
                        if (a[j].childNodes[0].innerText == "subject") { newobj.subject = a[j].childNodes[1].innerHTML }
                        if (a[j].childNodes[0].innerText == "scheduledend") { newobj.scheduledend = a[j].childNodes[1].innerHTML }
                        if (a[j].childNodes[0].innerText == "scheduledstart") { newobj.scheduledstart = a[j].childNodes[1].innerHTML }
                        if (a[j].childNodes[0].innerText == "description") { newobj.description = a[j].childNodes[1].innerHTML }
                        if (a[j].childNodes[0].innerText == "createdon") { newobj.createdon = a[j].childNodes[1].innerHTML }
                        if (a[j].childNodes[0].innerText == "modifiedon") { newobj.modifiedon = a[j].childNodes[1].innerHTML }
                        if (a[j].childNodes[0].innerText == "actualstart") { newobj.actualstart = a[j].childNodes[1].innerHTML }
                        if (a[j].childNodes[0].innerText == "statecode") { newobj.statecode = a[j].childNodes[1].innerText }
                        if (a[j].childNodes[0].innerText == "actualdurationminutes") { newobj.actualdurationminutes = a[j].childNodes[1].innerHTML }
                        if (a[j].childNodes[0].innerText == "activityid") { newobj.activityid = a[j].childNodes[1].innerHTML }
                    }
                    if (newobj.subject != "")
                    { $scope.arrey.push(newobj); }

                }
                $scope.$broadcast('scroll.refreshComplete');
            }
        }

        else {
            $scope.$broadcast('scroll.refreshComplete');
        }
    }
  
    ///Add 
    $scope.Gotoaddtask = function () {
        getsetService.reset();
        $window.location.href = ('#/app/addtask');
    }
    /// <summary>      
    /// <returns>Add Account.</returns>
    $scope.taskData = [];
    $scope.$on('$ionicView.enter', function () {
        debugger;
        $scope.taskData = getsetService.Getdata(4212);
    })
    $scope.Save = function (taskData) {
        $scope.taskData = taskData;
        //$rootScope.show('Adding Records...');
        AddTask();
    }
    function AddTask() {
        if ($scope.taskData.activityid != undefined) {
            $rootScope.show('Updating Record...');
            var createContact = new XrmServiceToolkit_Soap.BusinessEntity("task", $scope.taskData.activityid); createupdate(); var CreateContacts = XrmServiceToolkit_Soap.Update(createContact);
            $timeout(function () {
                $rootScope.hide(); $scope.Dataadded();
                $window.location.href = ('#/app/task/');
            }, 1000);
        } else {
            $rootScope.show('Adding Records...');
            var createContact = new XrmServiceToolkit_Soap.BusinessEntity("task"); createupdate();
            var CreateContacts = XrmServiceToolkit_Soap.Create(createContact);
            $timeout(function () {
                $rootScope.hide(); $scope.Dataadded();
                $window.location.href = ('#/app/task/');
            }, 1000);
        }
        function createupdate() { 
            createContact.attributes["subject"] = $scope.taskData.subject;
            createContact.attributes["description"] = $scope.taskData.description;
            $scope.taskData.regardingobjectid ? createContact.attributes["regardingobjectid"] = { id: $scope.taskData.regarding.regardingobjectid, logicalName: $scope.senddata, type: "EntityReference" } : ""
            $scope.taskData.scheduledend?createContact.attributes["scheduledend"] = { value: $scope.taskData.scheduledend, type: "datetime" }:""        
            $scope.taskData.actualdurationminutes?createContact.attributes["actualdurationminutes"] = parseInt($scope.taskData.actualdurationminutes):""
    }
   
        //$rootScope.hide();
        //$scope.Dataadded();$scope.taskData.actualdurationminutes;$scope.taskData.scheduledend;
    }
    /// <summary>      
    /// <returns>SOAP response.</returns>
    $scope.Dataadded = function () {
        $rootScope.hide();
        var alertPopup = $ionicPopup.alert({
            title: 'alert!',
            template: 'Record added succesfully'
        });
        $timeout(function () {
            alertPopup.close();
        }, 100000);
    };
    /// <summary>      
    /// <returns>Open Pop Up Window.</returns>
    $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
    }).then(function (popover) {
        $scope.popover = popover;
    });
    $scope.fetchaccounttask = function (entity, $event,type) {
        if (entity == "Account") { $scope.senddata = "account" } else if (entity == "Contact") { $scope.senddata = "contact" } else if (entity == "Opportunity") { $scope.senddata = "opportunity" }
        $scope.popover.hide($event);
        $window.location.href = ('#/app/' + $scope.senddata + '/4212{' + type);
    }
   
})