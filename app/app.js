"use strict";

var app = angular.module('WatchlistApp', ["ngRoute"])
.constant("firebaseURL", "https://team-pup-n-suds-app.firebaseio.com/")
.constant("omdbURL", "https://omdbapi.com/?");

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {

  if(AuthFactory.isAuthenticated()){
    console.log("User is authenticated.");
    resolve();
  } else {
    console.log("User is not authenticated.");
    reject();
  }

});

app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src !== attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  };
});

app.config(function($routeProvider) {
  $routeProvider.
  when('/', {
      templateUrl: 'partials/initial-search-view.html',
      controller: "SearchCtrl",
      resolve: {isAuth}
    }).
    when('/welcome', {
      templateUrl: 'partials/initial-search-view.html',
      controller: "SearchCtrl",
      resolve: {isAuth}
    }).
    when('/omdb-results', {
      templateUrl: 'partials/omdb-search-display.html',
      controller: "OmdbResultsCtrl",
      resolve: {isAuth}
    }).
    when('/watched', {
      templateUrl: 'partials/watched-view.html',
      controller: "WatchedCtrl",
      resolve: {isAuth}
    }).
    when('/watch-list', {
      templateUrl: 'partials/watchlist-view.html',
      controller: "WatchListCtrl",
      resolve: {isAuth}
    }).
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