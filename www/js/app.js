// Ionic Starter App
Xrm = window.Xrm || { __namespace: true };
Xrm.CRMAuth = Xrm.CRMAuth || { __namespace: true };
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var starter = angular.module('starter', ['angles', 'ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.directive', 'starter.filter', 'LocalStorageModule', 'ngMessages', 'ngAutocomplete'])

.run(function ($ionicPlatform, $rootScope, $cordovaNetwork, $ionicPopup) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
            alert('online');
            //$scope.isOnline = true;
            //$scope.network = $cordovaNetwork.getNetwork();

            //$scope.$apply();
        })

        // listen for Offline event
        $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
            $ionicPopup.confirm({
                title: "Internet Disconnected",
                content: "The internet is disconnected on your device."
            }).then(function (result) {
                if (!result) {
                    ionic.Platform.exitApp();
                }
            });

        })
    });
})


.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})

//.run(['authService', function (authService) {
//    authService.fillAuthData();
//}])

.constant('ngAuthSettings', {
    //apiServiceBaseUri: 'http://localhost:57934/',
     apiServiceBaseUri: 'https://parature.webfortis.com/WebMobile/',
    clientId: 'ngAuthApp'
})
.constant('$ionicLoadingConfig', {
    template: 'Logging Out...'
})
//.constant('$ionicLoadingConfig1', {
//        template: 'Record Saving...'
// })
 //.config(function($ionicConfigProvider) {
 //       $ionicConfigProvider.views.maxCache(5);
 //})
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })
  .state('app.signin', {
      url: "/signin",
      views: {
          'menuContent': {
              templateUrl: "templates/signin.html",
              controller: 'AppCtrl'
          }
      }
  }) 
         .state('app.home', {
             url: "/home",
             views: {
                 'menuContent': {
                     templateUrl: "templates/home.html",
                     controller: 'HomeController'
                 }
             }
         })
    .state('app.account', {
        url: "/account/:type",
        views: {
            'menuContent': {
                templateUrl: "templates/account.html",
                controller: 'AccountCotroller'
            }
        }
    })
        .state('app.account-details', {
            url: "/account-details",
            views: {
                'menuContent': {
                    templateUrl: "templates/account-details.html",
                    controller: 'DetailsAccCotroller'
                }
            }
        })
     .state('app.contact', {

         url: "/contact/:type",
         views: {
             'menuContent': {
                 templateUrl: "templates/contact.html",
                 controller: 'ContactCotroller'
             }
         }
     })
         .state('app.contact-details', {
             url: "/contact-details",
             views: {
                 'menuContent': {
                     templateUrl: "templates/contact-details.html",
                     controller: 'DetailsContController'
                 }
             }
         })
         .state('app.incident', {
             url: "/incident",
             views: {
                 'menuContent': {
                     templateUrl: "templates/incident.html",
                     controller: 'IncidentController'
                 }
             }
         })
        .state('app.incident-details', {
            url: "/incident-details",
            views: {
                'menuContent': {
                    templateUrl: "templates/incident-details.html",
                    controller: 'DetailsIncController'
                }
            }
        })

         .state('app.lead', {
             url: "/lead/:type",
             views: {
                 'menuContent': {
                     templateUrl: "templates/lead.html",
                     controller: 'LeadController'
                 }
             }
         })

         .state('app.lead-details', {
             url: "/lead-details",
             views: {
                 'menuContent': {
                     templateUrl: "templates/lead-details.html",
                     controller: 'DetailsLeadController'
                 }
             }
         })
         .state('app.phonecall', {
             url: "/phonecall/:type",
             views: {
                 'menuContent': {
                     templateUrl: "templates/phonecall.html",
                     controller: 'PhoneCallController'
                 }
             }
         })
    .state('app.phone-details', {
        url: "/phone-details",
        views: {
            'menuContent': {
                templateUrl: "templates/phone-details.html",
                controller: 'DetailsPhoneController'
            }
        }
    })
    .state('app.task', {
        url: "/task/:type",
        views: {
            'menuContent': {
                templateUrl: "templates/task.html",
                controller: 'TaskController'
            }
        }
    })        
    .state('app.task-details', {
        url: "/task-details",
        views: {
            'menuContent': {
                templateUrl: "templates/task-details.html",
                controller: 'DetailsTaskController'
            }
        }
    })
   .state('app.opportunity', {
       url: "/opportunity/:type",
    views: {
        'menuContent': {
            templateUrl: "templates/opportunity.html",
            controller: 'OpportunityController'
         }
      }
   })
         .state('app.opportunity-details', {
             url: "/opportunity-details",
             views: {
                 'menuContent': {
                     templateUrl: "templates/opportunity-details.html",
                     controller: 'DetailsOppoController'
                 }
             }
         })
    .state('app.campaigns', {
        url: "/campaigns/:type",
        views: {
            'menuContent': {
                templateUrl: "templates/campaigns.html",
                controller: 'CampaignsController'
            }
        }
    })
    .state('app.campaigns-details', {
        url: "/campaigns-details",
        views: {
            'menuContent': {
                templateUrl: "templates/campaigns-details.html",
                controller: 'DetailsCampCotroller'
            }
        }
    })
    .state('app.signup', {
        url: "/signup",
        views: {
            'menuContent': {
                templateUrl: "templates/signup.html",
                controller: 'SignupController'
            }
        }
    })
     .state('app.landing', {
         url: "/landing",
         views: {
             'menuContent': {
                 templateUrl: "templates/landing.html",
                 controller: 'SignupController'
             }
         }
     })
    
     .state('app.searchaccounts', {
         url: "/searchaccounts",
         views: {
             'menuContent': {
                 templateUrl: "templates/searchaccounts.html",
                 controller: 'AccountCotroller'
             }
         }
     })
     .state('app.searchcontact', {
         url: "/searchcontact",
         views: {
             'menuContent': {
                 templateUrl: "templates/searchcontact.html",
                 controller: 'ContactCotroller'
             }
         }
     })
    .state('app.searchappo', {
        url: "/searchappo",
        views: {
            'menuContent': {
                templateUrl: "templates/searchappo.html",
                controller: 'OpportunityController'
            }
        }
    })
    ///Add Section
      .state('app.addaccounts', {
          url: "/addaccounts",
          views: {
              'menuContent': {
                  templateUrl: "templates/addaccounts.html",
                  controller: 'AccountCotroller'
              }
          }
      })
    .state('app.addcontacts', {
        url: "/addcontacts",
        views: {
            'menuContent': {
                templateUrl: "templates/addcontacts.html",
                controller: 'ContactCotroller'
            }
        }
    })
    .state('app.addleads', {
        url: "/addleads",
        views: {
            'menuContent': {
                templateUrl: "templates/addleads.html",
                controller: 'LeadController'
            }
        }
    })
     .state('app.addopporttunity', {
         url: "/addopporttunity",
         views: {
             'menuContent': {
                 templateUrl: "templates/addopporttunity.html",
                 controller: 'OpportunityController'
             }
         }
     })
      .state('app.addtask', {
          url: "/addtask",
          views: {
              'menuContent': {
                  templateUrl: "templates/addtask.html",
                  controller: 'TaskController'
              }
          }
      })
    .state('app.addphonecall', {
        url: "/addphonecall",
        views: {
            'menuContent': {
                templateUrl: "templates/addphonecall.html",
                controller: 'PhoneCallController'
            }
        }
    })
     .state('app.timeline', {
         url: "/timeline",
         views: {
             'menuContent': {
                 templateUrl: "templates/timeline.html",
                 controller: 'TimeLineController'
             }
         }
     })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/signup');
    //Account = 1;
    //Contact = 2;
    //Task = 4212;
    //Opportunity = 3;
    //Lead = 4;
    //email = 4202;
    //SystemUser =8;
    //PhoneCall =4210 
    //conpain = 4400;
    //Case = 112;
});
