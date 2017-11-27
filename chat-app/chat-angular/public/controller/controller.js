var myApp = angular.module('myApp',[], function($locationProvider){
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
});

myApp.controller('AppStart', ['$scope', '$http', '$location', 
    function($scope, $http, $location){
    extScope = $scope;
}]);

myApp.controller('AppView', ['$rootScope','$scope', '$http', '$location',
    function($rootScope, $scope, $http, $location, Service) {
        var sender_id = $location.search().sender_id;
        var receiver_id = $location.search().receiver_id;


        $scope.sid = sender_id;
            
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

        messaging.onMessage(function (payload) {
            console.log('On message', payload.data);
            $scope.chats.push({message: payload.data.message,sender_id: payload.data.sender_id,receiver_id: payload.data.user_id});
            $scope.$apply();
            console.log($scope.chats);

            updateScroll();
        });
    }
]);

myApp.controller('AppAdd', ['$rootScope','$scope', '$http', '$location', 
    function($rootScope,$scope, $http, $location) {
        $scope.addChat = function() {
            var sender_id = $location.search().sender_id;
            var receiver_id = $location.search().receiver_id;
            $scope.chat.sender_id = $location.search().sender_id;
            $scope.chat.receiver_id = $location.search().receiver_id;
            $scope.chat.time = new Date().getTime();

            var chat_string = $scope.chat.pesan;
            $scope.chat.message = chat_string;

            $scope.pesan2 = $rootScope.chats;
            $scope.pesan2.push(JSON.parse(JSON.stringify($scope.chat)));

            var total_pesan = $scope.pesan2;
            $scope.chats = total_pesan;
            $rootScope.chats = total_pesan;
        
            $http.post('http://localhost:3000/chat/chatapp/', $scope.chat);
        };
    }
]);

function updateScroll(){
    setTimeout(function() {
        var element = document.getElementById("kotak_chat");
        element.scrollTop = element.scrollHeight;
    }, 100);
}

function sortByTime(array_of_chat) {
    return array_of_chat.sort(function (a,b) {
        var x = a["time"];
        var y = b["time"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

