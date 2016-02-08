
starter.controller('CampaignsController', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, TimesheetService, notification, $location, $timeout, getsetService, authService, localStorageService, $window, $ionicPopup, $rootScope) {
    $rootScope.show('Please wait..');
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
    $scope.arrey = [];
    var count = 20; var pagecount = 1;
    var datatopush = { "PagingCookie": "", "totalrecordcountlimitexceeded": "", "morerecords": "", "totalrecord": "" };
    ///Request
    function RequestCampaigns() {
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
        body.push('<c:string>budgetedcost</c:string>');
        body.push('<c:string>campaignid</c:string>');
        body.push('<c:string>createdby</c:string>');
        body.push('<c:string>createdon</c:string>');
        body.push('<c:string>modifiedby</c:string>');
        body.push('<c:string>modifiedon</c:string>');
        body.push('<c:string>expectedrevenue</c:string>');
        body.push('<c:string>name</c:string>');
        body.push('<c:string>ownerid</c:string>');
        body.push('<c:string>totalactualcost</c:string>');
        body.push('<c:string>transactioncurrencyid</c:string>');
        body.push('<c:string>actualend</c:string>');
        body.push('<c:string>actualstart</c:string>');
        body.push('<c:string>description</c:string>');
        body.push('<c:string>createdby</c:string>');
        body.push('<c:string>expectedresponse</c:string>');
        body.push('<c:string>objective</c:string>');
        body.push('<c:string>proposedend</c:string>');
        body.push('<c:string>proposedstart</c:string>');
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
        body.push('<a:EntityName>campaign</a:EntityName>');
        body.push('<a:LinkEntities />');
        body.push('<a:Orders />');
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
                    CrmcampEntity(req.response);
                }
                else if (req.status === 500) {
                    $scope.showAlert();
                }
            }
        };
        req.send(request);
    }
    /// <summary>
    /// Retreive xml  data .
    /// </summary>
    function CrmcampEntity(response) {
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
                "ownerid": "", "modifiedby": "", "transactioncurrencyid": "", "createdby": "", "expectedrevenue": "",
                "totalactualcost": "", "budgetedcost": "", "actualend": "", "actualstart": "", "name": "", "proposedend": "", "proposedstart": "",
                "createdon": "", "modifiedon": "", "description": ""
            };
            var a = $($(data[i]).each(function (k, p) { $(p).find('b\\:keyvaluepairofstringanytype') }).context.childNodes).each(function (a, b) { $(b).find('c\\:key') });
            for (var j = 0; j < a.length; j++) {
                if (a[j].childNodes[0].innerText == "ownerid") { newobj.ownerid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "modifiedby") { newobj.modifiedby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "createdby") { newobj.createdby = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "transactioncurrencyid") { newobj.transactioncurrencyid = $(a[j].childNodes[1]).find('b\\:name')[0].innerHTML }
                if (a[j].childNodes[0].innerText == "expectedrevenue") { newobj.expectedrevenue = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "budgetedcost") { newobj.budgetedcost = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "actualend") { newobj.actualend = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "actualstart") { newobj.actualstart = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "proposedend") { newobj.proposedend = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "proposedstart") { newobj.proposedstart = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "name") { newobj.name = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "createdon") { newobj.createdon = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "totalactualcost") { newobj.totalactualcost = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "modifiedon") { newobj.modifiedon = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "description") { newobj.description = a[j].childNodes[1].innerHTML }
            }
            if (newobj.title != "")
            { $scope.arrey.push(newobj); }
        }
            $timeout(function () {
            $rootScope.hide();
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    if ($scope.authentication.isvisible == true) {     
        RequestCampaigns();
    }
    else {
        $scope.showAlert();
    }
    $scope.loadMore = function () {
        if (datatopush.PagingCookie != "" && datatopush.morerecords != true) {
            RequestCampaigns();
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
        getsetService.reset();
        getsetService.Setdata(data);
        $window.location.href = ('#/app/campaigns-details');
    }
    $scope.doRefresh = function () {
        if ($scope.authentication.isvisible == true) {
            RequestCampaigns();
        }
        else {
            $scope.$broadcast('scroll.refreshComplete');
        }
    }
})