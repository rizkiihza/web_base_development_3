var myApp = angular.module('myApp',[], function($locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});

myApp.controller('AppCtrl', ['$scope', '$http', '$location', 
    function($scope, $http, $location) {
        var sender_id = $location.search().sender_id;
        var receiver_id = $location.search().receiver_id;

        $http.get('http://localhost:3000/chat/chatapp/' + sender_id + "/" + receiver_id).then(function (response) {
          console.log("i got the data i requested");    
            $scope.chats = response.data;  
        });
    }
]);