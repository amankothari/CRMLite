angular.module('starter.directive', [])
.directive('onValidSubmit', ['$parse', '$timeout', function ($parse, $timeout) {
    return {
        require: '^form',
        restrict: 'A',
        link: function (scope, element, attrs, form) {
            form.$submitted = false;
            var fn = $parse(attrs.onValidSubmit);
            element.on('submit', function (event) {
                scope.$apply(function () {
                    element.addClass('ng-submitted');
                    form.$submitted = true;
                    if (form.$valid) {
                        if (typeof fn === 'function') {
                            fn(scope, { $event: event });
                        }
                    }
                });
            });
        }
    }

}])
    .directive('clickForOptions', ['$ionicGesture', function ($ionicGesture) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $ionicGesture.on('tap', function (e) {

                    // Grab the content
                    //var content = element[0].querySelector('.item-content');

                    // Grab the buttons and their width
                    var buttons = element[0].querySelector('.item-options');

                    if (!buttons) {
                        console.log('There are no option buttons');
                        return;
                    }
                    var buttonsWidth = buttons.offsetWidth;

                    ionic.requestAnimationFrame(function () {
                        //content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

                        if (!buttons.classList.contains('invisible')) {
                            console.log('close');
                            content.style[ionic.CSS.TRANSFORM] = '';
                            setTimeout(function () {
                                buttons.classList.add('invisible');
                            }, 250);
                        } else {
                            buttons.classList.remove('invisible');
                            //content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
                        }
                    });

                }, element);
            }
        };
    }])

.directive('validated', ['$parse', function ($parse) {
    return {
        restrict: 'AEC',
        require: '^form',
        link: function (scope, element, attrs, form) {
            var inputs = element.find("*");
            for (var i = 0; i < inputs.length; i++) {
                (function (input) {
                    var attributes = input.attributes;
                    if (attributes.getNamedItem('ng-model') != void 0 && attributes.getNamedItem('name') != void 0) {
                        var field = form[attributes.name.value];
                        if (field != void 0) {
                            scope.$watch(function () {
                                return form.$submitted + "_" + field.$valid;
                            }, function () {
                                if (form.$submitted != true) return;
                                var inp = angular.element(input);
                                if (inp.hasClass('ng-invalid')) {
                                    element.removeClass('has-success');
                                    element.addClass('has-error');
                                } else {
                                    element.removeClass('has-error').addClass('has-success');
                                }
                            });
                        }
                    }
                })(inputs[i]);
            }
        }
    }
}])
.directive('weatherIcon', function () {
    return {
        restrict: 'E', replace: true,
        scope: {
            cloudiness: '@'
        },
        controller: function ($scope) {
            $scope.imgurl = function () {
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/32/';

                if ($scope.cloudiness < 20) {
                    return baseUrl + 'sunny.png';
                } else if ($scope.cloudiness < 90) {
                    return baseUrl + 'partly_cloudy.png';
                } else {
                    return baseUrl + 'cloudy.png';
                }
            };
        },
        template: '<div style="float:left" ><img ng-src="{{ imgurl() }}"></div>'
    };
});
