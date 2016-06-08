  "use strict";

app.controller("LoginCtrl", function($scope, $rootScope, $location, firebaseURL, AuthFactory, DataFactory) {
  let ref = new Firebase(firebaseURL);

  $scope.account = {
    email: "",
    password: ""
  };

  

  if ($location.path() === "/logout") {
    ref.unauth();
    $rootScope.isActive = false;
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
        $rootScope.isActive = true;
        DataFactory.getWatchList().then(function(data) {
          let movies = [];     
          $scope.movies = data;
          if($scope.movies.length > 0){
            $location.path("/watch-list");
          }else{
            $location.path("/welcome");
          };
        });
        $scope.$apply();
      });
  };

});
