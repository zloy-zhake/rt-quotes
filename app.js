var LENGTH = 13;

var app = angular.module('radiotQuotesApp', []);

app.controller('Quote', function($scope, $http, $timeout) {

    var currentQuoteId = undefined;

    $scope.getRandomQuote = function() {
        if ($scope.moreDisabled === true) return;

        var quoteId;

        for (quoteId=Math.floor(Math.random() * LENGTH);
             currentQuoteId!=undefined && quoteId==currentQuoteId && LENGTH>1;
             quoteId=Math.floor(Math.random() * LENGTH)) {
            console.log(quoteId);
        }

        var url = 'json/' + zfill(quoteId, 5) + '.json',
            loading = $timeout(function() {
                $scope.quote = undefined;
            }, 100);

        $scope.moreDisabled = true;

        $http.get(url).success(function(data, status, headers, config) {
            currentQuoteId = quoteId;
            $scope.moreDisabled = false;
            $timeout.cancel(loading);
            $scope.quote = data;
        });
    };
});

function zfill(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
