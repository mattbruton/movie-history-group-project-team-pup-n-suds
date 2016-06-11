  "use strict";

app.controller("LoginCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, DataFactory) {
  let ref = new Firebase(firebaseURL);

  $scope.account = {
    email: "",
    password: ""
  };

  // console.log($location.path());

  if ($location.path() === "/logout") {
    ref.unauth();
    $rootScope.searchLogoutShow = false;
    $rootScope.watchListShow = false;
    $rootScope.prevListShow = false;
  }

  $scope.register = () => {
    ref.createUser({
      email: $scope.account.email,
      password: $scope.account.password
    }, (error, userData) => {
      if (error) {
        console.log(`Error creating user: ${error}`);
      } else {
        console.log(`Created user account with uid: ${userData.uid}`);
        $scope.login();
      }
    });
  };

  $scope.login = () => {
    AuthFactory
      .authenticate($scope.account)
      .then(() => {
        DataFactory.getWatchList().then(function(data) {
          let movies = [];     
          $scope.movies = data;
          if($scope.movies.length === 0){
            $location.path("/welcome");
            $rootScope.watchListShow = false;
            $rootScope.searchLogoutShow = true;
          }else{
            $location.path("/watch-list");
            $rootScope.watchListShow = true;
            $rootScope.searchLogoutShow = true;
          };
          DataFactory.getWatchedList().then(function(data) {
            let movies = [];     
            $scope.movies = data;
            if($scope.movies.length === 0){
              $location.path("/welcome");
              $rootScope.prevListShow = false;
              $rootScope.searchLogoutShow = true;
            }else{
              $location.path("/watched");
              $rootScope.prevListShow = true;
              $rootScope.searchLogoutShow = true;
            };
          });
        });
        $scope.$apply();
      });
  };

});
