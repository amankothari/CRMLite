starter.controller('LeadController', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $stateParams,$ionicHistory, TimesheetService, notification, $location, $timeout, getsetService, authService, localStorageService, $window, $ionicPopup, $rootScope, XrmServiceToolkit_Soap) {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    $scope.addl = "Add Lead";
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
    $rootScope.show('Please wait..');
    if ($scope.authentication.isvisible == true) {
        LeadRequest();
    }
    else {
        $scope.showAlert();
    }  
    /// <summary>
        /// Executes the SOAP Response.
        /// </summary>  
    function LeadRequest() {
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
        body.push('<c:string>address1_composite</c:string>');
        body.push('<c:string>address1_city</c:string>');
        body.push('<c:string>companyname</c:string>');
        body.push('<c:string>campaignid</c:string>');
        body.push('<c:string>createdon</c:string>');
        body.push('<c:string>description</c:string>');
        body.push('<c:string>emailaddress1</c:string>');
        body.push('<c:string>fullname</c:string>');
        body.push('<c:string>jobtitle</c:string>');
        body.push('<c:string>leadid</c:string>');
        body.push('<c:string>modifiedby</c:string>');
        body.push('<c:string>modifiedon</c:string>');
        body.push('<c:string>numberofemployees</c:string>');
        body.push('<c:string>ownerid</c:string>');
        body.push('<c:string>subject</c:string>');
        body.push('<c:string>telephone1</c:string>');
        body.push('<c:string>websiteurl</c:string>');
        body.push('<c:string>mobilephone</c:string>');
        body.push('<c:string>revenue</c:string>');
        body.push('<c:string>transactioncurrencyid</c:string>');
        body.push('<c:string>statecode</c:string>');
        body.push('<c:string>budgetamount</c:string>');
        body.push('</a:Columns>');
        body.push('</a:ColumnSet>');
        body.push('<a:Criteria>');
        body.push('<a:Conditions>');
        body.push('<a:ConditionExpression>');
        body.push('<a:AttributeName>ownerid</a:AttributeName>');
        body.push('<a:Operator>Equal</a:Operator>');
        body.push('<a:Values xmlns:c="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
        body.push('<c:anyType i:type="d:guid" xmlns:d="http://schemas.microsoft.com/2003/10/Serialization/">' + $scope.authentication.SystemUser + '</c:anyType>');
        body.push('</a:Values>');
        body.push('</a:ConditionExpression>');
        body.push('</a:Conditions>');
        body.push('<a:FilterOperator>And</a:FilterOperator>');
        body.push('<a:Filters />');
        body.push('</a:Criteria>');
        body.push('<a:Distinct>false</a:Distinct>');
        body.push('<a:EntityName>lead</a:EntityName>');
        body.push('<a:LinkEntities />');
        body.push('<a:Orders />');
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
                    CrmLeadEntity(req.response);
                }
                else if (req.status === 500) {
                    $scope.showAlert();
                }
            }
        };
        req.send(request);
    }
    /// <summary>
    /// Executes the SOAP Response.
    /// </summary>  
    function CrmLeadEntity(response) {
        var data = $(response).find('b\\:entity').find('b\\:attributes').each(function (k, i) { $(i).find('b\\:Keyvaluepairofstringanytype') });
        $scope.arrey = [];
        //$scope.leadload = false;      
        for (var i = 0; i < data.length; i++) {
            var newobj = {
                "campaignid": "", "ownerid": "", "modifiedby": "", "transactioncurrencyid": "", "createdby": "", "telephone1": "",
                "websiteurl": "", "revenue": "", "leadid": "", "subject": "", "numberofemployees": "", "address1_city": "", "address1_composite": "",
                "jobtitle": "", "createdon": "", "fullname": "", "companyname": "", "emailaddress1": "", "modifiedon": "", "mobilephone": "", "description": "", "statecode": "", "budgetamount": "", "diffDays": ""
            };
            var a = $($(data[i]).each(function (k, p) { $(p).find('b\\:keyvaluepairofstringanytype') }).context.childNodes).each(function (a, b) { $(b).find('c\\:key') });
            for (var j = 0; j < a.length; j++) {
                if (a[j].childNodes[0].innerText == "campaignid") { newobj.campaignid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "ownerid") { newobj.ownerid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "modifiedby") { newobj.modifiedby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "createdby") { newobj.createdby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "transactioncurrencyid") { newobj.transactioncurrencyid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "telephone1") { newobj.telephone1 = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "websiteurl") { newobj.websiteurl = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "revenue") { newobj.revenue = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "leadid") { newobj.leadid = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "subject") { newobj.subject = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "numberofemployees") { newobj.numberofemployees = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "address1_city") { newobj.address1_city = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "address1_composite") { newobj.address1_composite = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "jobtitle") { newobj.jobtitle = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "createdon") {
                    newobj.createdon = a[j].childNodes[1].innerHTML;
                    var firstDate = new Date();
                    var secondDate = new Date(newobj.createdon);
                    newobj.diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
                }
                if (a[j].childNodes[0].innerText == "fullname") { newobj.fullname = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "companyname") { newobj.companyname = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "emailaddress1") { newobj.emailaddress1 = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "mobilephone") { newobj.mobilephone = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "description") { newobj.description = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "statecode") { newobj.statecode = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "budgetamount") { newobj.budgetamount = a[j].childNodes[1].innerText }

            }
            if (newobj.fullname != "")
            { $scope.arrey.push(newobj); }
           
        }
        $timeout(function () {
            $rootScope.hide();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    $scope.Details = function (data) {
        if ($stateParams.type.split('{').length == 2 && $stateParams.type.split('{')[1] == 'regarding' && $stateParams.type.split('{')[0] == "4210") {
            var json = { "regardingobjectid": data.leadid, "regardingobjectname": data.fullname , "logicalname": "lead"};
            getsetService.Setregardingfor4210(json);
            $window.location.href = ('#/app/addphonecall');
        }
        else if ($stateParams.type.split('{').length == 2 && $stateParams.type.split('{')[1] == 'from' && $stateParams.type.split('{')[0] == "4210") {
            var json = { "fromid": data.leadid, "from": data.fullname, "logicalname": "lead" };
            getsetService.Setfromfor4210(json);
            $window.location.href = ('#/app/addphonecall');
        }
        else if ($stateParams.type.split('{').length == 2 && $stateParams.type.split('{')[1] == 'to' && $stateParams.type.split('{')[0] == "4210") {
            var json = { "toid": data.leadid, "to": data.fullname, "logicalname": "lead" };
            getsetService.Settofor4210(json);
            $window.location.href = ('#/app/addphonecall');
        } else {
            getsetService.reset();
            getsetService.Setdata(data);
            $window.location.href = ('#/app/lead-details');
        }
    }
    $scope.doRefresh = function () {
        if ($scope.authentication.isvisible == true) {
            LeadRequest();
           
        }
        else {
            $scope.$broadcast('scroll.refreshComplete');
        }
    }

    $scope.Filter = function (search) {
        pagecount = 0; count = 0;
        $scope.filterdata = search;
        RequestAccount(true);
        $scope.Showdata = false;
    }
    $scope.Gotoaddlead = function () {
        getsetService.reset();
        $window.location.href = ('#/app/addleads');
    }
    /// <summary>      
    /// <returns>Add Account.</returns>
    $scope.leadData = [];
    $scope.leadData = getsetService.Getdata();
    $scope.Save = function (leadData) {
        $rootScope.hide();
        AddLead();
    }
    function AddLead() {
        if ($scope.leadData.leadid != undefined) {
            var createContact = new XrmServiceToolkit_Soap.BusinessEntity("lead", $scope.leadData.leadid);
            $rootScope.show('Updating Record...');
            createupdate();
            var CreateContacts = XrmServiceToolkit_Soap.Update(createContact);
            $timeout(function () {
                $rootScope.hide(); $scope.Dataadded(); $window.location.href = ('#/app/lead/');
            }, 1000);
        } else {
            var createContact = new XrmServiceToolkit_Soap.BusinessEntity("lead");
            $rootScope.show('Adding Record...');
            createupdate();
            var CreateContacts = XrmServiceToolkit_Soap.Create(createContact);
            $timeout(function () {
                $rootScope.hide(); $scope.Dataadded(); $window.location.href = ('#/app/lead/');
            }, 1000);
        }
        function createupdate() {
            createContact.attributes["firstname"] = $scope.leadData.firstname;
            createContact.attributes["lastname"] = $scope.leadData.lastname;
            createContact.attributes["mobilephone"] = $scope.leadData.mobilephone;
            createContact.attributes["telephone1"] = $scope.leadData.telephone1;
            createContact.attributes["emailaddress1"] = $scope.leadData.emailaddress1;
            createContact.attributes["companyname"] = $scope.leadData.companyname;
            createContact.attributes["subject"] = $scope.leadData.subject;
            createContact.attributes["jobtitle"] = $scope.leadData.jobtitle;
            createContact.attributes["websiteurl"] = $scope.leadData.websiteurl;
            $scope.leadData.leadqualitycode ? createContact.attributes["leadqualitycode"] = { value: $scope.leadData.leadqualitycode, type: "OptionSetValue" } : ""
            $scope.leadData.revenue ? createContact.attributes["revenue"] = { value: $scope.leadData.revenue, type: "Money" } : ""
            $scope.leadData.estimatedclosedate ? createContact.attributes["estimatedclosedate"] = { value: $scope.leadData.estimatedclosedate, type: "datetime" } : ""
            createContact.attributes["address1_line1"] = $scope.leadData.address1_line1;
            createContact.attributes["address1_line2"] = $scope.leadData.address1_line2;
            createContact.attributes["address1_line3"] = $scope.leadData.address1_line3;
            createContact.attributes["address1_city"] = $scope.leadData.city;
            createContact.attributes["address1_postalcode"] = $scope.leadData.address1_postalcode;
            createContact.attributes["address1_country"] = $scope.leadData.address1_country;
        }
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
    /// <returns>Edit Account.</returns>
    $scope.Edit = function (editData) {
        $scope.addl = "Edit Lead";
        $rootScope.show('Please wait...');
        var cols = ["firstname", "lastname", "jobtitle", "companyname", "subject", "revenue", "budgetamount", "leadqualitycode", "estimatedclosedate", "mobilephone", "telephone1", "websiteurl", "emailaddress1", "address1_line1", "address1_line2", "address1_line3", "address1_city", "address1_country", "address1_postalcode"];
        var retrievedContact = XrmServiceToolkit_Soap.Retrieve("lead", editData, cols);
        $scope.format = {
            "lastname": retrievedContact.attributes.lastname == undefined ? undefined : retrievedContact.attributes.lastname.value,
            "firstname": retrievedContact.attributes.firstname == undefined ? undefined : retrievedContact.attributes.firstname.value,
            "jobtitle": retrievedContact.attributes.jobtitle == undefined ? undefined : retrievedContact.attributes.jobtitle.value,
            "companyname": retrievedContact.attributes.companyname == undefined ? undefined : retrievedContact.attributes.companyname.value,
            "subject": retrievedContact.attributes.subject == undefined ? undefined : retrievedContact.attributes.subject.value,
            "revenue": retrievedContact.attributes.revenue == undefined ? undefined : retrievedContact.attributes.revenue.value,
            "estimatedclosedate": retrievedContact.attributes.estimatedclosedate == undefined ? undefined : retrievedContact.attributes.estimatedclosedate.value,
            "leadqualitycode": retrievedContact.attributes.leadqualitycode == undefined ? undefined : retrievedContact.attributes.leadqualitycode.value,
            "mobilephone": retrievedContact.attributes.mobilephone == undefined ? undefined : retrievedContact.attributes.mobilephone.value,
            "telephone1": retrievedContact.attributes.telephone1 == undefined ? undefined : retrievedContact.attributes.telephone1.value,
            "emailaddress1": retrievedContact.attributes.emailaddress1 == undefined ? undefined : retrievedContact.attributes.emailaddress1.value,
            "websiteurl": retrievedContact.attributes.websiteurl == undefined ? undefined : retrievedContact.attributes.websiteurl.value,
            "address1_line1": retrievedContact.attributes.address1_line1 == undefined ? undefined : retrievedContact.attributes.address1_line1.value,
            "address1_line2": retrievedContact.attributes.address1_line2 == undefined ? undefined : retrievedContact.attributes.address1_line2.value,
            "address1_line3": retrievedContact.attributes.address1_line3 == undefined ? undefined : retrievedContact.attributes.address1_line3.value,
            "city": retrievedContact.attributes.address1_city == undefined ? undefined : retrievedContact.attributes.address1_city.value,
            "address1_country": retrievedContact.attributes.address1_country == undefined ? undefined : retrievedContact.attributes.address1_country.value,
            "address1_postalcode": retrievedContact.attributes.address1_postalcode == undefined ? undefined : retrievedContact.attributes.address1_postalcode.value,
            "leadid": editData
        }
        getsetService.reset();
        getsetService.Setdata($scope.format);
        $window.location.href = ('#/app/addleads');
        $rootScope.hide();
    }
})