'use strict';

angular.module('starter.services', [])

.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$window', function ($http, $q, localStorageService, ngAuthSettings, $window) {
    var authServiceFactory = {};
        var _logOut = function () {
            localStorageService.remove('LoggedUser');
            _authentication.isAuth = false;
            _authentication.isCustomer = false;
            _authentication.userName = "";
            _authentication.useRefreshTokens = false;
            localStorageService.set('LoggedUser', _authentication);
        };
        authServiceFactory.logOut = _logOut;
        return authServiceFactory;
}])
.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', '$window', '$rootScope', function ($q, $injector, $location, localStorageService, $window, $rootScope) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {         
            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 0) {
                $rootScope.notify("Please check your Internet connection.");
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }])

.factory('TimesheetService', function ($q, $http, ngAuthSettings) {
    var TimesheetServiceFactory = {};
    var url = ngAuthSettings.apiServiceBaseUri;
    var _GetProject = function (type) {
        //console.log('Service calling');
        var deferred = $q.defer();
        $http.get(url + 'api/project').success(function (results) {
            //console.log('Successfully Get Timesheet Project Data');
            deferred.resolve(results);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _GetTaskType = function () {
        //console.log('Service calling');
        var deferred = $q.defer();
        $http.get(url + 'api/tasktype').success(function (results) {
            //console.log('Successfully Get Timesheet TaskType Data');
            deferred.resolve(results);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    var _Savetimesheet = function (input) {

        //console.log('Service calling');
        var deferred = $q.defer();
        $http.post(url + 'api/timesheet', input).success(function (results) {
            //console.log('Successfully save data');
            deferred.resolve(results);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _GettaskforSpecificDate = function (input) {
        //console.log('Service calling');
        var deferred = $q.defer();
        $http.get(url + 'api/timesheet?systemuserid=' + input.userid + '&date=' + input.date).success(function (results) {
            //console.log('Successfully Get task for Specific Date');
            deferred.resolve(results);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    TimesheetServiceFactory.GetProject = _GetProject;
    TimesheetServiceFactory.GetTaskType = _GetTaskType;
    TimesheetServiceFactory.Savetimesheet = _Savetimesheet;
    TimesheetServiceFactory.GettaskforSpecificDatemesheet = _GettaskforSpecificDate;
    return TimesheetServiceFactory;
})

.factory('getsetService', function ($injector) {
    var tempdata = {};
    var data = {};
    var recentitem = $injector.get('recentitem');
    return data = {
        Getdata: function () {
            return tempdata;
        },
        Setdata: function (input) {
            tempdata = input;
        },
        SetRedirectUrl:function(){
            tempdata.redirecturl = true;
        },
        SetRedirectUrlOppo: function () {
            tempdata.redirecturloppo = true;
        },
        SetRedirectUrlTask: function () {
            tempdata.redirecturltask = true;
        },
        SetRedirectUrlPhone: function () {
            tempdata.redirecturlphone = true;
        },
        Setproject: function (input) {
            tempdata.project = input;
            recentitem.setrecentproject(input);
        },
        SetTasktype: function (input) {
            tempdata.tasktype = input;
            recentitem.setrecenttasktype(input);
        },
        reset: function () {
            tempdata = {};
        }
    };
})
 .factory('UsergetsetService', function ($injector) {
        var tempdata = {};
        var data = {};
        var recentitem = $injector.get('recentitem');
        return data = {
            Getdata: function () {
                return tempdata;
            },
            Setdata: function (input) {
                tempdata = input;
            },
            reset: function () {
                tempdata = {};
            }
        };
    })

.factory('recentitem', function ($injector, localStorageService) {
    var tempdata = {};
    var data = [];
    var datafortasktype = [];
    var dataforexpense = [];
    var _setrecentproject = function (input) {
        var nameofcookie= 'p_'+ localStorageService.get('LoggedUser').userId;
        if (localStorageService.get(nameofcookie)){
            data = [];
            data = localStorageService.get(nameofcookie);
            var status=_.filter(data,function(o){
                return o.Id == input.Id;
            })
            console.log(status);
            if (status.length==0) {
                data.push(input);
            }
        } else {
            data.push(input)
        }
        localStorageService.set(nameofcookie, data);
      
        console.log(localStorageService.get(nameofcookie));
        };
    var _recentproject = function () {

        var nameofcookie = 'p_' + localStorageService.get('LoggedUser').userId;
        var data = localStorageService.get(nameofcookie);
        return data ;
    };
    var _setrecenttasktype = function (input) {
        var nameofcookie = 't_' + localStorageService.get('LoggedUser').userId;
        if (localStorageService.get(nameofcookie)) {
            datafortasktype = [];
            datafortasktype = localStorageService.get(nameofcookie);
            var status = _.filter(datafortasktype, function (o) {
                return o.Id == input.Id;
            })
            console.log(status);
            if (status.length == 0) {
                datafortasktype.push(input);
            }
        } else {
            datafortasktype.push(input)
        }
        localStorageService.set(nameofcookie, datafortasktype);
        console.log(localStorageService.get(nameofcookie));
    };
    var _recenttasktype = function () {
        var nameofcookie = 't_' + localStorageService.get('LoggedUser').userId;
        var data = localStorageService.get(nameofcookie, datafortasktype);
        return data;
    };
    var _setrecentexpense = function (input) {
        var nameofcookie = 'e_' + localStorageService.get('LoggedUser').userId;
        if (localStorageService.get(nameofcookie)) {
            dataforexpense = [];
            dataforexpense = localStorageService.get(nameofcookie);
            var status = _.filter(dataforexpense, function (o) {
                return o.Id == input.Id;
            })
            console.log(status);
            if (status.length == 0) {
                dataforexpense.push(input);
            }
        } else {
            dataforexpense.push(input)
        }
        localStorageService.set(nameofcookie,dataforexpense);
        console.log(localStorageService.get(nameofcookie));
    };
    var _recentexpense = function () {
        var nameofcookie = 'e_' + localStorageService.get('LoggedUser').userId;
        var data = localStorageService.get(nameofcookie);
        return data;
    };
        tempdata.setrecentproject = _setrecentproject;
        tempdata.recentproject = _recentproject;
        tempdata.setrecenttasktype = _setrecenttasktype;
        tempdata.recenttasktype = _recenttasktype;
        tempdata.setrecentexpense = _setrecentexpense;
        tempdata.recentexpense = _recentexpense;
        return tempdata;
})

.factory('getsetServiceForTravel', function ($injector) {
    var tempdata = {};
    var data = {};
    var recentitem = $injector.get('recentitem');
    return data = {
        Getdata: function () {
            return tempdata;
        },
        Setproject: function (input) {
            tempdata.project = input;
            recentitem.setrecentproject(input);
        },
        reset: function () {
            tempdata = {};
        }
    };
})

.factory('notification', function ($rootScope, $ionicLoading, $window, $cordovaToast) {
   // template: text ? '<p class="item-icon-left">' + text + '<ion-spinner icon="android"></ion-spinner></p>' : '<p class="item-icon-left">Loading..<ion-spinner icon="android"></ion-spinner></p>',
    $rootScope.show = function (text) {
        $rootScope.loading = $ionicLoading.show({
            template: text ? text : "Loading..",
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
        });
    };
    $rootScope.hide = function () {
        $ionicLoading.hide();
    };
    $rootScope.notify = function (text) {
        $cordovaToast.showLongBottom(text).then(function (success) {
            console.log(text);
            // success
        }, function (error) {
            // error
        });

        //$rootScope.show(text);
        //$window.setTimeout(function () {
        //    $rootScope.hide();
        //}, 1999);
    };

    return {
        convertDate: function (inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat);
            return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('-');
        }
    }

})

.factory('TravelrequestService', function ($q, $http, ngAuthSettings) {
    var TravelrequestServiceFactory = {};
    var url = ngAuthSettings.apiServiceBaseUri;
    //get cities using adgeo free service
    var _getcities = function (change) {
        var deferred = $q.defer();
        var url = 'http://gd.geobytes.com/AutoCompleteCity?callback&q=';
        $http.get(url + change).success(function (result) {
            //console.log('get cities');
            deferred.resolve(result);
        }).error(function (data, status, headers, config) {
            // this isn't happening:
            //console.log("saved comment", data);
            return data;
        });
        return deferred.promise;
    }


    var _Alltravelrequest = function (input) {
        var deferred = $q.defer();
        $http.get(url + 'api/travel?systemuserid=' + input.userid).success(function (out) {
            //console.log('call api/requestooo api');
            deferred.resolve(out);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _Posttravelrequest = function (data) {
        var deferred = $q.defer();
        $http.post(url + 'api/travel', data).success(function (out) {
            //console.log('post travel request');
            //console.log(out);
            deferred.resolve(out);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    TravelrequestServiceFactory.getcities = _getcities;
    TravelrequestServiceFactory.AlltravelRequest = _Alltravelrequest;
    TravelrequestServiceFactory.Posttravelrequest = _Posttravelrequest;
    return TravelrequestServiceFactory;
})

.factory('LeaveService', function ($q, $http, ngAuthSettings) {
    var LeaveServiceFactory = {};
    var url = ngAuthSettings.apiServiceBaseUri;

    var _Allleaverequest = function (input) {
        var deferred = $q.defer();
        $http.get(url + 'api/requestooo?systemuserid=' + input.userid).success(function (out) {
            //console.log('call api/travelrequest api');
            deferred.resolve(out);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _Postleave = function (data) {
        var deffred = $q.defer();
        $http.post(url + 'api/requestooo', data).success(function (out) {
            //console.log('post travel request');
            //console.log(out);
            deffred.resolve(out);
        }).error(function (err, status) {
            deffred.reject(err);
        });
        return deffred.promise;
    }
    LeaveServiceFactory.Allleaverequest = _Allleaverequest;
    LeaveServiceFactory.Postleave = _Postleave;
    return LeaveServiceFactory;
})

.factory('getsetServiceForExpense', function ($rootScope, $injector) {
     var tempdata = {};
     var data = {};
     var recentitem = $injector.get('recentitem');
     return data = {
         GetExpensedata: function () {
             return tempdata;
         },
         SetExpensedate: function (input) {
             tempdata.Date = input;
         },
         SetExpenseproject: function (input) {
             tempdata.ProjectName = input;
             recentitem.setrecentproject(input);
         },
         SetExpenseCategory: function (input) {
             tempdata.CategoryName = input;
             recentitem.setrecentexpense(input);
         },
         reset: function () {
             tempdata = {};
         }
     };

 })

.factory('CategoryService', function ($q, $http, ngAuthSettings) {
    var CategoryServiceFactory = {};
    var url = ngAuthSettings.apiServiceBaseUri;
    var _Getcategory = function () {
        //console.log('Service calling');
        var deferred = $q.defer();
        $http.get(url + 'api/Category').success(function (results) {
            //console.log('Successfully Get Expense Categorys Data');
            deferred.resolve(results);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _ExpensePost = function (input) {
        //console.log('_ExpensePost calling');
        var deferred = $q.defer();
        $http.post(url + 'api/Expenses', input).success(function (results) {
            //console.log('Successfully post Expense Data');
            deferred.resolve(results);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _GetExpense = function (input) {
        //console.log('_ExpensePost calling');
        var deferred = $q.defer();
        $http.get(url + 'api/Expenses?systemuserid=' + input.userid + '&date=' + input.date).success(function (results) {
            //console.log('Successfully Get Expense Data');
            deferred.resolve(results);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    CategoryServiceFactory.Getcategory = _Getcategory;
    CategoryServiceFactory.ExpensePost = _ExpensePost;
    CategoryServiceFactory.GetExpense = _GetExpense;
    return CategoryServiceFactory;
})

.factory('FindanEmployeeService', function ($q, $http, ngAuthSettings) {
    var FindanEmployeeFactory = {};
    var url = ngAuthSettings.apiServiceBaseUri;

    var employee = {};

    var _Allemployee = function () {
        var deferred = $q.defer();
        $http.get(url + 'api/findemployee').success(function (out) {
            //console.log('call api/travelrequest api');
            deferred.resolve(out);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    var _GetUserFromServer=function(userid)
    {
        var deferred = $q.defer();
        $http.get(url + 'api/findemployee?SystemUserid=' + userid).success(function (out) {
            //console.log('call api/travelrequest api');
            deferred.resolve(out);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    var _PostUser = function (data) {
        var deferred = $q.defer();
        $http.post(url + 'api/findemployee',data).success(function (out) {
            //console.log('call api/travelrequest api');
            deferred.resolve(out);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    var _singleemployee = function (data) {
        var deffred = $q.defer();
        $http.get(url + 'api/findemployee?SystemUserid=' + data).success(function (out) {
            //console.log('post travel request');
            //console.log(out);
            deffred.resolve(out);
        }).error(function (err, status) {
            deferred.reject(err);
        });
        return deffred.promise;
    }

    var _setsingleuser=function(data)
    {
        employee = {};
        employee = data;
    }
    var _getsingleuser = function () {
        return employee;
    }
    FindanEmployeeFactory.Allemployee = _Allemployee;
    FindanEmployeeFactory.Singleemployee = _singleemployee;
    FindanEmployeeFactory.setsingleuser = _setsingleuser;
    FindanEmployeeFactory.getsingleuser = _getsingleuser;
    FindanEmployeeFactory.GetUserFromServer = _GetUserFromServer;
    FindanEmployeeFactory.PostUser = _PostUser;
    return FindanEmployeeFactory;
})

.factory('CustomerService', function ($q, $http, ngAuthSettings, localStorageService) {


    var CustomerData = {};
    var url = ngAuthSettings.apiServiceBaseUri;
    var _CustomerProjects = function (userid) {
        var deffred = $q.defer();
        $http.get(url + 'api/customer/get?CustomerId=' + userid).success(function (respond) {
            console.log("Customer Project Data is Success");
            console.log(respond);
            deffred.resolve(respond);

        }).error(function (err, status) {
            deffred.reject(err);
        });
        return deffred.promise;
    }



    var _CustomerProfile = function (userid) {
        var deffred = $q.defer();
        $http.get(url + 'api/CustomerProfile?ContactId=' + userid).success(function (respond) {
            console.log("Customer profile Data is Success");
            console.log(respond);
            deffred.resolve(respond);

        }).error(function (err, status) {
            deffred.reject(err);
        });
        return deffred.promise;

    }

    var _updateProfile = function (Profile, userid) {
        var deffred = $q.defer();
        var PostData = { Id: userid, EmailAddress1: Profile.Email, HomeContactNo: Profile.HomeCellNo, OrignalEmailAddress: Profile.OrignalEmailAddress };
        $http.post(url + 'api/CustomerProfile', PostData).success(function (respond) {
            console.log("Customer profile Updated Data is Success");
            console.log(respond);
            deffred.resolve(respond);

        }).error(function (err, status) {
            deffred.reject(err);
        });
        return deffred.promise;
    }

    CustomerData.CustomerProjects = _CustomerProjects;
    CustomerData.CustomerProfile = _CustomerProfile;
    CustomerData.updateProfile = _updateProfile;

    return CustomerData;

})

.factory('weatherService', function ($http) {
    return {
        getWeather: function (lat,lon) {
            var weather = { temp: {}, clouds: null };
            var url = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=imperial&callback=JSON_CALLBACK';
            $http.jsonp(url).success(function (data) {
                if (data) {
                    if (data.main) {
                        weather.temp.current = data.main.temp;
                        weather.temp.min = data.main.temp_min;
                        weather.temp.max = data.main.temp_max;
                    }
                    weather.clouds = data.clouds ? data.clouds.all : undefined;
                }
            });

            return weather;
        }
    };
})
.factory('SendEmailService', function ($q, $http, ngAuthSettings) {
    var url = ngAuthSettings.apiServiceBaseUri;
    return {
        SendEmail: function (data) {
            console.log(data);
            var deffred = $q.defer();
            $http.get(url + 'api/SendEmail?MailTo='+data.email+'&Subject=Travel Request Form&body=test').success(function (respond) {
                console.log(respond);
                deffred.resolve(respond);
            }).error(function (err, status) {
                deffred.reject(err);
            });
            return deffred.promise;

            return weather;
        }
    };
})
.factory('XrmServiceToolkit_Soap', function (localStorageService) {
    var authentication = localStorageService.get('LoggedUser');
    var xRMheader =authentication.header;
    var xRMurl = authentication.url;
    var alertMessage = function (message) {
        (Xrm.Utility !== undefined && Xrm.Utility.alertDialog !== undefined) ? Xrm.Utility.alertDialog(message) : alert(message);
    };

    var htmlEncode = function (s) {
        if (s === null || s === "" || s === undefined) return s;
        for (var count = 0, buffer = "", hEncode = "", cnt = 0, sLength = s.length; cnt < sLength; cnt++) {
            var c = s.charCodeAt(cnt);
            if (c > 96 && c < 123 || c > 64 && c < 91 || c === 32 || c > 47 && c < 58 || c === 46 || c === 44 || c === 45 || c === 95)
                buffer += String.fromCharCode(c);
            else buffer += "&#" + c + ";";
            if (++count === 500) {
                hEncode += buffer; buffer = ""; count = 0;
            }
        }
        if (buffer.length) hEncode += buffer;
        return hEncode;
    };

    var innerSurrogateAmpersandWorkaround = function (s) {
        var buffer = '';
        var c0;
        var cnt;
        var cntlength;
        for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
            c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                if (cnt + 1 < s.length) {
                    var c1 = s.charCodeAt(cnt + 1);
                    if (c1 >= 56320 && c1 <= 57343) {
                        buffer += "CRMEntityReferenceOpen" + ((c0 - 55296) * 1024 + (c1 & 1023) + 65536).toString(16) + "CRMEntityReferenceClose"; cnt++;
                    }
                    else
                        buffer += String.fromCharCode(c0);
                }
                else buffer += String.fromCharCode(c0);
            else buffer += String.fromCharCode(c0);
        }
        s = buffer;
        buffer = "";
        for (cnt = 0, cntlength = s.length; cnt < cntlength; cnt++) {
            c0 = s.charCodeAt(cnt);
            if (c0 >= 55296 && c0 <= 57343)
                buffer += String.fromCharCode(65533);
            else buffer += String.fromCharCode(c0);
        }
        s = buffer;
        s = htmlEncode(s);
        s = s.replace(/CRMEntityReferenceOpen/g, "&#x");
        s = s.replace(/CRMEntityReferenceClose/g, ";");
        return s;
    };

    var crmXmlEncode = function (s) {
        // ReSharper disable UsageOfPossiblyUnassignedValue
        // ReSharper disable ExpressionIsAlwaysConst
        if ('undefined' === typeof s || 'unknown' === typeof s || null === s) return s;
            // ReSharper restore ExpressionIsAlwaysConst
            // ReSharper restore UsageOfPossiblyUnassignedValue
        else if (typeof s != "string") s = s.toString();
        return innerSurrogateAmpersandWorkaround(s);
    };

    var crmXmlDecode = function (s) {
        if (typeof s != "string") s = s.toString();
        return s;
    };

    var padNumber = function (s, len) {
        len = len || 2;

        s = '' + s;
        while (s.length < len) {
            s = "0" + s;
        }
        return s;
    };

    var encodeDate = function (dateTime) {
        return dateTime.getFullYear() + "-" +
               padNumber(dateTime.getMonth() + 1) + "-" +
               padNumber(dateTime.getDate()) + "T" +
               padNumber(dateTime.getHours()) + ":" +
               padNumber(dateTime.getMinutes()) + ":" +
               padNumber(dateTime.getSeconds());
    };

    var encodeValue = function (value) {
        // Handle GUIDs wrapped in braces
        if (typeof value == typeof "" && value.slice(0, 1) === "{" && value.slice(-1) === "}") {
            value = value.slice(1, -1);
        }

        // ReSharper disable QualifiedExpressionMaybeNull
        return (typeof value === "object" && value.getTime)
        // ReSharper restore QualifiedExpressionMaybeNull
               ? encodeDate(value)
               : crmXmlEncode(value);
    };

    var context = function () {
        ///<summary>
        /// Private function to the context object.
        ///</summary>
        ///<returns>Context</returns>
        var oContext;
        if (typeof window.GetGlobalContext != "undefined") {
            oContext = window.GetGlobalContext();
        }
        else if (typeof GetGlobalContext != "undefined") {
            oContext = GetGlobalContext();
        }
        else {
            if (typeof Xrm != "undefined") {
                oContext = Xrm.Page.context;
            }
            else if (typeof window.parent.Xrm != "undefined") {
                oContext = window.parent.Xrm.Page.context;
            }
            else {
                throw new Error("Context is not available.");
            }
        }
        return oContext;
    };

    var getClientUrl = function () {
        ///<summary>
        /// Private function to return the server URL from the context
        ///</summary>
        ///<returns>String</returns>
        var serverUrl = typeof context().getClientUrl != 'undefined' ? context().getClientUrl() : context().getServerUrl();
        if (serverUrl.match(/\/$/)) {
            serverUrl = serverUrl.substring(0, serverUrl.length - 1);
        }
        return serverUrl;
    };

    var orgServicePath = function () {
        ///<summary>
        /// Private function to return the path to the organization service.
        ///</summary>
        ///<returns>String</returns>
        return getClientUrl() + "/XRMServices/2011/Organization.svc/web";
    };

    // ReSharper disable UnusedLocals
    var dateReviver = function (key, value) {
        // ReSharper restore UnusedLocals
        ///<summary>
        /// Private function to convert matching string values to Date objects.
        ///</summary>
        ///<param name="key" type="String">
        /// The key used to identify the object property
        ///</param>
        ///<param name="value" type="String">
        /// The string value representing a date
        ///</param>
        var a;
        if (typeof value === 'string') {
            a = /Date\(([-+]?\d+)\)/.exec(value);
            if (a) {
                return new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
            }
        }
        return value;
    };

    var xrmValue = function (sType, sValue) {
        this.type = sType;
        this.value = sValue;
    };

    var xrmEntityReference = function (gId, sLogicalName, sName) {
        this.id = gId;
        this.logicalName = sLogicalName;
        this.name = sName;
        this.type = 'EntityReference';
    };

    var xrmEntityCollection = function (items) {
        this.value = items;
        this.type = 'EntityCollection';
    };

    var xrmOptionSetValue = function (iValue, sFormattedValue) {
        this.value = iValue;
        this.formattedValue = sFormattedValue;
        this.type = 'OptionSetValue';
    };

    var businessEntity = function (logicalName, id) {
        ///<summary>
        /// A object represents a business entity for CRM 2011.
        ///</summary>
        ///<param name="logicalName" type="String">
        /// A String represents the name of the entity.
        /// For example, "contact" means the business entity will be a contact entity
        /// </param>
        ///<param name="id" type="String">
        /// A String represents the id of the entity. If not passed, it will be auto populated as a empty guid string
        /// </param>
        this.id = (!id) ? "00000000-0000-0000-0000-000000000000" : id;
        this.logicalName = logicalName;
        this.attributes = new Object();
    };

    var stringToDate = function (s) {
        var b = s.split(/\D/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5]));
    };

    var nsResolver = function (prefix) {
        var ns = {
            "s": "http://schemas.xmlsoap.org/soap/envelope/",
            "a": "http://schemas.microsoft.com/xrm/2011/Contracts",
            "i": "http://www.w3.org/2001/XMLSchema-instance",
            "b": "http://schemas.datacontract.org/2004/07/System.Collections.Generic",
            "c": "http://schemas.microsoft.com/xrm/2011/Metadata",
            "ser": "http://schemas.microsoft.com/xrm/2011/Contracts/Services"
        };
        return ns[prefix] || null;
    };

    var isNodeNull = function (node) {
        if (node == null)
        { return true; }
        if ((node.attributes.getNamedItem("i:nil") != null) && (node.attributes.getNamedItem("i:nil").value === "true"))
        { return true; }
        return false;
    };

    var selectNodes = function (node, xPathExpression) {
        if (typeof (node.selectNodes) != "undefined") {
            return node.selectNodes(xPathExpression);
        }
        else {
            var output = [];
            var xPathResults = node.evaluate(xPathExpression, node, nsResolver, XPathResult.ANY_TYPE, null);
            var result = xPathResults.iterateNext();
            while (result) {
                output.push(result);
                result = xPathResults.iterateNext();
            }
            return output;
        }
    };

    var selectSingleNode = function (node, xpathExpr) {
        if (typeof (node.selectSingleNode) != "undefined") {
            return node.selectSingleNode(xpathExpr);
        }
        else {
            var xpe = new XPathEvaluator();
            var results = xpe.evaluate(xpathExpr, node, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            return results.singleNodeValue;

        }
    };

    var selectSingleNodeText = function (node, xpathExpr) {
        var x = selectSingleNode(node, xpathExpr);
        if (isNodeNull(x))
        { return null; }
        if (typeof (x.text) != "undefined") {
            return x.text;
        }
        else {
            return x.textContent;
        }
    };

    var getNodeText = function (node) {
        if (typeof (node.text) != "undefined") {
            return node.text;
        }
        else {
            return node.textContent;
        }
    };

    var setSelectionNamespaces = function (doc) {
        var namespaces = [
            "xmlns:s='http://schemas.xmlsoap.org/soap/envelope/'",
            "xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'",
            "xmlns:i='http://www.w3.org/2001/XMLSchema-instance'",
            "xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'",
            "xmlns:c='http://schemas.microsoft.com/xrm/2011/Metadata'",
            "xmlns:ser='http://schemas.microsoft.com/xrm/2011/Contracts/Services'"
        ];
        doc.setProperty("SelectionNamespaces", namespaces.join(" "));
    };

    var xmlParser = function (txt) {
        ///<summary>
        /// cross browser responseXml to return a XML object
        ///</summary>
        var xmlDoc = null;
        try {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = false;
            xmlDoc.loadXML(txt);
        } catch (e) {
            if (window.DOMParser) {
                // ReSharper disable InconsistentNaming
                var parser = new DOMParser();
                // ReSharper restore InconsistentNaming
                xmlDoc = parser.parseFromString(txt, "text/xml");
            } else {
                alertMessage("Cannot convert the XML string to a cross-browser XML object.");
            }
        }

        return xmlDoc;
    };

    var xmlToString = function (responseXml) {
        var xmlString = '';
        try {
            if (responseXml != null) {
                if (typeof XMLSerializer !== "undefined" && typeof responseXml.xml === "undefined") {
                    // ReSharper disable InconsistentNaming
                    xmlString = (new XMLSerializer()).serializeToString(responseXml);
                    // ReSharper restore InconsistentNaming
                } else {
                    if (typeof responseXml.xml !== "undefined") {
                        xmlString = responseXml.xml;
                    }
                    else if (typeof responseXml[0].xml !== "undefined") {
                        xmlString = responseXml[0].xml;
                    }

                }
            }
        } catch (e) {
            alertMessage("Cannot convert the XML to a string.");
        }
        return xmlString;
    };

    businessEntity.prototype = {
        /**
        * Serialize a CRM Business Entity object to XML string in order to be passed to CRM Web Services.
        * @return {String} The serialized XML string of CRM entity.
        */
        serialize: function () {
            var xml = ["<b:value i:type='a:Entity'>"];
            xml.push('<a:Attributes xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">');
            var attributes = this.attributes;
            for (var attributeName in attributes) {
                if (attributes.hasOwnProperty(attributeName)) {
                    var attribute = attributes[attributeName];

                    xml.push("<a:KeyValuePairOfstringanyType>");
                    xml.push("<b:key>", attributeName, "</b:key>");

                    if (attribute === null ||attribute===undefined) {
                        xml.push("<b:value i:nil='true' />");
                    } else {
                        var sType = (!attribute.type)
                            ? typeof attribute
                            : crmXmlEncode(attribute.type);
                        var value;
                        var encodedValue;
                        var id;
                        var encodedId;
                        var logicalName;
                        var encodedLogicalName;
                        switch (sType) {
                            case "OptionSetValue":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                xml.push("<b:value i:type='a:OptionSetValue'>");
                                xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
                                break;

                            case "EntityCollection":
                                xml.push("<b:value i:type='a:EntityCollection'>");
                                xml.push("<a:Entities>");
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                var collections = isArray(value) ? value : [value];

                                for (var i = 0, collectionLengh = collections.length; i < collectionLengh; i++) {
                                    var item = collections[i];
                                    id = (item.hasOwnProperty("id")) ? item["id"] : item;
                                    encodedId = encodeValue(id);
                                    logicalName = (item.hasOwnProperty("logicalName")) ? item["logicalName"] : item;
                                    encodedLogicalName = encodeValue(logicalName);
                                    xml.push("<a:Entity>");
                                    xml.push("<a:Attributes>");
                                    xml.push("<a:KeyValuePairOfstringanyType>");
                                    xml.push("<b:key>partyid</b:key>");
                                    xml.push("<b:value i:type='a:EntityReference'>");
                                    xml.push("<a:Id>", encodedId, "</a:Id>");
                                    xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
                                    xml.push("<a:Name i:nil='true' />");
                                    xml.push("</b:value>");
                                    xml.push("</a:KeyValuePairOfstringanyType>");
                                    xml.push("</a:Attributes>");
                                    xml.push("<a:EntityState i:nil='true' />");
                                    xml.push("<a:FormattedValues />");
                                    xml.push("<a:Id>00000000-0000-0000-0000-000000000000</a:Id>");
                                    xml.push("<a:LogicalName>activityparty</a:LogicalName>");
                                    xml.push("<a:RelatedEntities />");
                                    xml.push("</a:Entity>");
                                }
                                xml.push("</a:Entities>");
                                xml.push("<a:EntityName i:nil='true' />");
                                xml.push("<a:MinActiveRowVersion i:nil='true' />");
                                xml.push("<a:MoreRecords>false</a:MoreRecords>");
                                xml.push("<a:PagingCookie i:nil='true' />");
                                xml.push("<a:TotalRecordCount>0</a:TotalRecordCount>");
                                xml.push("<a:TotalRecordCountLimitExceeded>false</a:TotalRecordCountLimitExceeded>");
                                xml.push("</b:value>");
                                break;

                            case "EntityReference":
                                id = (attribute.hasOwnProperty("id")) ? attribute["id"] : attribute;
                                encodedId = encodeValue(id);
                                logicalName = (attribute.hasOwnProperty("logicalName")) ? attribute["logicalName"] : attribute;
                                encodedLogicalName = encodeValue(logicalName);
                                xml.push("<b:value i:type='a:EntityReference'>");
                                xml.push("<a:Id>", encodedId, "</a:Id>");
                                xml.push("<a:LogicalName>", encodedLogicalName, "</a:LogicalName>");
                                xml.push("<a:Name i:nil='true' />", "</b:value>");                                                          
                                break;

                            case "Money":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                xml.push("<b:value i:type='a:Money'>");
                                xml.push("<a:Value>", encodedValue, "</a:Value>", "</b:value>");
                                break;

                            case "guid":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                xml.push("<b:value i:type='c:guid' xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/'>");
                                xml.push(encodedValue, "</b:value>");
                                break;

                            case "number":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                var oType = (parseInt(encodedValue) === encodedValue) ? "c:int" : "c:int";
                                xml.push("<b:value i:type='", oType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>");
                                xml.push(encodedValue, '</b:value>');
                                break;

                            case "datetime":
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                sType = (typeof value === "object" && value.getTime) ? "dateTime" : "dateTime";
                                xml.push("<b:value i:type='c:", sType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>", encodedValue, "</b:value>");
                                break;
                            default:
                                value = (attribute.hasOwnProperty("value")) ? attribute["value"] : attribute;
                                encodedValue = encodeValue(value);
                                sType = (typeof value === "object" && value.getTime) ? "dateTime" : sType;
                                xml.push("<b:value i:type='c:", sType, "' xmlns:c='http://www.w3.org/2001/XMLSchema'>", encodedValue, "</b:value>");
                                break;
                        }
                    }
                    xml.push("</a:KeyValuePairOfstringanyType>");
                }
            }

            xml.push("</a:Attributes><a:EntityState i:nil='true' />");
            xml.push("<a:FormattedValues xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
            xml.push("<a:Id>", encodeValue(this.id), "</a:Id>");
            xml.push("<a:LogicalName>", this.logicalName, "</a:LogicalName>");
            xml.push("<a:RelatedEntities xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />");
            xml.push("</b:value>");
            return xml.join("");
        },

        /**
        * Deserialize an XML node into a CRM Business Entity object. The XML node comes from CRM Web Service's response.
        * @param {object} resultNode The XML node returned from CRM Web Service's Fetch, Retrieve, RetrieveMultiple messages.
        */
        deserialize: function (resultNode) {
            var obj = new Object();
            var resultNodes = resultNode.childNodes;

            for (var j = 0, lenj = resultNodes.length; j < lenj; j++) {
                var sKey;
                var parentNode = resultNodes[j];
                switch (parentNode.nodeName) {
                    case (parentNode.nodeName == "a:Attributes" ? "a:Attributes" : "b:Attributes"):
                        var attr = parentNode;
                        for (var k = 0, lenk = attr.childNodes.length; k < lenk; k++) {
                            var tempParentNode = attr.childNodes[k];
                            // Establish the Key for the Attribute
                            var tempParentNodeChildNodes = tempParentNode.childNodes;
                            sKey = getNodeText(tempParentNodeChildNodes[0]);

                            var tempNode = tempParentNodeChildNodes[1];
                            // Determine the Type of Attribute value we should expect
                            var sType = tempNode.attributes.getNamedItem("i:type").value;

                            // check for AliasedValue
                            if (sType.replace('c:', '').replace('a:', '') === "AliasedValue") {
                                // reset the type to the actual attribute type
                                var subNode = tempNode.childNodes[2];
                                sType = subNode.attributes.getNamedItem("i:type").value;

                                //sKey = getNodeText(tempNode.childNodes[1]) + "." + getNodeText(tempNode.childNodes[0]);
                                // reset the node to the AliasedValue value node
                                tempNode = subNode;
                            }

                            var entRef;
                            var entCv;
                            switch (sType) {
                                case (sType == "a:OptionSetValue" ? "a:OptionSetValue" : "b:OptionSetValue"):
                                    var entOsv = new xrmOptionSetValue();
                                    entOsv.type = sType.replace('b:', '');
                                    entOsv.value = parseInt(getNodeText(tempNode));
                                    obj[sKey] = entOsv;
                                    break;

                                case (sType == "a:EntityReference" ? "a:EntityReference" : "b:EntityReference"):
                                    entRef = new xrmEntityReference();
                                    entRef.type = sType.replace('b:', '');
                                    var oChildNodes = tempNode.childNodes;
                                    entRef.id = getNodeText(oChildNodes[0]);
                                    entRef.logicalName = getNodeText(oChildNodes[2]);
                                    entRef.name = getNodeText(oChildNodes[3]);
                                    obj[sKey] = entRef;
                                    break;

                                case (sType == "a:EntityCollection" ? "a:EntityCollection" : "b:EntityCollection"):
                                    entRef = new xrmEntityCollection();
                                    entRef.type = sType.replace('b:', '');

                                    //get all party items....
                                    var items = [];
                                    var partyNodes = tempNode.childNodes;
                                    for (var y = 0, leny = partyNodes[0].childNodes.length; y < leny; y++) {
                                        var itemNodes = tempParentNode.childNodes[1].childNodes[0].childNodes[y].childNodes[0].childNodes;
                                        for (var z = 0, lenz = itemNodes.length; z < lenz; z++) {
                                            var itemNodeChildNodes = itemNodes[z].childNodes;
                                            var nodeText = getNodeText(itemNodeChildNodes[0]);
                                            if (nodeText === "partyid") {
                                                var itemRef = new xrmEntityReference();
                                                itemRef.id = getNodeText(itemNodeChildNodes[1].childNodes[0]);
                                                itemRef.logicalName = getNodeText(itemNodeChildNodes[1].childNodes[1]);
                                                itemRef.name = getNodeText(itemNodeChildNodes[1].childNodes[2]);
                                                items[y] = itemRef;
                                            }
                                        }
                                    }
                                    entRef.value = items;
                                    obj[sKey] = entRef;
                                    break;

                                case (sType == "a:Money" ? "a:Money" : "b:Money"):
                                    entCv = new xrmValue();
                                    entCv.type = sType.replace('b:', '');
                                    entCv.value = parseFloat(getNodeText(tempNode));
                                    obj[sKey] = entCv;
                                    break;

                                default:
                                    entCv = new xrmValue();
                                    entCv.type = sType.replace('c:', '').replace('a:', '').replace('d:', '');
                                    if (entCv.type === "int") {
                                        entCv.value = parseInt(getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "decimal" || entCv.type === "double") {
                                        entCv.value = parseFloat(getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "dateTime") {
                                        entCv.value = stringToDate(getNodeText(tempNode));
                                    }
                                    else if (entCv.type === "boolean") {
                                        entCv.value = (getNodeText(tempNode) === 'false') ? false : true;
                                    }
                                    else {
                                        entCv.value = getNodeText(tempNode);
                                    }
                                    obj[sKey] = entCv;
                                    break;
                            }
                        }
                        this.attributes = obj;
                        break;

                    case (parentNode.nodeName == "a:Id" ? "a:Id" : "b:Id"):
                        this.id = getNodeText(parentNode);
                        break;

                    case (parentNode.nodeName == "a:LogicalName" ? "a:LogicalName" : "b:LogicalName"):
                        this.logicalName = getNodeText(parentNode);
                        break;

                    case (parentNode.nodeName == "a:FormattedValues" ? "a:FormattedValues" : "b:FormattedValues"):
                        var foVal = parentNode;

                        for (var o = 0, leno = foVal.childNodes.length; o < leno; o++) {
                            // Establish the Key, we are going to fill in the formatted value of the already found attribute
                            var foNode = foVal.childNodes[o];
                            sKey = getNodeText(foNode.childNodes[0]);
                            this.attributes[sKey].formattedValue = getNodeText(foNode.childNodes[1]);
                            if (isNaN(this.attributes[sKey].value) && this.attributes[sKey].type === "dateTime") {
                                this.attributes[sKey].value = new Date(this.attributes[sKey].formattedValue);
                            }
                        }
                        break;
                }
            }
        }
    };

    var getError = function (resp) {
        //Error descriptions come from http://support.microsoft.com/kb/193625

        if (resp.status === 12029)
        { throw new Error("The attempt to connect to the server failed."); }
        if (resp.status === 12007)
        { throw new Error("The server name could not be resolved."); }
        var faultXml = resp.responseXML;

        var errorMessage = "Unknown (unable to parse the fault)";
        if (faultXml !== null && typeof faultXml == "object") {

            var faultstring = null;
            var errorCode = null;

            var bodyNode = faultXml.firstChild.firstChild;

            //Retrieve the fault node
            for (var i = 0; i < bodyNode.childNodes.length; i++) {
                var node = bodyNode.childNodes[i];

                //NOTE: This comparison does not handle the case where the XML namespace changes
                if ("s:Fault" === node.nodeName) {
                    for (var j = 0; j < node.childNodes.length; j++) {
                        var testNode = node.childNodes[j];
                        if ("faultstring" === testNode.nodeName) {
                            faultstring = getNodeText(testNode);
                        }
                        if ("detail" === testNode.nodeName) {
                            for (var k = 0; k < testNode.childNodes.length; k++) {
                                var orgServiceFault = testNode.childNodes[k];
                                if ("OrganizationServiceFault" === orgServiceFault.nodeName) {
                                    for (var l = 0; l < orgServiceFault.childNodes.length; l++) {
                                        var errorCodeNode = orgServiceFault.childNodes[l];
                                        if ("ErrorCode" === errorCodeNode.nodeName) {
                                            errorCode = getNodeText(errorCodeNode);
                                            break;
                                        }
                                    }
                                }
                            }

                        }
                    }
                    break;
                }

            }
        }
        if (errorCode != null && faultstring != null) {
            errorMessage = "Error Code:" + errorCode + " Message: " + faultstring;
        }
        else {
            if (faultstring != null) {
                errorMessage = faultstring;
            }
        }
        throw new Error(errorMessage);
    };

    var doRequest = function (soapBody, requestType, async, internalCallback) {
        async = async || false;
        var xml = [];
        xml.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing">');
        xml.push(xRMheader);
        xml.push('<s:Body>');
        xml.push('<' + requestType + ' xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">');
        xml.push(typeof (soapBody) == 'object' ? soapBody.join("") : soapBody);
        xml.push('</' + requestType + '>');
        xml.push('</s:Body>');
        xml.push('</s:Envelope>');
        var request = xml.join("");
        var req = new XMLHttpRequest();

        req.open("POST", xRMurl + '/XRMServices/2011/Organization.svc', async);
        req.setRequestHeader('Content-Type', 'application/soap+xml; charset=utf-8');
        //IE10
        try { req.responseType = 'msxml-document'; } catch (e) { }

        if (async) {
            req.onreadystatechange = function () {
                if (req.readyState === 4 /* complete */) {
                    req.onreadystatechange = null; //Addresses potential memory leak issue with IE
                    if (req.status === 200) { // "OK"          
                        var doc = req.responseXML;
                        try { setSelectionNamespaces(doc); } catch (e) { }
                        internalCallback(doc);
                    }
                    else {
                        getError(req);
                    }
                }
            };

            req.send(request);
        }
        else {
            req.send(request);
            if (req.status === 200) {
                var doc = req.responseXML;
                try { setSelectionNamespaces(doc); } catch (e) { }
                var result = doc;
                return !!internalCallback ? internalCallback(result) : result;
            } else {
                getError(req);
            }
        }
        // ReSharper disable NotAllPathsReturnValue
    };
    // ReSharper restore NotAllPathsReturnValue

    var sCreate = function (be, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to create a new record.
        ///</summary>
        ///<param name="be" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for create operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var request = be.serialize();

        var async = !!callback;

        var mBody =
           ["<request i:type='a:CreateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
            "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
            "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                request,
            "</a:KeyValuePairOfstringanyType>",
            "</a:Parameters>",
            "<a:RequestId i:nil='true' />",
            "<a:RequestName>Create</a:RequestName>",
            "</request>"].join("");

        return doRequest(mBody, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//b:value");

            var result = crmXmlDecode(responseText);

            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var sUpdate = function (be, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to update an existing record.
        ///</summary>
        ///<param name="businessEntity" type="Object">
        /// A JavaScript object with properties corresponding to the Schema name of
        /// entity attributes that are valid for update operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var request = be.serialize();

        var async = !!callback;

        var mBody =
           ["<request i:type='a:UpdateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
            "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
            "<a:KeyValuePairOfstringanyType>",
                "<b:key>Target</b:key>",
                request,
                "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Update</a:RequestName>",
            "</request>"].join("");

        return doRequest(mBody, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//a:Results");
            var result = crmXmlDecode(responseText);

            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var sDelete = function (entityName, id, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to delete a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for delete operations.
        /// </param>
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for delete operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var request =
        [
             "<request i:type='a:DeleteRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'><a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'><a:KeyValuePairOfstringanyType><b:key>Target</b:key><b:value i:type='a:EntityReference'><a:Id>",
                  id, "</a:Id><a:LogicalName>",
                  entityName, "</a:LogicalName><a:Name i:nil='true' /></b:value></a:KeyValuePairOfstringanyType></a:Parameters><a:RequestId i:nil='true' /><a:RequestName>Delete</a:RequestName></request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//a:Results");
            var result = crmXmlDecode(responseText);

            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var execute = function (request, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to execute a soap request.
        ///</summary>
        ///<param name="request" type="String">
        /// A JavaScript string corresponding to the soap request
        /// that are valid for execute operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            if (!async)
                return resultXml;
            else
                callback(resultXml);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };


    var fetchMore = function (fetchCoreXml, pageNumber, pageCookie, fetchResults) {

        //Build new query
        var moreFetchXml =
                [
                    "<fetch mapping='logical' page='" + pageNumber + "' count='5000' paging-cookie='" + pageCookie + "'>",
                    fetchCoreXml.replace(/\"/g, "'"),
                    "</fetch>"
                ].join("");

        var moreMsgBody = [
               "<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                   "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                       "<a:KeyValuePairOfstringanyType>",
                           "<b:key>Query</b:key>",
                           "<b:value i:type='a:FetchExpression'>",
                               "<a:Query>", crmXmlEncode(moreFetchXml), "</a:Query>",
                           "</b:value>",
                       "</a:KeyValuePairOfstringanyType>",
                   "</a:Parameters>",
                   "<a:RequestId i:nil='true'/>",
                   "<a:RequestName>RetrieveMultiple</a:RequestName>",
               "</request>"
        ].join("");


        return doRequest(moreMsgBody, "Execute", false, function (moreResultXml) {
            var newFetchResult = selectSingleNode(moreResultXml, "//a:Entities");

            var newMoreRecords = (selectSingleNodeText(moreResultXml, "//a:MoreRecords") === "true");

            for (var iii = 0, nLength = newFetchResult.childNodes.length; iii < nLength; iii++) {
                var entity = new businessEntity();

                entity.deserialize(newFetchResult.childNodes[iii]);
                fetchResults.push(entity);
            }

            if (newMoreRecords) {
                pageNumber += 1;
                var newPageCookie = selectSingleNodeText(moreResultXml, "//a:PagingCookie").replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');;

                fetchMore(fetchCoreXml, pageNumber, newPageCookie, fetchResults);
            } else {
                return fetchResults;
            }
        });
    };


    var fetch = function (fetchCore, fetchAll, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a fetch request.
        ///</summary>
        ///<param name="fetchCore" type="String">
        /// A JavaScript String containing serialized XML using the FetchXML schema.
        /// For efficiency, start with the "entity" node.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var fetchXml = fetchCore;

        if (fetchCore.slice(0, 7) === "<entity") {
            fetchXml =
                [
                   "<fetch mapping='logical'>",
                        fetchCore.replace(/\"/g, "'"),
                   "</fetch>"
                ].join("");
        } else {
            var isAggregate = (fetchCore.indexOf("aggregate=") !== -1);
            var isLimitedReturn = (fetchCore.indexOf("page='1'") !== -1 && fetchCore.indexOf("count='") !== -1);

            var distinctPos = fetchCore.indexOf("distinct=");
            var isDistinct = (distinctPos !== -1);
            var valQuotes = fetchCore.substring(distinctPos + 9, distinctPos + 10);
            var distinctValue = isDistinct
                ? fetchCore.substring(fetchCore.indexOf("distinct=") + 10, fetchCore.indexOf(valQuotes, fetchCore.indexOf("distinct=") + 10))
                : "false";
            var xmlDoc = xmlParser(fetchCore);
            var fetchEntity = selectSingleNode(xmlDoc, "//entity");
            if (fetchEntity === null) {
                throw new Error("XrmServiceToolkit.Fetch: No 'entity' node in the provided FetchXML.");
            }
            var fetchCoreDom = fetchEntity;
            try {
                fetchCore = xmlToString(fetchCoreDom).replace(/\"/g, "'");
            }
            catch (error) {
                if (fetchCoreDom !== undefined && fetchCoreDom.xml) {
                    fetchCore = fetchCoreDom.xml.replace(/\"/g, "'");
                }
                else {
                    throw new Error("XrmServiceToolkit.Fetch: This client does not provide the necessary XML features to continue.");
                }
            }

            if (!isAggregate && !isLimitedReturn) {
                fetchXml =
                 [
                     "<fetch mapping='logical' distinct='" + (isDistinct ? distinctValue : "false") + "' >",
                     fetchCore,
                     "</fetch>"
                 ].join("");
            }
        }

        var request = [
               "<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                   "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                       "<a:KeyValuePairOfstringanyType>",
                           "<b:key>Query</b:key>",
                           "<b:value i:type='a:FetchExpression'>",
                               "<a:Query>", crmXmlEncode(fetchXml), "</a:Query>",
                           "</b:value>",
                       "</a:KeyValuePairOfstringanyType>",
                   "</a:Parameters>",
                   "<a:RequestId i:nil='true'/>",
                   "<a:RequestName>RetrieveMultiple</a:RequestName>",
               "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var fetchResult = selectSingleNode(resultXml, "//a:Entities");
            var moreRecords = (selectSingleNodeText(resultXml, "//a:MoreRecords") === "true");

            var fetchResults = [];
            if (fetchResult != null) {
                for (var ii = 0, olength = fetchResult.childNodes.length; ii < olength; ii++) {
                    var entity = new businessEntity();

                    entity.deserialize(fetchResult.childNodes[ii]);
                    fetchResults.push(entity);
                }

                if (fetchAll && moreRecords) {
                    var pageCookie = selectSingleNodeText(resultXml, "//a:PagingCookie").replace(/\"/g, '\'').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&quot;');

                    fetchMore(fetchCore, 2, pageCookie, fetchResults);
                }

                if (!async)
                    return fetchResults;
                else
                    callback(fetchResults);
            }
            // ReSharper disable once NotAllPathsReturnValue
        });
    };

    var retrieve = function (entityName, id, columnSet, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to retrieve a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for retrieve operations.
        /// </param>
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for retrieve operations.
        /// </param>
        ///<param name="columnSet" type="Array">
        /// A JavaScript Array corresponding to the attributes of
        /// entity that is used for retrieve operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var attributes = "";
        // ReSharper disable AssignedValueIsNeverUsed
        var query = "";
        // ReSharper restore AssignedValueIsNeverUsed
        if (columnSet != null) {
            for (var i = 0, ilength = columnSet.length; i < ilength; i++) {
                attributes += "<c:string>" + columnSet[i] + "</c:string>";
            }
            query = "<a:AllColumns>false</a:AllColumns>" +
                    "<a:Columns xmlns:c='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>" +
                        attributes +
                    "</a:Columns>";
        }
        else {
            query = "<a:AllColumns>true</a:AllColumns><a:Columns xmlns:b='http://schemas.microsoft.com/2003/10/Serialization/Arrays' />";
        }

        var msgBody =
            [
               "<request i:type='a:RetrieveRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                  "<a:KeyValuePairOfstringanyType>",
                    "<b:key>Target</b:key>",
                    "<b:value i:type='a:EntityReference'>",
                      "<a:Id>", encodeValue(id), "</a:Id>",
                      "<a:LogicalName>", entityName, "</a:LogicalName>",
                      "<a:Name i:nil='true' />",
                    "</b:value>",
                  "</a:KeyValuePairOfstringanyType>",
                  "<a:KeyValuePairOfstringanyType>",
                    "<b:key>ColumnSet</b:key>",
                    "<b:value i:type='a:ColumnSet'>",
                      query,
                    "</b:value>",
                  "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Retrieve</a:RequestName>",
              "</request>"
            ].join("");

        var async = !!callback;

        return doRequest(msgBody, "Execute", !!callback, function (resultXml) {
            var retrieveResult = selectSingleNode(resultXml, "//b:value");
            var entity = new businessEntity();
            entity.deserialize(retrieveResult);

            if (!async)
                return entity;
            else
                callback(entity);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var retrieveMultiple = function (query, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a retrieveMultiple request.
        ///</summary>
        ///<param name="query" type="String">
        /// A JavaScript String with properties corresponding to the retrievemultiple request
        /// that are valid for retrievemultiple operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>


        var request = [
           "<request i:type='a:RetrieveMultipleRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
               "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                   "<a:KeyValuePairOfstringanyType>",
                       "<b:key>Query</b:key>",
                       "<b:value i:type='a:QueryExpression'>",
                           query,
                       "</b:value>",
                   "</a:KeyValuePairOfstringanyType>",
               "</a:Parameters>",
               "<a:RequestId i:nil='true'/>",
               "<a:RequestName>RetrieveMultiple</a:RequestName>",
           "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var resultNodes = selectSingleNode(resultXml, "//a:Entities");

            var retriveMultipleResults = [];

            for (var i = 0, ilength = resultNodes.childNodes.length; i < ilength; i++) {
                var entity = new businessEntity();

                entity.deserialize(resultNodes.childNodes[i]);
                retriveMultipleResults[i] = entity;
            }

            if (!async)
                return retriveMultipleResults;
            else
                callback(retriveMultipleResults);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var joinArray = function (prefix, array, suffix) {
        var output = [];
        for (var i = 0, ilength = array.length; i < ilength; i++) {
            if (array[i] !== "" && array[i] != undefined) {
                output.push(prefix, array[i], suffix);
            }
        }
        return output.join("");
    };

    var joinConditionPair = function (attributes, values) {
        var output = [];
        for (var i = 0, ilength = attributes.length; i < ilength; i++) {
            if (attributes[i] !== "") {
                var value1 = values[i];
                if (typeof value1 == typeof []) {
                    output.push("<condition attribute='", attributes[i], "' operator='in' >");

                    for (var valueIndex in value1) {
                        if (value1.hasOwnProperty(valueIndex)) {
                            var value = encodeValue(value1[valueIndex]);
                            output.push("<value>" + value + "</value>");
                        }
                    }

                    output.push("</condition>");
                }
                else if (typeof value1 == typeof "") {
                    output.push("<condition attribute='", attributes[i], "' operator='eq' value='", encodeValue(value1), "' />");
                }
            }
        }
        return output.join("");
    };

    var isArray = function (input) {
        return input.constructor.toString().indexOf("Array") !== -1;
    };

    var queryByAttribute = function (queryOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a queryByAttribute request.
        ///</summary>
        ///<param name="queryOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the queryByAttribute Criteria
        /// that are valid for queryByAttribute operations.
        /// queryOptions.entityName is a string represents the name of the entity
        /// queryOptions.attributes is a array represents the attributes of the entity to query
        /// queryOptions.values is a array represents the values of the attributes to query
        /// queryOptions.columnSet is a array represents the attributes of the entity to return
        /// queryOptions.orderBy is a array represents the order conditions of the results
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var entityName = queryOptions.entityName;
        var attributes = queryOptions.attributes;
        var values = queryOptions.values;
        var columnSet = queryOptions.columnSet;
        var orderBy = queryOptions.orderBy || '';

        attributes = isArray(attributes) ? attributes : [attributes];
        values = isArray(values) ? values : [values];
        orderBy = (!!orderBy && isArray(orderBy)) ? orderBy : [orderBy];
        columnSet = (!!columnSet && isArray(columnSet)) ? columnSet : [columnSet];

        var xml =
                [
                    "<entity name='", entityName, "'>",
                           joinArray("<attribute name='", columnSet, "' />"),
                           joinArray("<order attribute='", orderBy, "' />"),
                        "<filter>",
                              joinConditionPair(attributes, values),
                        "</filter>",
                    "</entity>"
                ].join("");

        return fetch(xml, false, callback);
    };

    var queryAll = function (queryOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a queryAll request. This is to return all records (>5k+).
        /// Consider Performance impact when using this method.
        ///</summary>
        ///<param name="queryOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the queryByAttribute Criteria
        /// that are valid for queryByAttribute operations.
        /// queryOptions.entityName is a string represents the name of the entity
        /// queryOptions.attributes is a array represents the attributes of the entity to query
        /// queryOptions.values is a array represents the values of the attributes to query
        /// queryOptions.columnSet is a array represents the attributes of the entity to return
        /// queryOptions.orderBy is a array represents the order conditions of the results
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var entityName = queryOptions.entityName;
        var attributes = queryOptions.attributes;
        var values = queryOptions.values;
        var columnSet = queryOptions.columnSet;
        var orderBy = queryOptions.orderBy || '';

        attributes = isArray(attributes) ? attributes : [attributes];
        values = isArray(values) ? values : [values];
        orderBy = (!!orderBy && isArray(orderBy)) ? orderBy : [orderBy];
        columnSet = (!!columnSet && isArray(columnSet)) ? columnSet : [columnSet];

        var fetchCore = [
                    "<entity name='", entityName, "'>",
                           joinArray("<attribute name='", columnSet, "' />"),
                           joinArray("<order attribute='", orderBy, "' />"),
                        "<filter>",
                              joinConditionPair(attributes, values),
                        "</filter>",
                    "</entity>"
        ].join("");


        var async = !!callback;

        return fetch(fetchCore, true, async);
    };

    var setState = function (entityName, id, stateCode, statusCode, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to setState of a record.
        ///</summary>
        ///<param name="entityName" type="String">
        /// A JavaScript String corresponding to the Schema name of
        /// entity that is used for setState operations.
        /// </param>
        ///<param name="id" type="String">
        /// A JavaScript String corresponding to the GUID of
        /// entity that is used for setState operations.
        /// </param>
        ///<param name="stateCode" type="Int">
        /// A JavaScript Integer corresponding to the value of
        /// entity state that is used for setState operations.
        /// </param>
        ///<param name="statusCode" type="Int">
        /// A JavaScript Integer corresponding to the value of
        /// entity status that is used for setState operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var request = [
            "<request i:type='b:SetStateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<c:key>EntityMoniker</c:key>",
                        "<c:value i:type='a:EntityReference'>",
                          "<a:Id>", encodeValue(id), "</a:Id>",
                          "<a:LogicalName>", entityName, "</a:LogicalName>",
                          "<a:Name i:nil='true' />",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                      "<a:KeyValuePairOfstringanyType>",
                        "<c:key>State</c:key>",
                        "<c:value i:type='a:OptionSetValue'>",
                          "<a:Value>", stateCode.toString(), "</a:Value>",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                      "<a:KeyValuePairOfstringanyType>",
                        "<c:key>Status</c:key>",
                        "<c:value i:type='a:OptionSetValue'>",
                          "<a:Value>", statusCode.toString(), "</a:Value>",
                        "</c:value>",
                      "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>SetState</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var associate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to associate records.
        ///</summary>
        ///<param name="relationshipName" type="String">
        /// A JavaScript String corresponding to the relationship name
        /// that is used for associate operations.
        /// </param>
        ///<param name="targetEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the target entity
        /// that is used for associate operations.
        /// </param>
        ///<param name="targetId" type="String">
        /// A JavaScript String corresponding to the GUID of the target entity
        /// that is used for associate operations.
        /// </param>
        ///<param name="relatedEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the related entity
        /// that is used for associate operations.
        /// </param>
        ///<param name="relationshipBusinessEntities" type="Array">
        /// A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
        /// that is used for associate operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var relatedEntities = relatedBusinessEntities;

        relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities];

        var output = [];
        for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
            if (relatedEntities[i].id !== "") {
                output.push("<a:EntityReference>",
                                "<a:Id>", relatedEntities[i].id, "</a:Id>",
                                "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                            "</a:EntityReference>");
            }
        }

        var relatedXml = output.join("");

        var request = [
            "<request i:type='a:AssociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Target</b:key>",
                        "<b:value i:type='a:EntityReference'>",
                            "<a:Id>", encodeValue(targetId), "</a:Id>",
                            "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                            "<a:Name i:nil='true' />",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Relationship</b:key>",
                        "<b:value i:type='a:Relationship'>",
                            "<a:PrimaryEntityRole>Referenced</a:PrimaryEntityRole>",
                            "<a:SchemaName>", relationshipName, "</a:SchemaName>",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>RelatedEntities</b:key>",
                    "<b:value i:type='a:EntityReferenceCollection'>",
                        relatedXml,
                    "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Associate</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var disassociate = function (relationshipName, targetEntityName, targetId, relatedEntityName, relatedBusinessEntities, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to disassociate records.
        ///</summary>
        ///<param name="relationshipName" type="String">
        /// A JavaScript String corresponding to the relationship name
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="targetEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the target entity
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="targetId" type="String">
        /// A JavaScript String corresponding to the GUID of the target entity
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="relatedEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the related entity
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="relationshipBusinessEntities" type="Array">
        /// A JavaScript Array corresponding to the collection of the related entities as BusinessEntity
        /// that is used for disassociate operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>
        var relatedEntities = relatedBusinessEntities;

        relatedEntities = isArray(relatedEntities) ? relatedEntities : [relatedEntities];

        var output = [];
        for (var i = 0, ilength = relatedEntities.length; i < ilength; i++) {
            if (relatedEntities[i].id !== "") {
                output.push("<a:EntityReference>",
                                "<a:Id>", relatedEntities[i].id, "</a:Id>",
                                "<a:LogicalName>", relatedEntityName, "</a:LogicalName>",
                                "<a:Name i:nil='true' />",
                            "</a:EntityReference>");
            }
        }

        var relatedXml = output.join("");

        var request = [
            "<request i:type='a:DisassociateRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts'>",
                "<a:Parameters xmlns:b='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Target</b:key>",
                        "<b:value i:type='a:EntityReference'>",
                            "<a:Id>", encodeValue(targetId), "</a:Id>",
                            "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                            "<a:Name i:nil='true' />",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>Relationship</b:key>",
                        "<b:value i:type='a:Relationship'>",
                            "<a:PrimaryEntityRole i:nil='true' />",
                            "<a:SchemaName>", relationshipName, "</a:SchemaName>",
                        "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                    "<b:key>RelatedEntities</b:key>",
                    "<b:value i:type='a:EntityReferenceCollection'>",
                        relatedXml,
                    "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>Disassociate</a:RequestName>",
            "</request>"
        ].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var getCurrentUserId = function () {
        ///<summary>
        /// Sends synchronous request to retrieve the GUID of the current user.
        ///</summary>
        var request = [
                "<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />",
                "<a:RequestId i:nil='true' />",
                "<a:RequestName>WhoAmI</a:RequestName>",
                "</request>"
        ].join("");
        var xmlDoc = doRequest(request, "Execute");

        return getNodeText(selectNodes(xmlDoc, "//b:value")[0]);

    };

    var getCurrentUserBusinessUnitId = function () {
        ///<summary>
        /// Sends synchronous request to retrieve the GUID of the current user's business unit.
        ///</summary>
        var request = ["<request i:type='b:WhoAmIRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic' />",
                        "<a:RequestId i:nil='true' />",
                        "<a:RequestName>WhoAmI</a:RequestName>",
                      "</request>"].join("");
        var xmlDoc = doRequest(request, "Execute");

        return getNodeText(selectNodes(xmlDoc, "//b:value")[1]);
    };

    var getCurrentUserRoles = function () {
        ///<summary>
        /// Sends synchronous request to retrieve the list of the current user's roles.
        ///</summary>
        var xml =
                [
                    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
                      "<entity name='role'>",
                        "<attribute name='name' />",
                        "<attribute name='businessunitid' />",
                        "<attribute name='roleid' />",
                        "<order attribute='name' descending='false' />" +
                        "<link-entity name='systemuserroles' from='roleid' to='roleid' visible='false' intersect='true'>",
                          "<link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='aa'>",
                            "<filter type='and'>",
                              "<condition attribute='systemuserid' operator='eq-userid' />",
                            "</filter>",
                          "</link-entity>",
                        "</link-entity>",
                      "</entity>",
                    "</fetch>"
                ].join("");

        var fetchResult = fetch(xml);
        var roles = [];

        if (fetchResult !== null && typeof fetchResult != 'undefined') {
            for (var i = 0, ilength = fetchResult.length; i < ilength; i++) {
                roles[i] = fetchResult[i].attributes["name"].value;
            }
        }

        return roles;
    };

    var isCurrentUserInRole = function () {
        ///<summary>
        /// Sends synchronous request to check if the current user has certain roles
        /// Passes name of role as arguments. For example, IsCurrentUserInRole('System Administrator')
        /// Returns true or false.
        ///</summary>
        var roles = getCurrentUserRoles();
        for (var i = 0, ilength = roles.length; i < ilength; i++) {
            for (var j = 0, jlength = arguments.length; j < jlength; j++) {
                if (roles[i] === arguments[j]) {
                    return true;
                }
            }
        }

        return false;
    };

    var assign = function (targetEntityName, targetId, assigneeEntityName, assigneeId, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to assign an existing record to a user / a team.
        ///</summary>
        ///<param name="targetEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the target entity
        /// that is used for assign operations.
        /// </param>
        ///<param name="targetId" type="String">
        /// A JavaScript String corresponding to the GUID of the target entity
        /// that is used for assign operations.
        /// </param>
        ///<param name="assigneeEntityName" type="String">
        /// A JavaScript String corresponding to the schema name of the assignee entity
        /// that is used for assign operations.
        /// </param>
        ///<param name="assigneeId" type="String">
        /// A JavaScript String corresponding to the GUID of the assignee entity
        /// that is used for assign operations.
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var request = ["<request i:type='b:AssignRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
                        "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Target</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(targetId), "</a:Id>",
                              "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                          "<a:KeyValuePairOfstringanyType>",
                            "<c:key>Assignee</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(assigneeId), "</a:Id>",
                              "<a:LogicalName>", assigneeEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
                          "</a:KeyValuePairOfstringanyType>",
                        "</a:Parameters>",
                        "<a:RequestId i:nil='true' />",
                        "<a:RequestName>Assign</a:RequestName>",
                      "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var grantAccess = function (accessOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a grantAccess request.
        /// Levels of Access Options are: AppendAccess, AppendToAccess, AssignAccess, CreateAccess, DeleteAccess, None, ReadAccess, ShareAccess, and WriteAccess
        ///</summary>
        ///<param name="accessOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the grantAccess Criteria
        /// that are valid for grantAccess operations.
        /// accessOptions.targetEntityName is a string represents the name of the target entity
        /// accessOptions.targetEntityId is a string represents the GUID of the target entity
        /// accessOptions.principalEntityName is a string represents the name of the principal entity
        /// accessOptions.principalEntityId is a string represents the GUID of the principal entity
        /// accessOptions.accessRights is a array represents the access conditions of the results
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var targetEntityName = accessOptions.targetEntityName;
        var targetEntityId = accessOptions.targetEntityId;
        var principalEntityName = accessOptions.principalEntityName;
        var principalEntityId = accessOptions.principalEntityId;
        var accessRights = accessOptions.accessRights;

        accessRights = isArray(accessRights) ? accessRights : [accessRights];

        var accessRightString = "";
        for (var i = 0, ilength = accessRights.length; i < ilength; i++) {
            accessRightString += encodeValue(accessRights[i]) + " ";
        }

        var request = ["<request i:type='b:GrantAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
	                    "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
	                      "<a:KeyValuePairOfstringanyType>",
		                    "<c:key>Target</c:key>",
		                    "<c:value i:type='a:EntityReference'>",
		                      "<a:Id>", encodeValue(targetEntityId), "</a:Id>",
		                      "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
		                      "<a:Name i:nil='true' />",
		                    "</c:value>",
	                      "</a:KeyValuePairOfstringanyType>",
	                      "<a:KeyValuePairOfstringanyType>",
		                    "<c:key>PrincipalAccess</c:key>",
		                    "<c:value i:type='b:PrincipalAccess'>",
		                      "<b:AccessMask>", accessRightString, "</b:AccessMask>",
		                      "<b:Principal>",
			                    "<a:Id>", encodeValue(principalEntityId), "</a:Id>",
			                    "<a:LogicalName>", principalEntityName, "</a:LogicalName>",
			                    "<a:Name i:nil='true' />",
		                      "</b:Principal>",
		                    "</c:value>",
	                      "</a:KeyValuePairOfstringanyType>",
	                    "</a:Parameters>",
	                    "<a:RequestId i:nil='true' />",
	                    "<a:RequestName>GrantAccess</a:RequestName>",
                    "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var modifyAccess = function (accessOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a modifyAccess request.
        /// Levels of Access Options are: AppendAccess, AppendToAccess, AssignAccess, CreateAccess, DeleteAccess, None, ReadAccess, ShareAccess, and WriteAccess
        ///</summary>
        ///<param name="accessOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the modifyAccess Criteria
        /// that are valid for modifyAccess operations.
        /// accessOptions.targetEntityName is a string represents the name of the target entity
        /// accessOptions.targetEntityId is a string represents the GUID of the target entity
        /// accessOptions.principalEntityName is a string represents the name of the principal entity
        /// accessOptions.principalEntityId is a string represents the GUID of the principal entity
        /// accessOptions.accessRights is a array represents the access conditions of the results
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var targetEntityName = accessOptions.targetEntityName;
        var targetEntityId = accessOptions.targetEntityId;
        var principalEntityName = accessOptions.principalEntityName;
        var principalEntityId = accessOptions.principalEntityId;
        var accessRights = accessOptions.accessRights;

        accessRights = isArray(accessRights) ? accessRights : [accessRights];

        var accessRightString = "";
        for (var i = 0, ilength = accessRights.length; i < ilength; i++) {
            accessRightString += encodeValue(accessRights[i]) + " ";
        }

        var request = ["<request i:type='b:ModifyAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
	                    "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
	                      "<a:KeyValuePairOfstringanyType>",
		                    "<c:key>Target</c:key>",
		                    "<c:value i:type='a:EntityReference'>",
		                      "<a:Id>", encodeValue(targetEntityId), "</a:Id>",
		                      "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
		                      "<a:Name i:nil='true' />",
		                    "</c:value>",
	                      "</a:KeyValuePairOfstringanyType>",
	                      "<a:KeyValuePairOfstringanyType>",
		                    "<c:key>PrincipalAccess</c:key>",
		                    "<c:value i:type='b:PrincipalAccess'>",
		                      "<b:AccessMask>", accessRightString, "</b:AccessMask>",
		                      "<b:Principal>",
			                    "<a:Id>", encodeValue(principalEntityId), "</a:Id>",
			                    "<a:LogicalName>", principalEntityName, "</a:LogicalName>",
			                    "<a:Name i:nil='true' />",
		                      "</b:Principal>",
		                    "</c:value>",
	                      "</a:KeyValuePairOfstringanyType>",
	                    "</a:Parameters>",
	                    "<a:RequestId i:nil='true' />",
	                    "<a:RequestName>ModifyAccess</a:RequestName>",
                    "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var revokeAccess = function (accessOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a revokeAccess request.
        ///</summary>
        ///<param name="accessOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the revokeAccess Criteria
        /// that are valid for revokeAccess operations.
        /// accessOptions.targetEntityName is a string represents the name of the target entity
        /// accessOptions.targetEntityId is a string represents the GUID of the target entity
        /// accessOptions.revokeeEntityName is a string represents the name of the revokee entity
        /// accessOptions.revokeeEntityId is a string represents the GUID of the revokee entity
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var targetEntityName = accessOptions.targetEntityName;
        var targetEntityId = accessOptions.targetEntityId;
        var revokeeEntityName = accessOptions.revokeeEntityName;
        var revokeeEntityId = accessOptions.revokeeEntityId;

        var request = ["<request i:type='b:RevokeAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
	                    "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
	                      "<a:KeyValuePairOfstringanyType>",
		                    "<c:key>Target</c:key>",
		                    "<c:value i:type='a:EntityReference'>",
		                      "<a:Id>", encodeValue(targetEntityId), "</a:Id>",
		                      "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
		                      "<a:Name i:nil='true' />",
		                    "</c:value>",
	                      "</a:KeyValuePairOfstringanyType>",
	                      "<a:KeyValuePairOfstringanyType>",
		                    "<c:key>Revokee</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(revokeeEntityId), "</a:Id>",
                              "<a:LogicalName>", revokeeEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
	                      "</a:KeyValuePairOfstringanyType>",
	                    "</a:Parameters>",
	                    "<a:RequestId i:nil='true' />",
	                    "<a:RequestName>RevokeAccess</a:RequestName>",
                    "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var responseText = selectSingleNodeText(resultXml, "//ser:ExecuteResult");
            var result = crmXmlDecode(responseText);
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var retrievePrincipalAccess = function (accessOptions, callback) {
        ///<summary>
        /// Sends synchronous/asynchronous request to do a retrievePrincipalAccess request.
        ///</summary>
        ///<param name="accessOptions" type="Object">
        /// A JavaScript Object with properties corresponding to the retrievePrincipalAccess Criteria
        /// that are valid for retrievePrincipalAccess operations.
        /// accessOptions.targetEntityName is a string represents the name of the target entity
        /// accessOptions.targetEntityId is a string represents the GUID of the target entity
        /// accessOptions.principalEntityName is a string represents the name of the principal entity
        /// accessOptions.principalEntityId is a string represents the GUID of the principal entity
        /// </param>
        ///<param name="callback" type="Function">
        /// A Function used for asynchronous request. If not defined, it sends a synchronous request.
        /// </param>

        var targetEntityName = accessOptions.targetEntityName;
        var targetEntityId = accessOptions.targetEntityId;
        var principalEntityName = accessOptions.principalEntityName;
        var principalEntityId = accessOptions.principalEntityId;

        var request = ["<request i:type='b:RetrievePrincipalAccessRequest' xmlns:a='http://schemas.microsoft.com/xrm/2011/Contracts' xmlns:b='http://schemas.microsoft.com/crm/2011/Contracts'>",
	                    "<a:Parameters xmlns:c='http://schemas.datacontract.org/2004/07/System.Collections.Generic'>",
	                      "<a:KeyValuePairOfstringanyType>",
		                    "<c:key>Target</c:key>",
		                    "<c:value i:type='a:EntityReference'>",
		                      "<a:Id>", encodeValue(targetEntityId), "</a:Id>",
		                      "<a:LogicalName>", targetEntityName, "</a:LogicalName>",
		                      "<a:Name i:nil='true' />",
		                    "</c:value>",
	                      "</a:KeyValuePairOfstringanyType>",
	                      "<a:KeyValuePairOfstringanyType>",
		                    "<c:key>Principal</c:key>",
                            "<c:value i:type='a:EntityReference'>",
                              "<a:Id>", encodeValue(principalEntityId), "</a:Id>",
                              "<a:LogicalName>", principalEntityName, "</a:LogicalName>",
                              "<a:Name i:nil='true' />",
                            "</c:value>",
	                      "</a:KeyValuePairOfstringanyType>",
	                    "</a:Parameters>",
	                    "<a:RequestId i:nil='true' />",
	                    "<a:RequestName>RetrievePrincipalAccess</a:RequestName>",
                    "</request>"].join("");
        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var result = selectSingleNodeText(resultXml, "//b:value");
            if (!async)
                return result;
            else
                callback(result);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    // Added in 1.4.1 for metadata retrieval 
    // Inspired From Microsoft SDK code to retrieve Metadata using JavaScript
    // Copyright (C) Microsoft Corporation.  All rights reserved.
    var arrayElements = ["Attributes",
                         "ManyToManyRelationships",
                         "ManyToOneRelationships",
                         "OneToManyRelationships",
                         "Privileges",
                         "LocalizedLabels",
                         "Options",
                         "Targets"];

    var isMetadataArray = function (elementName) {
        for (var i = 0, ilength = arrayElements.length; i < ilength; i++) {
            if (elementName === arrayElements[i]) {
                return true;
            }
        }
        return false;
    };

    var getNodeName = function (node) {
        if (typeof (node.baseName) != "undefined") {
            return node.baseName;
        }
        else {
            return node.localName;
        }
    };

    var objectifyNode = function (node) {
        //Check for null
        if (node.attributes != null && node.attributes.length === 1) {
            if (node.attributes.getNamedItem("i:nil") != null && node.attributes.getNamedItem("i:nil").nodeValue === "true") {
                return null;
            }
        }

        //Check if it is a value
        if ((node.firstChild != null) && (node.firstChild.nodeType === 3)) {
            var nodeName = getNodeName(node);

            switch (nodeName) {
                //Integer Values        
                case "ActivityTypeMask":
                case "ObjectTypeCode":
                case "ColumnNumber":
                case "DefaultFormValue":
                case "MaxValue":
                case "MinValue":
                case "MaxLength":
                case "Order":
                case "Precision":
                case "PrecisionSource":
                case "LanguageCode":
                    return parseInt(node.firstChild.nodeValue, 10);
                    // Boolean values
                case "AutoRouteToOwnerQueue":
                case "CanBeChanged":
                case "CanTriggerWorkflow":
                case "IsActivity":
                case "IsActivityParty":
                case "IsAvailableOffline":
                case "IsChildEntity":
                case "IsCustomEntity":
                case "IsCustomOptionSet":
                case "IsDocumentManagementEnabled":
                case "IsEnabledForCharts":
                case "IsGlobal":
                case "IsImportable":
                case "IsIntersect":
                case "IsManaged":
                case "IsReadingPaneEnabled":
                case "IsValidForAdvancedFind":
                case "CanBeSecuredForCreate":
                case "CanBeSecuredForRead":
                case "CanBeSecuredForUpdate":
                case "IsCustomAttribute":
                case "IsPrimaryId":
                case "IsPrimaryName":
                case "IsSecured":
                case "IsValidForCreate":
                case "IsValidForRead":
                case "IsValidForUpdate":
                case "IsCustomRelationship":
                case "CanBeBasic":
                case "CanBeDeep":
                case "CanBeGlobal":
                case "CanBeLocal":
                    return (node.firstChild.nodeValue === "true") ? true : false;
                    //OptionMetadata.Value and BooleanManagedProperty.Value and AttributeRequiredLevelManagedProperty.Value
                case "Value":
                    //BooleanManagedProperty.Value
                    if ((node.firstChild.nodeValue === "true") || (node.firstChild.nodeValue === "false")) {
                        return (node.firstChild.nodeValue === "true") ? true : false;
                    }
                    //AttributeRequiredLevelManagedProperty.Value
                    if (
                          (node.firstChild.nodeValue === "ApplicationRequired") ||
                          (node.firstChild.nodeValue === "None") ||
                          (node.firstChild.nodeValue === "Recommended") ||
                          (node.firstChild.nodeValue === "SystemRequired")
                       ) {
                        return node.firstChild.nodeValue;
                    }
                    else {
                        //OptionMetadata.Value
                        return parseInt(node.firstChild.nodeValue, 10);
                    }
                    // ReSharper disable JsUnreachableCode
                    break;
                    // ReSharper restore JsUnreachableCode   
                    //String values        
                default:
                    return node.firstChild.nodeValue;
            }

        }

        //Check if it is a known array
        if (isMetadataArray(getNodeName(node))) {
            var arrayValue = [];
            for (var iii = 0, tempLength = node.childNodes.length; iii < tempLength; iii++) {
                var objectTypeName;
                if ((node.childNodes[iii].attributes != null) && (node.childNodes[iii].attributes.getNamedItem("i:type") != null)) {
                    objectTypeName = node.childNodes[iii].attributes.getNamedItem("i:type").nodeValue.split(":")[1];
                }
                else {

                    objectTypeName = getNodeName(node.childNodes[iii]);
                }

                var b = objectifyNode(node.childNodes[iii]);
                b._type = objectTypeName;
                arrayValue.push(b);

            }

            return arrayValue;
        }

        //Null entity description labels are returned as <label/> - not using i:nil = true;
        if (node.childNodes.length === 0) {
            return null;
        }

        //Otherwise return an object
        var c = {};
        if (node.attributes.getNamedItem("i:type") != null) {
            c._type = node.attributes.getNamedItem("i:type").nodeValue.split(":")[1];
        }
        for (var i = 0, ilength = node.childNodes.length; i < ilength; i++) {
            if (node.childNodes[i].nodeType === 3) {
                c[getNodeName(node.childNodes[i])] = node.childNodes[i].nodeValue;
            }
            else {
                c[getNodeName(node.childNodes[i])] = objectifyNode(node.childNodes[i]);
            }

        }
        return c;
    };

    var retrieveAllEntitiesMetadata = function (entityFilters, retrieveIfPublished, callback) {
        ///<summary>
        /// Sends an synchronous/asynchronous RetrieveAllEntitieMetadata Request to retrieve all entities metadata in the system
        ///</summary>
        ///<returns>Entity Metadata Collection</returns>
        ///<param name="entityFilters" type="Array">
        /// The filter array available to filter which data is retrieved. Case Sensitive filters [Entity,Attributes,Privileges,Relationships]
        /// Include only those elements of the entity you want to retrieve in the array. Retrieving all parts of all entities may take significant time.
        ///</param>
        ///<param name="retrieveIfPublished" type="Boolean">
        /// Sets whether to retrieve the metadata that has not been published.
        ///</param>
        ///<param name="callBack" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function also used as an indicator if the function is synchronous/asynchronous
        ///</param>

        entityFilters = isArray(entityFilters) ? entityFilters : [entityFilters];
        var entityFiltersString = "";
        for (var iii = 0, templength = entityFilters.length; iii < templength; iii++) {
            entityFiltersString += encodeValue(entityFilters[iii]) + " ";
        }

        var request = [
             "<request i:type=\"a:RetrieveAllEntitiesRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">",
              "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>EntityFilters</b:key>",
                "<b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">" + encodeValue(entityFiltersString) + "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>RetrieveAsIfPublished</b:key>",
                "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">" + encodeValue(retrieveIfPublished.toString()) + "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
              "</a:Parameters>",
              "<a:RequestId i:nil=\"true\" />",
              "<a:RequestName>RetrieveAllEntities</a:RequestName>",
            "</request>"].join("");

        var async = !!callback;
        return doRequest(request, "Execute", async, function (resultXml) {
            var response = selectNodes(resultXml, "//c:EntityMetadata");

            var results = [];
            for (var i = 0, ilength = response.length; i < ilength; i++) {
                var a = objectifyNode(response[i]);
                a._type = "EntityMetadata";
                results.push(a);
            }

            if (!async)
                return results;
            else
                callback(results);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var retrieveEntityMetadata = function (entityFilters, logicalName, retrieveIfPublished, callback) {
        ///<summary>
        /// Sends an synchronous/asynchronous RetreiveEntityMetadata Request to retrieve a particular entity metadata in the system
        ///</summary>
        ///<returns>Entity Metadata</returns>
        ///<param name="entityFilters" type="String">
        /// The filter string available to filter which data is retrieved. Case Sensitive filters [Entity,Attributes,Privileges,Relationships]
        /// Include only those elements of the entity you want to retrieve in the array. Retrieving all parts of all entities may take significant time.
        ///</param>
        ///<param name="logicalName" type="String">
        /// The string of the entity logical name
        ///</param>
        ///<param name="retrieveIfPublished" type="Boolean">
        /// Sets whether to retrieve the metadata that has not been published.
        ///</param>
        ///<param name="callBack" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function also used as an indicator if the function is synchronous/asynchronous
        ///</param>

        entityFilters = isArray(entityFilters) ? entityFilters : [entityFilters];
        var entityFiltersString = "";
        for (var iii = 0, templength = entityFilters.length; iii < templength; iii++) {
            entityFiltersString += encodeValue(entityFilters[iii]) + " ";
        }

        var request = [
            "<request i:type=\"a:RetrieveEntityRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">",
                "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>EntityFilters</b:key>",
                        "<b:value i:type=\"c:EntityFilters\" xmlns:c=\"http://schemas.microsoft.com/xrm/2011/Metadata\">", encodeValue(entityFiltersString), "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>MetadataId</b:key>",
                        "<b:value i:type=\"c:guid\"  xmlns:c=\"http://schemas.microsoft.com/2003/10/Serialization/\">", encodeValue("00000000-0000-0000-0000-000000000000"), "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>RetrieveAsIfPublished</b:key>",
                        "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(retrieveIfPublished.toString()), "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                    "<a:KeyValuePairOfstringanyType>",
                        "<b:key>LogicalName</b:key>",
                        "<b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(logicalName), "</b:value>",
                    "</a:KeyValuePairOfstringanyType>",
                "</a:Parameters>",
                "<a:RequestId i:nil=\"true\" />",
                "<a:RequestName>RetrieveEntity</a:RequestName>",
             "</request>"].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var response = selectNodes(resultXml, "//b:value");

            var results = [];
            for (var i = 0, ilength = response.length; i < ilength; i++) {
                var a = objectifyNode(response[i]);
                a._type = "EntityMetadata";
                results.push(a);
            }

            if (!async)
                return results;
            else
                callback(results);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    var retrieveAttributeMetadata = function (entityLogicalName, attributeLogicalName, retrieveIfPublished, callback) {
        ///<summary>
        /// Sends an synchronous/asynchronous RetrieveAttributeMetadata Request to retrieve a particular entity's attribute metadata in the system
        ///</summary>
        ///<returns>Entity Metadata</returns>
        ///<param name="entityLogicalName" type="String">
        /// The string of the entity logical name
        ///</param>
        ///<param name="attributeLogicalName" type="String">
        /// The string of the entity's attribute logical name
        ///</param>
        ///<param name="retrieveIfPublished" type="Boolean">
        /// Sets whether to retrieve the metadata that has not been published.
        ///</param>
        ///<param name="callBack" type="Function">
        /// The function that will be passed through and be called by a successful response.
        /// This function also used as an indicator if the function is synchronous/asynchronous
        ///</param>

        var request = [
             "<request i:type=\"a:RetrieveAttributeRequest\" xmlns:a=\"http://schemas.microsoft.com/xrm/2011/Contracts\">",
              "<a:Parameters xmlns:b=\"http://schemas.datacontract.org/2004/07/System.Collections.Generic\">",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>EntityLogicalName</b:key>",
                "<b:value i:type=\"c:string\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(entityLogicalName), "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>MetadataId</b:key>",
                "<b:value i:type=\"ser:guid\"  xmlns:ser=\"http://schemas.microsoft.com/2003/10/Serialization/\">", encodeValue("00000000-0000-0000-0000-000000000000"), "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
                "<a:KeyValuePairOfstringanyType>",
                "<b:key>RetrieveAsIfPublished</b:key>",
              "<b:value i:type=\"c:boolean\" xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(retrieveIfPublished.toString()), "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
               "<a:KeyValuePairOfstringanyType>",
                "<b:key>LogicalName</b:key>",
                "<b:value i:type=\"c:string\"   xmlns:c=\"http://www.w3.org/2001/XMLSchema\">", encodeValue(attributeLogicalName), "</b:value>",
               "</a:KeyValuePairOfstringanyType>",
              "</a:Parameters>",
              "<a:RequestId i:nil=\"true\" />",
              "<a:RequestName>RetrieveAttribute</a:RequestName>",
             "</request>"].join("");

        var async = !!callback;

        return doRequest(request, "Execute", async, function (resultXml) {
            var response = selectNodes(resultXml, "//b:value");
            var results = [];
            for (var i = 0, ilength = response.length; i < ilength; i++) {
                var a = objectifyNode(response[i]);
                results.push(a);
            }

            if (!async)
                return results;
            else
                callback(results);
            // ReSharper disable NotAllPathsReturnValue
        });
        // ReSharper restore NotAllPathsReturnValue
    };

    //Toolkit's Return Static Methods
    return {
        BusinessEntity: businessEntity,
        Execute: execute,
        Fetch: fetch,
        Retrieve: retrieve,
        RetrieveMultiple: retrieveMultiple,
        Create: sCreate,
        Update: sUpdate,
        Delete: sDelete,
        QueryByAttribute: queryByAttribute,
        QueryAll: queryAll,
        SetState: setState,
        Associate: associate,
        Disassociate: disassociate,
        Assign: assign,
        RetrievePrincipalAccess: retrievePrincipalAccess,
        GrantAccess: grantAccess,
        ModifyAccess: modifyAccess,
        RevokeAccess: revokeAccess,
        GetCurrentUserId: getCurrentUserId,
        GetCurrentUserBusinessUnitId: getCurrentUserBusinessUnitId,
        GetCurrentUserRoles: getCurrentUserRoles,
        IsCurrentUserRole: isCurrentUserInRole,
        RetrieveAllEntitiesMetadata: retrieveAllEntitiesMetadata,
        RetrieveEntityMetadata: retrieveEntityMetadata,
        RetrieveAttributeMetadata: retrieveAttributeMetadata
    };
})
