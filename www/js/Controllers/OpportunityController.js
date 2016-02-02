starter.controller('OpportunityController', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, TimesheetService, notification, $location, $timeout, getsetService, authService, localStorageService, $window, $rootScope, $ionicPopup, XrmServiceToolkit_Soap) {
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
    var pagecount = 1; var count = 20; $scope.filterdata = '';
    var datatopush = { "PagingCookie": "", "totalrecordcountlimitexceeded": "", "morerecords": "", "totalrecord": "" };
    $scope.arrey = [];
    ///Function Init
    $scope.fire = function () {
        $rootScope.show('Please wait..');
        if ($scope.authentication.isvisible == true) {
            RequestOppo(false);
        } else { $scope.showAlert(); }
    }
    ///Request
    function RequestOppo(bool) {
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
        body.push('<c:string>budgetamount</c:string>');
        body.push('<c:string>campaignid</c:string>');
        body.push('<c:string>closeprobability</c:string>');
        body.push('<c:string>completefinalproposal</c:string>');
        body.push('<c:string>completeinternalreview</c:string>');
        body.push('<c:string>description</c:string>');
        body.push('<c:string>customerneed</c:string>');
        body.push('<c:string>customerid</c:string>');
        body.push('<c:string>name</c:string>');
        body.push('<c:string>ownerid</c:string>');
        body.push('<c:string>parentaccountid</c:string>');
        body.push('<c:string>parentcontactid</c:string>');
        body.push('<c:string>modifiedby</c:string>');
        body.push('<c:string>modifiedon</c:string>');
        body.push('<c:string>createdon</c:string>');
        body.push('<c:string>createdby</c:string>');
        body.push('<c:string>proposedsolution</c:string>');
        body.push('<c:string>stepname</c:string>');
        body.push('<c:string>totalamount</c:string>');
        body.push('<c:string>totaldiscountamount</c:string>');
        body.push('<c:string>totaltax</c:string>');
        body.push('<c:string>estimatedclosedate</c:string>');
        body.push('</a:Columns>');
        body.push('</a:ColumnSet>');
        body.push('<a:Criteria>');
        body.push('<a:Conditions>');
        body.push('<a:ConditionExpression>');
        body.push('<a:AttributeName>name</a:AttributeName>');
        body.push('<a:Operator>Like</a:Operator>');
        body.push('<a:Values xmlns:b="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
        body.push('<b:anyType i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">%' + $scope.filterdata + '%</b:anyType>');
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
        body.push('<a:EntityName>opportunity</a:EntityName>');
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
                    CrmOppoEntity(req.response, bool);
                }
                else if (req.status === 500) {
                    //$scope.showAlert();
                }
            }
        };
        req.send(request);
    }
    /// <summary>
    /// Executes the SOAP Response.
    /// </summary>  
    function CrmOppoEntity(response, bool) {
        var data = $(response).find('b\\:entity').find('b\\:attributes').each(function (k, i) { $(i).find('b\\:Keyvaluepairofstringanytype') });
        pagecount = pagecount + 1;
        datatopush = {
            "PagingCookie": $(response).find('b\\:Keyvaluepairofstringanytype').find('b\\:pagingcookie')[0].innerText,
            "totalrecordcountlimitexceeded": $(response).find('b\\:Keyvaluepairofstringanytype').find('b\\:totalrecordcountlimitexceeded')[0].outerText,
            "morerecords": $(response).find('b\\:Keyvaluepairofstringanytype').find('b\\:morerecords')[0].outerText,
            "totalrecord": $(response).find('b\\:Keyvaluepairofstringanytype').find('b\\:TotalRecordCount')[0].innerText,
        };
        for (var i = 0; i < data.length; i++) {
            var newobj = {
                "opportunityid": "", "estimatedclosedate": "", "campaignid": "", "ownerid": "", "modifiedby": "", "transactioncurrencyid": "", "createdby": "", "parentcontactid": "",
                "customerid": "", "parentaccountid": "", "stepname": "", "proposedsolution": "", "name": "", "closeprobability": "", "totaldiscountamount": "",
                "totalamount": "", "createdon": "", "budgetamount": "", "totaltax": "", "completeinternalreview": "", "completefinalproposal": "", "customerneed": "", "description": ""
            };
            var a = $($(data[i]).each(function (k, p) { $(p).find('b\\:keyvaluepairofstringanytype') }).context.childNodes).each(function (a, b) { $(b).find('c\\:key') });
            for (var j = 0; j < a.length; j++) {
                if (a[j].childNodes[0].innerText == "campaignid") { newobj.campaignid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "ownerid") { newobj.ownerid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "modifiedby") { newobj.modifiedby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "createdby") { newobj.createdby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "transactioncurrencyid") { newobj.transactioncurrencyid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "parentcontactid") { newobj.parentcontactid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "customerid") { newobj.customerid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "parentaccountid") { newobj.parentaccountid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "stepname") { newobj.stepname = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "createdon") { newobj.createdon = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "proposedsolution") { newobj.proposedsolution = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "name") { newobj.name = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "closeprobability") { newobj.closeprobability = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "totaldiscountamount") { newobj.totaldiscountamount = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "modifiedon") { newobj.modifiedon = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "totalamount") { newobj.totalamount = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "budgetamount") { newobj.budgetamount = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "totaltax") { newobj.totaltax = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "completeinternalreview") { newobj.completeinternalreview = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "completefinalproposal") { newobj.completefinalproposal = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "customerneed") { newobj.customerneed = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "description") { newobj.description = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "estimatedclosedate") { newobj.estimatedclosedate = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "opportunityid") { newobj.opportunityid = a[j].childNodes[1].innerHTML }
            }
            if (newobj.Name != "" && bool != true) {
                $scope.arrey.push(newobj)
            }
            else {
                $scope.arrey = [];
                $scope.arrey.push(newobj);
            }
            $scope.Showdata = true;
        }
        $timeout(function () {
            $rootScope.hide();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    /// <summary>
    /// Return Call.
    /// </summary>  
    $scope.loadMore = function () {
        if (datatopush.PagingCookie != "" && datatopush.morerecords != true) {
            RequestOppo();
        }
        else {
            $scope.message = "no more record found";         
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    $scope.$on('$stateChangeSuccess', function () {
        $scope.loadMore();
    });
    $scope.Details = function (data) {
        if (getsetService.Getdata().redirecturltask) {
            var json = { "regardingobjectid": data.opportunityid, "regardingobjectname": data.name };
            getsetService.Setdata(json);
            $window.location.href = ('#/app/addtask');
        } else {
        $rootScope.show('Please wait..');
        getsetService.reset();
        getsetService.Setdata(data);
        $window.location.href = ('#/app/opportunity-details');
        $timeout(function () {
            $rootScope.hide();
        }, 1000);}
       
    }
    $scope.doRefresh = function () {
        if ($scope.authentication.isvisible == true) {
         pagecount = 1; count = 20;
        $scope.arrey = [];
        RequestOppo();
        } else { $scope.showAlert(); }      
    }
    $scope.Filter = function (search) {
        pagecount = 0; count = 0;
        $scope.filterdata = search;
        RequestOppo(true);
        $scope.Showdata = false;
    }

    ///Add 
    $scope.Gotoaddopport = function () {
        getsetService.reset();
        $window.location.href = ('#/app/addopporttunity');
    }
    /// <summary>      
    /// <returns>Add Account.</returns>
    $scope.Secondtime = true;
    $scope.oppoData = [];
    $scope.$on('$ionicView.enter', function () {
        $scope.oppoData= getsetService.Getdata();        
    })
    $scope.Save = function (oppoData) {
        $scope.oppoData = oppoData;
        AddOpportinuty();
    }
    function AddOpportinuty() {
        if ($scope.oppoData.opportunityid != undefined) {
            $rootScope.show('Updating Record...');
            var createContact = new XrmServiceToolkit_Soap.BusinessEntity("opportunity", $scope.oppoData.opportunityid); createupdate();
            var CreateContacts = XrmServiceToolkit_Soap.Update(createContact);
            $timeout(function () {
                $rootScope.hide(); $scope.Dataadded();
                $window.location.href = ('#/app/opportunity');
            }, 1000);
        } else {
            $rootScope.show('Adding Records...');
            var createContact = new XrmServiceToolkit_Soap.BusinessEntity("opportunity");
            createupdate();
            var CreateContacts = XrmServiceToolkit_Soap.Create(createContact); $timeout(function () { $rootScope.hide(); $scope.Dataadded();
                $window.location.href = ('#/app/opportunity');
            }, 1000);
        }    
        function createupdate() {
            createContact.attributes["name"] = $scope.oppoData.name;
            $scope.oppoData.parentaccountid? createContact.attributes["parentaccountid"] = { id: $scope.oppoData.parentaccountid, logicalName: "account", type: "EntityReference" }:""
            $scope.oppoData.parentcontactid? createContact.attributes["parentcontactid"] = { id: $scope.oppoData.parentcontactid, logicalName: "contact", type: "EntityReference" }:""
            $scope.oppoData.budgetamount ? createContact.attributes["budgetamount"] = { value: parseFloat($scope.oppoData.budgetamount), type: "Money" } : ""
            createContact.attributes["description"] = $scope.oppoData.description;
            createContact.attributes["customerneed"] = $scope.oppoData.customerneed;
            $scope.oppoData.estimatedclosedate? createContact.attributes["estimatedclosedate"] = { value: $scope.oppoData.estimatedclosedate, type:"datetime" } : ""
            $scope.oppoData.estimatedvalue? createContact.attributes["estimatedvalue"] = { value: parseFloat($scope.oppoData.estimatedvalue), type: "Money" } : ""
            $scope.oppoData.statuscode? createContact.attributes["statuscode"] = { value: 1, type: "OptionSetValue" }:""
            $scope.oppoData.purchaseprocess? createContact.attributes["purchaseprocess"] = { value: $scope.oppoData.purchaseprocess, type: "OptionSetValue" }:""
            $scope.oppoData.purchasetimeframe ? createContact.attributes["purchasetimeframe"] = { value: $scope.oppoData.purchasetimeframe, type: "OptionSetValue" } : ""
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
    $scope.fetchaccount = function (index) {
        getsetService.reset();
        getsetService.SetRedirectUrlOppo();
        $window.location.href = ('#/app/account');
    }
    $scope.fetchcontact = function () {
        getsetService.reset();
        getsetService.SetRedirectUrlOppo();
        $window.location.href = ('#/app/contact');
    }
    /// <summary>      
    /// <returns>Edit Account.</returns>
    $scope.Edit = function (editData) {

        $scope.Secondtime = !$scope.Secondtime;
        var cols = ["name", "customerneed", "description", "parentaccountid", "parentcontactid", "estimatedclosedate", "budgetamount", "estimatedvalue", "statuscode", "purchasetimeframe", "purchaseprocess"];
        var retrievedContact = XrmServiceToolkit_Soap.Retrieve("opportunity", editData, cols);
        $scope.format = {
            "name": retrievedContact.attributes.name == undefined ? undefined : retrievedContact.attributes.name.value,
            "customerneed": retrievedContact.attributes.customerneed == undefined ? undefined : retrievedContact.attributes.customerneed.value,
            "description": retrievedContact.attributes.description == undefined ? undefined : retrievedContact.attributes.description.value,
            "parentaccountid": retrievedContact.attributes.parentaccountid == undefined ? undefined : retrievedContact.attributes.parentaccountid.id,
            "parentcontactid": retrievedContact.attributes.parentcontactid == undefined ? undefined : retrievedContact.attributes.parentcontactid.id,
            "parentaccountname": retrievedContact.attributes.parentaccountid == undefined ? undefined : retrievedContact.attributes.parentaccountid.name,
            "parentcontactname": retrievedContact.attributes.parentcontactid == undefined ? undefined : retrievedContact.attributes.parentcontactid.name,
            "budgetamount": retrievedContact.attributes.budgetamount == undefined ? undefined : retrievedContact.attributes.budgetamount.value,
            "estimatedclosedate": retrievedContact.attributes.estimatedclosedate == undefined ? undefined : retrievedContact.attributes.estimatedclosedate.value,
            "estimatedvalue": retrievedContact.attributes.estimatedvalue == undefined ? undefined : retrievedContact.attributes.estimatedvalue.value,
            "statuscode": retrievedContact.attributes.statuscode == undefined ? undefined : retrievedContact.attributes.statuscode.value,
            "purchasetimeframe": retrievedContact.attributes.purchasetimeframe == undefined ? undefined : retrievedContact.attributes.purchasetimeframe.value,
            "purchaseprocess": retrievedContact.attributes.purchaseprocess == undefined ? undefined : retrievedContact.attributes.purchaseprocess.value,
            "opportunityid": editData
        }
        getsetService.reset();
        getsetService.Setdata($scope.format);
        $window.location.href = ('#/app/addopporttunity');
    }
})