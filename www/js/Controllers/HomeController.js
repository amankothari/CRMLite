starter.controller('HomeController', function ($scope, $ionicSlideBoxDelegate, $ionicModal, $ionicHistory, $location, $timeout, getsetService, authService, localStorageService, $window, $ionicPopup, $rootScope, getsetDashboard) {  
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
            $rootScope.hide();
        }, 3000);
    };
    $scope.arrey = [];
    $scope.ActivityArray = [];    
    var stateopen = 0; var statewon = 0; var stateclose = 0;
    var object = { "email": 0, "appointment": 0, "phonecall": 0, "task": 0 }
    if ($scope.authentication.isvisible == true) {
        $rootScope.show('Please wait..');
        Oppopipeline();
        Activitypipeline();
    }
    else {
        $scope.showAlert();
    }
    ///Request Function Start
    function Oppopipeline()
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
            body.push('<c:string>statecode</c:string>');
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
            body.push('<a:EntityName>opportunity</a:EntityName>');
            body.push('<a:LinkEntities />');
            body.push('<a:Orders />');
            body.push('<a:PageInfo>');
            body.push('<a:Count>0</a:Count>');
            body.push('<a:PageNumber>0</a:PageNumber>');
            body.push('<a:PagingCookie i:nil="true" />');
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
                        CrmOppoEntity(req.response);
                    }
                    else if (req.status === 500) {
                        $scope.showAlert();
                    }
                }
            };
            req.send(request);
    }
    ///Retrieve Function Start
    function CrmOppoEntity(response) {
            var data = $(response).find('b\\:entity').find('b\\:attributes').each(function (k, i) { $(i).find('b\\:Keyvaluepairofstringanytype') });                     
            for (var i = 0; i < data.length; i++) {
                var a = $($(data[i]).each(function (k, p) { $(p).find('b\\:keyvaluepairofstringanytype') }).context.childNodes).each(function (a, b) { $(b).find('c\\:key') });
                for (var j = 0; j < a.length; j++) {
                    if (a[j].childNodes[0].innerText == "statecode") {
                        var k = a[j].childNodes[1].innerText; if (k == 0) { stateopen = stateopen + 1 } else if (k == 1) { statewon = statewon + 1 } else if (k == 2) { stateclose = stateclose + 1 }
                    }
                }
            }
            var newobj = {
                "stateopen": stateopen, "statewon": statewon, "stateclose": stateclose
            };
            $scope.arrey.push(newobj);
            ///Retrieve donutchart Start
            $scope.donutchart = [
            {
                value: stateclose,
                color: "#F7464A",
                highlight: "#FF5A5E",
               label: "Lost"
             },
            {
               value: statewon,
               color: "#46BFBD",
               highlight: "#5AD3D1",
               label: "Won"
            },
            {
               value: stateopen,
               color: "#FDB45C",
               highlight: "#FFC870",
               label: "In Progress"
            }
            ]
    }
    ///Request Function Start
    function Activitypipeline() {
        var strVar = "";
        strVar += "  <s:Body>";
        strVar += "    <Execute xmlns=\"http:\/\/schemas.microsoft.com\/xrm\/2011\/Contracts\/Services\" xmlns:i=\"http:\/\/www.w3.org\/2001\/XMLSchema-instance\">";
        strVar += "      <request i:type=\"a:RetrieveMultipleRequest\" xmlns:a=\"http:\/\/schemas.microsoft.com\/xrm\/2011\/Contracts\">";
        strVar += "        <a:Parameters xmlns:b=\"http:\/\/schemas.datacontract.org\/2004\/07\/System.Collections.Generic\">";
        strVar += "          <a:KeyValuePairOfstringanyType>";
        strVar += "            <b:key>Query<\/b:key>";
        strVar += "            <b:value i:type=\"a:QueryExpression\">";
        strVar += "              <a:ColumnSet>";
        strVar += "                <a:AllColumns>false<\/a:AllColumns>";
        strVar += "                <a:Columns xmlns:c=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/Arrays\">";
        strVar += "                  <c:string>statecode<\/c:string>";
        strVar += "                  <c:string>subject<\/c:string>";
        strVar += "                  <c:string>activitytypecode<\/c:string>";
        strVar += "                <\/a:Columns>";
        strVar += "              <\/a:ColumnSet>";
        strVar += "              <a:Criteria>";
        strVar += "                <a:Conditions \/>";
        strVar += "                <a:FilterOperator>And<\/a:FilterOperator>";
        strVar += "                <a:Filters>";
        strVar += "                  <a:FilterExpression>";
        strVar += "                    <a:Conditions>";
        strVar += "                      <a:ConditionExpression>";
        strVar += "                        <a:AttributeName>ownerid<\/a:AttributeName>";
        strVar += "                        <a:Operator>Equal<\/a:Operator>";
        strVar += "                        <a:Values xmlns:c=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/Arrays\">";
        strVar += "                          <c:anyType i:type=\"d:guid\" xmlns:d=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/\">" + $scope.authentication.SystemUser + "<\/c:anyType>";
        strVar += "                        <\/a:Values>";
        strVar += "                        <a:EntityName i:nil=\"true\" \/>";
        strVar += "                      <\/a:ConditionExpression>";
        strVar += "                    <\/a:Conditions>";
        strVar += "                    <a:FilterOperator>And<\/a:FilterOperator>";
        strVar += "                    <a:Filters \/>";
        strVar += "                  <\/a:FilterExpression>";
        strVar += "                  <a:FilterExpression>";
        strVar += "                    <a:Conditions>";
        strVar += "                      <a:ConditionExpression>";
        strVar += "                        <a:AttributeName>statecode<\/a:AttributeName>";
        strVar += "                        <a:Operator>Equal<\/a:Operator>";
        strVar += "                        <a:Values xmlns:c=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/Arrays\">";
        strVar += "                          <c:anyType i:type=\"d:int\" xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\">0<\/c:anyType>";
        strVar += "                        <\/a:Values>";
        strVar += "                        <a:EntityName i:nil=\"true\" \/>";
        strVar += "                      <\/a:ConditionExpression>";
        strVar += "                      <a:ConditionExpression>";
        strVar += "                        <a:AttributeName>statecode<\/a:AttributeName>";
        strVar += "                        <a:Operator>Equal<\/a:Operator>";
        strVar += "                        <a:Values xmlns:c=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/Arrays\">";
        strVar += "                          <c:anyType i:type=\"d:int\" xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\">3<\/c:anyType>";
        strVar += "                        <\/a:Values>";
        strVar += "                        <a:EntityName i:nil=\"true\" \/>";
        strVar += "                      <\/a:ConditionExpression>";
        strVar += "                    <\/a:Conditions>";
        strVar += "                    <a:FilterOperator>Or<\/a:FilterOperator>";
        strVar += "                    <a:Filters \/>";
        strVar += "                  <\/a:FilterExpression>";
        strVar += "                  <a:FilterExpression>";
        strVar += "                    <a:Conditions>";
        strVar += "                      <a:ConditionExpression>";
        strVar += "                        <a:AttributeName>activitytypecode<\/a:AttributeName>";
        strVar += "                        <a:Operator>Equal<\/a:Operator>";
        strVar += "                        <a:Values xmlns:c=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/Arrays\">";
        strVar += "                          <c:anyType i:type=\"d:int\" xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\">4212<\/c:anyType>";
        strVar += "                        <\/a:Values>";
        strVar += "                        <a:EntityName i:nil=\"true\" \/>";
        strVar += "                      <\/a:ConditionExpression>";
        strVar += "                      <a:ConditionExpression>";
        strVar += "                        <a:AttributeName>activitytypecode<\/a:AttributeName>";
        strVar += "                        <a:Operator>Equal<\/a:Operator>";
        strVar += "                        <a:Values xmlns:c=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/Arrays\">";
        strVar += "                          <c:anyType i:type=\"d:int\" xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\">4210<\/c:anyType>";
        strVar += "                        <\/a:Values>";
        strVar += "                        <a:EntityName i:nil=\"true\" \/>";
        strVar += "                      <\/a:ConditionExpression>";
        strVar += "                      <a:ConditionExpression>";
        strVar += "                        <a:AttributeName>activitytypecode<\/a:AttributeName>";
        strVar += "                        <a:Operator>Equal<\/a:Operator>";
        strVar += "                        <a:Values xmlns:c=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/Arrays\">";
        strVar += "                          <c:anyType i:type=\"d:int\" xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\">4201<\/c:anyType>";
        strVar += "                        <\/a:Values>";
        strVar += "                        <a:EntityName i:nil=\"true\" \/>";
        strVar += "                      <\/a:ConditionExpression>";
        strVar += "                      <a:ConditionExpression>";
        strVar += "                        <a:AttributeName>activitytypecode<\/a:AttributeName>";
        strVar += "                        <a:Operator>Equal<\/a:Operator>";
        strVar += "                        <a:Values xmlns:c=\"http:\/\/schemas.microsoft.com\/2003\/10\/Serialization\/Arrays\">";
        strVar += "                          <c:anyType i:type=\"d:int\" xmlns:d=\"http:\/\/www.w3.org\/2001\/XMLSchema\">4202<\/c:anyType>";
        strVar += "                        <\/a:Values>";
        strVar += "                        <a:EntityName i:nil=\"true\" \/>";
        strVar += "                      <\/a:ConditionExpression>";
        strVar += "                    <\/a:Conditions>";
        strVar += "                    <a:FilterOperator>Or<\/a:FilterOperator>";
        strVar += "                    <a:Filters \/>";
        strVar += "                  <\/a:FilterExpression>";
        strVar += "                <\/a:Filters>";
        strVar += "              <\/a:Criteria>";
        strVar += "              <a:Distinct>false<\/a:Distinct>";
        strVar += "              <a:EntityName>activitypointer<\/a:EntityName>";
        strVar += "              <a:LinkEntities \/>";
        strVar += "              <a:Orders \/>";
        strVar += "              <a:PageInfo>";
        strVar += "                <a:Count>50000<\/a:Count>";
        strVar += "                <a:PageNumber>1<\/a:PageNumber>";
        strVar += "                <a:PagingCookie i:nil=\"true\" \/>";
        strVar += "                <a:ReturnTotalRecordCount>false<\/a:ReturnTotalRecordCount>";
        strVar += "              <\/a:PageInfo>";
        strVar += "              <a:NoLock>false<\/a:NoLock>";
        strVar += "            <\/b:value>";
        strVar += "          <\/a:KeyValuePairOfstringanyType>";
        strVar += "        <\/a:Parameters>";
        strVar += "        <a:RequestId i:nil=\"true\" \/>";
        strVar += "        <a:RequestName>RetrieveMultiple<\/a:RequestName>";
        strVar += "      <\/request>";
        strVar += "    <\/Execute>";
        strVar += "  <\/s:Body>";
        var xml = [];
        xml.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing">');
        xml.push($scope.authentication.header);
        xml.push(strVar);
        xml.push('</s:Envelope>');
        var request = xml.join('');
        var req = new XMLHttpRequest();
        req.open('POST', $scope.authentication.url + 'XRMServices/2011/Organization.svc', true);
        req.setRequestHeader('Content-Type', 'application/soap+xml; charset=utf-8');
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    Activityresponse(req.response);
                }
                else if (req.status === 500) {
                    $scope.showAlert();
                }
            }
        };
        req.send(request);
    }
    ///Redirect Functions Start
    $scope.OppoWon = function () {
        $rootScope.show("Showing Won Opportinuty...");
        $scope.setdata = { "SetWon": 1 }; getsetDashboard.reset();
        getsetDashboard.Setdata($scope.setdata); $window.location.href = ('#/app/opportunity/');
        $timeout(function () {
            $rootScope.hide();
        }, 2000);
    }
    $scope.OppoLost = function () {
        $rootScope.show("Showing Lost Opportinuty...");
        getsetDashboard.reset();
        $scope.setdata = { "SetWon": 2 };
        getsetDashboard.Setdata($scope.setdata); $window.location.href = ('#/app/opportunity/');
        $timeout(function () {
            $rootScope.hide();
        }, 2000);
    }
    $scope.OppoOpen = function () {
        $rootScope.show("Showing Open Opportinuty...");
        getsetDashboard.reset();
        $scope.setdata = { "SetWon": 0 };
        getsetDashboard.Setdata($scope.setdata); $window.location.href = ('#/app/opportunity/');
        $timeout(function () {
            $rootScope.hide();
        }, 2000);
    }
    function Activityresponse(response) {
        var data = $(response).find('b\\:entity').find('b\\:attributes').each(function (k, i) { $(i).find('b\\:Keyvaluepairofstringanytype') });
        for (var i = 0; i < data.length; i++) {
            var newobj = { "statecode": "", "subject": "", "activitytypecode": "", "activityid": "" };
            var a = $($(data[i]).each(function (k, p) { $(p).find('b\\:keyvaluepairofstringanytype') }).context.childNodes).each(function (a, b) { $(b).find('c\\:key') });
            for (var j = 0; j < a.length; j++) {
                if (a[j].childNodes[0].innerText == "statecode") { newobj.statecode = a[j].childNodes[1].innerText }
                if (a[j].childNodes[0].innerText == "subject") { newobj.subject = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "activitytypecode") { newobj.activitytypecode = a[j].childNodes[1].innerHTML }
                if (a[j].childNodes[0].innerText == "activityid") { newobj.activityid = a[j].childNodes[1].innerHTML }
                if (newobj.activitytypecode == "email")
                { object.email = object.email + 1 } else if (newobj.activitytypecode == "appointment") { object.appointment = object.appointment + 1 }
                else if (newobj.activitytypecode == "phonecall") { object.phonecall = object.phonecall + 1 }
                else if (newobj.activitytypecode == "task") { object.task = object.task + 1 }
            }
        }
        $scope.ActivityArray.push(object);
        $scope.piechart = [
         {
             value: object.email,
             color: "#F7464A",
             highlight: "#FF5A5E",
             label: "Total emails"
         },
         {
             value: object.appointment,
             color: "#FDB45C",
             highlight: "#B66B10",
             label: "Total Appoinments"
         },
        {
            value: object.phonecall,
            color: "#059ae5",
            highlight: "#1A88BF",
            label: "Total Phone call"
        },
         {
             value: object.task,
             color: "#46BFBD",
             highlight: "#418382",
             label: "Total Task"
         }
        ]
        $rootScope.hide();
    }
})
var angles = angular.module("angles", []);
angles.chart = function (type) {
    return {
        restrict: "A",
        scope: {
            data: "=",
            options: "=",
            id: "@",
            width: "=",
            height: "=",
            resize: "=",
            chart: "@",
            segments: "@",
            responsive: "=",
            tooltip: "=",
            legend: "="
        },
        link: function ($scope, $elem) {
            var ctx = $elem[0].getContext("2d");
            var autosize = false;

            $scope.size = function () {
                if ($scope.width <= 0) {
                    $elem.width($elem.parent().width());
                    ctx.canvas.width = $elem.width();
                } else {
                    ctx.canvas.width = $scope.width || ctx.canvas.width;
                    autosize = true;
                }

                if ($scope.height <= 0) {
                    $elem.height($elem.parent().height());
                    ctx.canvas.height = ctx.canvas.width / 2;
                } else {
                    ctx.canvas.height = $scope.height || ctx.canvas.height;
                    autosize = true;
                }
            }

            $scope.$watch("data", function (newVal, oldVal) {
                if (chartCreated)
                    chartCreated.destroy();

                // if data not defined, exit
                if (!newVal) {
                    return;
                }
                if ($scope.chart) { type = $scope.chart; }

                if (autosize) {
                    $scope.size();
                    chart = new Chart(ctx);
                };

                if ($scope.responsive || $scope.resize)
                    $scope.options.responsive = true;

                if ($scope.responsive !== undefined)
                    $scope.options.responsive = $scope.responsive;

                chartCreated = chart[type]($scope.data, $scope.options);
                chartCreated.update();
                if ($scope.legend)
                    angular.element($elem[0]).parent().after(chartCreated.generateLegend());
            }, true);

            $scope.$watch("tooltip", function (newVal, oldVal) {
                //chartCreated.draw();
                if (newVal === undefined || !chartCreated.segments)
                    return;
                if (!isFinite(newVal) || newVal >= chartCreated.segments.length || newVal < 0)
                    return;
                var activeSegment = chartCreated.segments[newVal];
                activeSegment.save();
                activeSegment.fillColor = activeSegment.highlightColor;
                chartCreated.showTooltip([activeSegment]);
                activeSegment.restore();
            }, true);

            $scope.size();
            var chart = new Chart(ctx);
            var chartCreated;
        }
    }
}
angles.directive("piechart", function () { return angles.chart("Pie"); });
angles.directive("donutchart", function () { return angles.chart("Doughnut"); });

!function (t) { "use strict"; "function" == typeof define && define.amd ? define(["angular", "chart.js"], t) : "object" == typeof exports ? module.exports = t(require("angular"), require("chart.js")) : t(angular, Chart) }(function (t, e) { "use strict"; function n() { var n = {}, r = { Chart: e, getOptions: function (e) { var r = e && n[e] || {}; return t.extend({}, n, r) } }; this.setOptions = function (e, r) { return r ? (n[e] = t.extend(n[e] || {}, r), void 0) : (r = e, n = t.extend(n, r), void 0) }, this.$get = function () { return r } } function r(n) { function r(t, e) { return t && e && t.length && e.length ? Array.isArray(t[0]) ? t.length === e.length && t[0].length === e[0].length : e.reduce(a, 0) > 0 ? t.length === e.length : !1 : !1 } function a(t, e) { return t + e } function o(e, r, a) { if (r.data && r.data.length) { r.getColour = "function" == typeof r.getColour ? r.getColour : l, r.colours = c(e, r); var o = a[0], u = o.getContext("2d"), s = Array.isArray(r.data[0]) ? g(r.labels, r.data, r.series || [], r.colours) : p(r.labels, r.data, r.colours), f = t.extend({}, n.getOptions(e), r.options), h = new n.Chart(u)[e](s, f); return r.$emit("create", h), ["hover", "click"].forEach(function (t) { r[t] && (o["click" === t ? "onclick" : "onmousemove"] = i(r, h, t)) }), r.legend && "false" !== r.legend && v(a, h), h } } function i(t, e, n) { return function (r) { var a = e.getPointsAtEvent || e.getBarsAtEvent || e.getSegmentsAtEvent; if (a) { var o = a.call(e, r); t[n](o, r), t.$apply() } } } function c(r, a) { for (var o = t.copy(a.colours || n.getOptions(r).colours || e.defaults.global.colours) ; o.length < a.data.length;) o.push(a.getColour()); return o.map(u) } function u(t) { return "object" == typeof t && null !== t ? t : "string" == typeof t && "#" === t[0] ? s(d(t.substr(1))) : l() } function l() { var t = [f(0, 255), f(0, 255), f(0, 255)]; return s(t) } function s(t) { return { fillColor: h(t, .2), strokeColor: h(t, 1), pointColor: h(t, 1), pointStrokeColor: "#fff", pointHighlightFill: "#fff", pointHighlightStroke: h(t, .8) } } function f(t, e) { return Math.floor(Math.random() * (e - t + 1)) + t } function h(t, e) { return "rgba(" + t.concat(e).join(",") + ")" } function d(t) { var e = parseInt(t, 16), n = e >> 16 & 255, r = e >> 8 & 255, a = 255 & e; return [n, r, a] } function g(e, n, r, a) { return { labels: e, datasets: n.map(function (e, n) { var o = t.copy(a[n]); return o.label = r[n], o.data = e, o }) } } function p(t, e, n) { return t.map(function (t, r) { return { label: t, value: e[r], color: n[r].strokeColor, highlight: n[r].pointHighlightStroke } }) } function v(t, e) { var n = t.parent(), r = n.find("chart-legend"), a = "<chart-legend>" + e.generateLegend() + "</chart-legend>"; r.length ? r.replaceWith(a) : n.append(a) } function y(t, e, n) { Array.isArray(n.data[0]) ? t.datasets.forEach(function (t, n) { (t.points || t.bars).forEach(function (t, r) { t.value = e[n][r] }) }) : t.segments.forEach(function (t, n) { t.value = e[n] }), t.update(), n.$emit("update", t) } function C(t) { return !t || Array.isArray(t) && !t.length || "object" == typeof t && !Object.keys(t).length } return function (e) { return { restrict: "CA", scope: { data: "=", labels: "=", options: "=", series: "=", colours: "=?", getColour: "=?", chartType: "=", legend: "@", click: "=", hover: "=" }, link: function (n, a) { function i(r, i) { if (!C(r) && !t.equals(r, i)) { var u = e || n.chartType; u && (c && c.destroy(), c = o(u, n, a)) } } var c, u = document.createElement("div"); u.className = "chart-container", a.replaceWith(u), u.appendChild(a[0]), "object" == typeof window.G_vmlCanvasManager && null !== window.G_vmlCanvasManager && "function" == typeof window.G_vmlCanvasManager.initElement && window.G_vmlCanvasManager.initElement(a[0]), n.$watch("data", function (t, i) { if (t && t.length && (!Array.isArray(t[0]) || t[0].length)) { var u = e || n.chartType; if (u) { if (c) { if (r(t, i)) return y(c, t, n); c.destroy() } c = o(u, n, a) } } }, !0), n.$watch("series", i, !0), n.$watch("labels", i, !0), n.$watch("options", i, !0), n.$watch("colours", i, !0), n.$watch("chartType", function (e, r) { C(e) || t.equals(e, r) || (c && c.destroy(), c = o(e, n, a)) }), n.$on("$destroy", function () { c && c.destroy() }) } } } } e.defaults.global.responsive = !0, e.defaults.global.multiTooltipTemplate = "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>", e.defaults.global.colours = ["#97BBCD", "#DCDCDC", "#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"], t.module("chart.js", []).provider("ChartJs", n).factory("ChartJsFactory", ["ChartJs", r]).directive("chartBase", ["ChartJsFactory", function (t) { return new t }]).directive("chartLine", ["ChartJsFactory", function (t) { return new t("Line") }]).directive("chartBar", ["ChartJsFactory", function (t) { return new t("Bar") }]).directive("chartRadar", ["ChartJsFactory", function (t) { return new t("Radar") }]).directive("chartDoughnut", ["ChartJsFactory", function (t) { return new t("Doughnut") }]).directive("chartPie", ["ChartJsFactory", function (t) { return new t("Pie") }]).directive("chartPolarArea", ["ChartJsFactory", function (t) { return new t("PolarArea") }]) });