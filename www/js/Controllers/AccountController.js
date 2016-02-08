starter.controller('AccountCotroller', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, notification, $location, $timeout, getsetService, localStorageService, $window, XrmServiceToolkit_Soap, $ionicPopup, $rootScope, $stateParams) {
    $scope.adda = "Add Account";
    $scope.authentication = localStorageService.get('LoggedUser');
    $scope.arrey = []; $scope.Showdata = true; $scope.showfound = $scope.arrey.length > 0 && $scope.filter ? false : true;
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
    var pagecount = 1; var count = 20; $scope.filterdata = '';  
    var datatopush = { "PagingCookie": "", "totalrecordcountlimitexceeded": "", "morerecords": "", "totalrecord": "" };
    ///Function Init
    $scope.fire = function () {
        $rootScope.show('Please wait..');
        if ($scope.authentication.isvisible == true) {
            RequestAccount();
        } else { $scope.showAlert();}}
    ///Request
    function RequestAccount(bool) {
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
        body.push('<c:string>name</c:string>');
        body.push('<c:string>accountid</c:string>');
        body.push('<c:string>name</c:string>');
        body.push('<c:string>address1_composite</c:string>');
        body.push('<c:string>description</c:string>');
        body.push('<c:string>createdon</c:string>');
        body.push('<c:string>modifiedon</c:string>');
        body.push('<c:string>telephone1</c:string>');
        body.push('<c:string>websiteurl</c:string>');
        body.push('<c:string>emailaddress1</c:string>');
        body.push('<c:string>ownerid</c:string>');
        body.push('<c:string>createdby</c:string>');
        body.push('<c:string>modifiedby</c:string>');
        body.push('<c:string>revenue</c:string>');
        body.push('</a:Columns>');
        body.push('</a:ColumnSet>');
        body.push('<a:Criteria>');
        body.push('<a:Conditions>');
        body.push('<a:ConditionExpression>');
        body.push('<a:AttributeName>name</a:AttributeName>');
        body.push('<a:Operator>Like</a:Operator>');
        body.push('<a:Values xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
        body.push('<b:anyType i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">%'+ $scope.filterdata +'%</b:anyType>');
        body.push('</a:Values>');
        body.push('<a:EntityName i:nil="true" />');
        body.push('</a:ConditionExpression>');
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
        body.push('<a:EntityName>account</a:EntityName>');
        body.push('<a:LinkEntities />');
        body.push('<a:Orders>');
        body.push(' <a:OrderExpression>');
        body.push('<a:AttributeName>name</a:AttributeName>');
        body.push('<a:OrderType>Ascending</a:OrderType>');
        body.push('</a:OrderExpression>');
        body.push('</a:Orders>');
        body.push('<a:PageInfo>');
        body.push('<a:Count>' + count + '</a:Count>');
        body.push('<a:PageNumber>' + pagecount + '</a:PageNumber>');
        body.push('<a:PagingCookie></a:PagingCookie>');
        body.push('<a:PagingCookie>' + datatopush.PagingCookie + '</a:PagingCookie>');
        body.push('<a:ReturnTotalRecordCount>true</a:ReturnTotalRecordCount>');
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
                    CrmOneEntity(req.response,bool);
                }
                else if (req.status === 500) {
                    //$scope.showAlert();
                }
            }
        };
        req.send(request);
    }
    /// <summary>      
    /// <returns>SOAP response.</returns>
  
    function CrmOneEntity(response, bool) {
        $scope.arrey = bool ? [] : $scope.arrey;
        var data = $(response).find('b\\:entity').find('b\\:attributes').each(function (k, i) { $(i).find('b\\:Keyvaluepairofstringanytype') });
        pagecount = pagecount + 1;
        datatopush = {
            "PagingCookie": $(response).find('b\\:Keyvaluepairofstringanytype').find('b\\:pagingcookie')[0].innerText,
            "totalrecordcountlimitexceeded": $(response).find('b\\:Keyvaluepairofstringanytype').find('b\\:totalrecordcountlimitexceeded')[0].outerText,
            "morerecords": $(response).find('b\\:Keyvaluepairofstringanytype').find('b\\:morerecords')[0].outerText,
            "totalrecord": $(response).find('b\\:Keyvaluepairofstringanytype').find('b\\:TotalRecordCount')[0].innerText,
        };
        for (var i = 0; i < data.length; i++) {
            var newobj = { "ownerid": "", "modifiedby": "", "createdby": "", "Name": "", "address": "", "accountid": "", "city": "", "modifiedon": "", "email": "", "createdon": "", "websiteurl": "", "telephone1": "", "revenue": "" };
            var a = $($(data[i]).each(function (k, p) { $(p).find('b\\:keyvaluepairofstringanytype') }).context.childNodes).each(function (a, b) { $(b).find('c\\:key') });
            for (var j = 0; j < a.length; j++) {
                if (a[j].childNodes[0].innerText == "ownerid") { newobj.ownerid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "modifiedby") { newobj.modifiedby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "createdby") { newobj.createdby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "address1_city") { newobj.city = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "modifiedon") { newobj.modifiedon = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "emailaddress1") { newobj.email = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "createdon") { newobj.createdon = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "websiteurl") { newobj.websiteurl = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "telephone1") { newobj.telephone1 = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "name") { newobj.Name = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "address1_composite") { newobj.address = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "revenue") { newobj.revenue = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "accountid") { newobj.accountid = a[j].childNodes[1].innerText }
            }
            if (newobj.Name != "" && bool != true) {
                $scope.arrey.push(newobj)
            }
            else {
                $scope.arrey.push(newobj);
            }
        }
        if ($scope.arrey.length > 0) {
            $scope.Showdata = true;
        } else if ($scope.arrey.length > 0 && $scope.filterdata != null) {
            $scope.showfound = false;
        } else {
            $scope.Showdata = true;
            $scope.showfound = true;
        }

        $timeout(function () {
            $rootScope.hide();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    ///function
    $scope.loadMore = function () {    
        if (datatopush.PagingCookie != "" && datatopush.morerecords != true) {
            RequestAccount();
        }
        else {
            $scope.message = "no more record found";
            //$scope.canWeLoadMoreContent = function () {
            //    return ($scope.arrey > datatopush.totalrecord) ? false : true;
            //}
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    $scope.$on('$stateChangeSuccess', function () {
        $scope.loadMore();    
    });
    /// <summary>      
    /// <returns>Details.</returns>
    $scope.Details = function (data) {
        if ($stateParams.type) {
            if ($stateParams.type === "3") {
                var json = { "parentaccountid": data.accountid, "parentaccountname": data.Name };
                getsetService.SetAccountfor3(json);
                $window.location.href = ('#/app/addopporttunity');
            } else if ($stateParams.type === "2") {
                var json = { "parentcustomerid": data.accountid, "parentcustomername": data.Name };
                getsetService.SetAccountfor2(json);
                $window.location.href = ('#/app/addcontacts');
            } else if ($stateParams.type.split('{').length == 2 && $stateParams.type.split('{')[1] == 'regarding' && $stateParams.type.split('{')[0] == "4210") {
                var json = { "regardingobjectid": data.accountid, "regardingobjectname": data.Name, "logicalname": "account" };
                getsetService.Setregardingfor4210(json);
                $window.location.href = ('#/app/addphonecall');
            }
            else if ($stateParams.type.split('{').length == 2 && $stateParams.type.split('{')[1] == 'from' && $stateParams.type.split('{')[0] == "4210") {
                var json = { "fromid": data.accountid, "from": data.Name, "logicalname": "account" };
                getsetService.Setfromfor4210(json);
                $window.location.href = ('#/app/addphonecall');
            }
            else if ($stateParams.type.split('{').length == 2 && $stateParams.type.split('{')[1] == 'to' && $stateParams.type.split('{')[0] == "4210") {
                var json = { "toid": data.accountid, "to": data.Name, "logicalname": "account" };
                getsetService.Settofor4210(json);
                $window.location.href = ('#/app/addphonecall');
            } else if ($stateParams.type.split('{').length == 2 && $stateParams.type.split('{')[1] == 'regarding' && $stateParams.type.split('{')[0] == "4212") {
                var json = { "regardingobjectid": data.accountid, "regardingobjectname": data.Name };
                getsetService.Setregardingfor4212(json);
                $window.location.href = ('#/app/addtask');
            }
            else {
                $rootScope.show('Please wait..');
                getsetService.reset();
                getsetService.Setdata(data);
                $window.location.href = ('#/app/account-details');
                $timeout(function () {
                    $rootScope.hide();
                }, 1000);
            }
        } else {
            $rootScope.show('Please wait..');
            getsetService.reset();
            getsetService.Setdata(data);
            $window.location.href = ('#/app/account-details');
            $timeout(function () {
                $rootScope.hide();
            }, 1000);
        }       
    }
    $scope.doRefresh = function () {
        if ($scope.authentication.isvisible == true) {
            datatopush = { "PagingCookie": "", "totalrecordcountlimitexceeded": "", "morerecords": "", "totalrecord": "" };
            pagecount = 1; count = 20;
            RequestAccount(true);
        }
        else {
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');
            }, 3000);
        }
    }
    ///filter data
    $scope.Filter = function (search) {
        $scope.filter = search;
        if (!search) {
            $scope.showfound = true;
            $scope.Showdata = true;
            $scope.arrey = [];
        } else {
            $scope.showfound = false;
            $scope.Showdata = false;
            pagecount = 0; count = 0;
            $scope.filterdata = search;
            RequestAccount(true);
        }
    }
    $scope.Gotoaddaccount = function () {
        getsetService.reset();
        $window.location.href = ('#/app/addaccounts');
    }
    /// <summary>      
    /// <returns>Add Account.</returns>
    $scope.accountData = [];
    $scope.accountData = getsetService.Getdata();
    $scope.Save = function (accountData) {
        $scope.accountData = accountData;
        AddAccount();
    }
    function AddAccount() {
        if ($scope.accountData.accountid != undefined) {
            $rootScope.show('Updating Record...');
            var createContact = new XrmServiceToolkit_Soap.BusinessEntity("account", $scope.accountData.accountid);           
            CreateUpdate();
            var CreateContacts = XrmServiceToolkit_Soap.Update(createContact);
            $timeout(function () {
                $rootScope.hide();
                $scope.Dataadded();
                $window.location.href = ('#/app/account/');
            }, 1000);
        } else {
            $rootScope.show('Adding Record...');
            var createContact = new XrmServiceToolkit_Soap.BusinessEntity("account");            
            CreateUpdate();
            var CreateContacts = XrmServiceToolkit_Soap.Create(createContact);
            $timeout(function () {
                $rootScope.hide();
                $scope.Dataadded();
                $window.location.href = ('#/app/account/');
            }, 1000);
        }
        function CreateUpdate() {
        createContact.attributes["name"] = $scope.accountData.Name;
        createContact.attributes["telephone1"] = $scope.accountData.telephone1;
        createContact.attributes["emailaddress1"] = $scope.accountData.email;
        createContact.attributes["address1_line1"] = $scope.accountData.address1_line1;
        createContact.attributes["address1_line2"] = $scope.accountData.address1_line2;
        createContact.attributes["address1_line3"] = $scope.accountData.address1_line3;
        createContact.attributes["address1_fax"] = $scope.accountData.faxnumber; 
        createContact.attributes["description"] = $scope.accountData.description;
        createContact.attributes["websiteurl"] = $scope.accountData.websiteurl;
        createContact.attributes["address1_city"] = $scope.accountData.city;
        createContact.attributes["address1_postalcode"] = $scope.accountData.address1_postalcode;
        createContact.attributes["address1_country"] = $scope.accountData.address1_country;
        $scope.accountData.revenue?createContact.attributes["revenue"] = { value: $scope.accountData.revenue, type: "Money" }:""   
       }                   
    }
    /// <summary>      
    /// <returns>SOAP response.</returns>
    $scope.Dataadded = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'alert!',
            template: 'Record added succesfully',
        });     
        $timeout(function () {
            alertPopup.close();
           
        }, 100000);
    };
    /// <summary>      
    /// <returns>Edit Account.</returns>
    $scope.Edit = function (editData) {
        $scope.adda = "Edit Account";
        $rootScope.show('Please wait..');
        var cols = ["revenue", "name", "telephone1", "emailaddress1", "websiteurl", "address1_line1", "address1_line2", "address1_line3", "address1_city", "address1_country", "address1_postalcode"];
        var retrievedContact = XrmServiceToolkit_Soap.Retrieve("account", editData, cols);
        $scope.format = {
            "revenue": retrievedContact.attributes.revenue == undefined ? undefined : retrievedContact.attributes.revenue.value,
            "Name": retrievedContact.attributes.name == undefined ? undefined : retrievedContact.attributes.name.value,
            "telephone1": retrievedContact.attributes.telephone1 == undefined ? undefined : retrievedContact.attributes.telephone1.value,
            "email": retrievedContact.attributes.emailaddress1 == undefined ? undefined : retrievedContact.attributes.emailaddress1.value,
            "websiteurl": retrievedContact.attributes.websiteurl == undefined ? undefined : retrievedContact.attributes.websiteurl.value,
            "address1_line1": retrievedContact.attributes.address1_line1 == undefined ? undefined : retrievedContact.attributes.address1_line1.value,
            "address1_line2": retrievedContact.attributes.address1_line2 == undefined ? undefined : retrievedContact.attributes.address1_line2.value,
            "address1_line3": retrievedContact.attributes.address1_line3 == undefined ? undefined : retrievedContact.attributes.address1_line3.value,
            "city": retrievedContact.attributes.address1_city == undefined ? undefined : retrievedContact.attributes.address1_city.value,
            "address1_country": retrievedContact.attributes.address1_country == undefined ? undefined : retrievedContact.attributes.address1_country.value,
            "address1_postalcode": retrievedContact.attributes.address1_postalcode == undefined ? undefined : retrievedContact.attributes.address1_postalcode.value,
            "accountid": editData
        }
    getsetService.reset();
    getsetService.Setdata($scope.format);
    $timeout(function () {
        $rootScope.hide();
        $window.location.href = ('#/app/addaccounts');
    }, 1000);
    }
    $scope.$on('$ionicView.enter', function () {
        $scope.search = $scope.filterdata;
    })
})