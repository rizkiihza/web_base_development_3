var myApp = angular.module('myApp',[], function($locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});

myApp.controller('AppView', ['$rootScope','$scope', '$http', '$location',
    function($rootScope, $scope, $http, $location, Service) {
        var sender_id = $location.search().sender_id;
        var receiver_id = $location.search().receiver_id;

        $http.get('http://localhost:3000/chat/chatapp/' + sender_id + "/" + receiver_id).then(function (response) {
          console.log("i got the data i requested");    
          $scope.chats = response.data;  
          $rootScope.chats = $scope.chats;
        });

        $http.get('http://localhost:3000/chat/chatapp/' + receiver_id + "/" + sender_id).then(function (response) {
            for(var i = 0; i < response.data.length; i++) {
                var obj = response.data[i];
                $scope.chats.push(obj);
            }
            $scope.chats = sortByTime($scope.chats);
            $rootScope.chats = $scope.chats;
            
        });
    
    }
]);

myApp.controller('AppAdd', ['$rootScope','$scope', '$http', '$location', 
    function($rootScope,$scope, $http, $location) {
        $scope.addChat = function() {
            $scope.chat.sender_id = $location.search().sender_id;
            $scope.chat.receiver_id = $location.search().receiver_id;
            $scope.chat.time = new Date().getTime();
            var new_chat = $scope.chat;

            $scope.chats = $rootScope.chats;
            $scope.chats.push(new_chat);
            
            console.log($scope.chat);
            $http.post('http://localhost:3000/chat/chatapp/', $scope.chat);
        };
    }
]);

function sortByTime(array_of_chat) {
    return array_of_chat.sort(function (a,b) {
        var x = a["time"];
        var y = b["time"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

