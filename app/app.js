"use strict";

var app = angular.module('WatchlistApp', ["ngRoute"])
.constant("firebaseURL", "https://team-pup-n-suds-app.firebaseio.com/");

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {

  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated.");
    resolve();
  } else {
    console.log("User is not authenticated.");
    reject();
  }

});

app.config(function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'partials/login.html',
      controller: "LoginCtrl"
    }).
    when('/logout', {
      templateUrl: 'partials/login.html',
      controller: "LoginCtrl"
    }).
   otherwise('/');
});

app.run(($location) =>{

  let watchlistRef = new Firebase("https://team-pup-n-suds-app.firebaseio.com/");

  watchlistRef.onAuth(authData =>{
    if(!authData){
      $location.path("/login");
    }
  });

});