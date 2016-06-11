"use strict";

app.factory("Search", function($q, $http, firebaseURL, omdbURL) {

  var getOMDBMovieList = function(title, year, array) {
    let movies = [];

    return $q(function(resolve, reject) {
      $http.get(`${omdbURL}s=${title}*&y=${year}`)
        .success(function(movieCollection) {
          Object.keys(movieCollection.Search).forEach(function(searchResult) {
            movies.push(movieCollection.Search[searchResult]);
          });
          resolve(movies);
          movies.forEach(function(movie) {
            array.push(movie);
          });
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  return {
    getOMDBMovieList: getOMDBMovieList
  };

});
