
angular.module('starter.filter', [])
.filter('temp', function ($filter) {
    return function (input, precision) {
        if (!precision) {
            precision = 1;
        }
        var numberFilter = $filter('number');
        return numberFilter(input, precision) + '\u00B0F';
    };
})
.filter('alphabet', function () {
    return function (input) {
        input = String(input);
        return /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.charAt(0).toUpperCase()) ? input.charAt(1).toUpperCase() : input.charAt(0).toUpperCase();
    };
})
.filter('returnatag', function () {
    return function (input) {
        return input.split('@[')
    };
})
.filter('filterimage', function () {
    return function (input) {
        input = String(input);
        if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.charAt(0).toUpperCase()) ? input.charAt(1).toUpperCase() : input.charAt(0).toUpperCase() == "C") {
            var a = "img/Slider/tcontact.png";
            return a;
        }
        else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.charAt(0).toUpperCase()) ? input.charAt(1).toUpperCase() : input.charAt(0).toUpperCase() == "A") {
            var a = "img/user.png";
            return a;
        }
        else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.charAt(0).toUpperCase()) ? input.charAt(1).toUpperCase() : input.charAt(0).toUpperCase() == "O") {
            var a = "img/opportunitydetails.png";
            return a;
        }
        else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.charAt(0).toUpperCase()) ? input.charAt(1).toUpperCase() : input.charAt(0).toUpperCase() == "L") {
            var a = "img/Leaddetails.png";
            return a;
        }
    else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.charAt(0).toUpperCase()) ? input.charAt(1).toUpperCase() : input.charAt(0).toUpperCase() == "A") {
            var a = "img/Slider/tcall.png";
            return a;
        }
    };
})
.filter('filtercolor', function () {
    return function (input) {
        input = String(input);
        var b = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(input.charAt(0).toUpperCase()) ? input.charAt(1).toUpperCase() : input.charAt(0).toUpperCase();
        var a;
       
        switch(b) {
            case "A":
                return a = "#3f51b5";
                break;
            case "B":
                return a = "#00bcd4";
                break;
            case "C":
                return a = "#ffc107";
                break;
            case "D":
                return a = "#ffa000";
                break;
            case "E":
                return a = "#e91e63";
                break;
            case "F":
                return a = "#EA72A2";
                break;
            case "G":
                return a = "#cddc39";
                break;
            case "H":
                return a = "#388e3c";
                break;
            case "I":
                return a = "#50D656";
                break;
            case "J":
                return a = "#9c27b0";
                break;
            case "K":
                return a = "#2196f3";
                break;
            case "L":
                return a = "#795548";
                break;
            case "M":
                return a = "#ff9800";
                break;
            case  "Z":
                return a = "#3f51b5";
                break;
            case  "Y":
                return a = "#00bcd4";
                break;
            case "X":
                return a = "#ffc107";
                break;
            case  "W":
                return a = "#ffa000";
                break;
            case  "V":
                return a = "#e91e63";
                break;
            case  "U":
                return a = "#EA72A2";
                break;
            case  "T":
                return a = "#cddc39";
                break;
            case "S":
                return a = "#388e3c";
                break;
            case  "R":
                return a = "#50D656";
                break;
            case "Q":
                return a = "#9c27b0";
                break;
            case "P":
                return a = "#2196f3";
                break;
            case  "O":
                return a = "#795548";
                break;
            case "N":
                return a = "#ff9800";
                break;
            default:
           return a="#3f51b5";
        }
    };
});
//.filter('color', function($scope) {
//    return function (input) {
//        $scope.Colors = [
//        { color: 'rgb(64, 179, 249)' },
//        { color: 'rgb(244, 174, 23)' },
//        { color: 'rgb(75, 163, 15)' },
//        { color: 'rgb(190, 157, 25)' },
//        { color: 'rgb(4, 75, 229)' },
//        { color: 'rgb(213, 94, 253)' },
//        { color: 'rgb(231, 54, 128)' },
//        { color: 'rgb(231, 94, 54)' },
//        { color: 'rgb(137, 137, 137)' },
//        { color: 'rgb(9, 196, 240)' },
//        { color: 'rgb(200, 137, 221)' },
//        { color: 'rgb(234, 93, 152)' },
//        { color: 'rgb(73, 137, 96)' }];
//        var rand = $scope.Colors[Math.floor(Math.random() * $scope.Colors.length)];
//        return rand;
//    };
//});