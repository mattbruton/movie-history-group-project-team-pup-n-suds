"use strict";

app.factory("DataFactory", function($q, $http, firebaseURL, AuthFactory) {

  var getWatchList = function() {
    let array = [];
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
      $http.get(`${firebaseURL}movies.json`)
        .success(function(moviesObject) {
          var movieCollection = moviesObject;
          Object.keys(movieCollection).forEach(function(movie) {
            if (movieCollection[movie].uid === user.uid && movieCollection[movie].Rating < 1) {
              movieCollection[movie].id = movie;
              array.push(movieCollection[movie]);
            }
          });
          resolve(array);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

let getWatchedList = function() {
  let array = [];
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
      $http.get(`${firebaseURL}movies.json`)
        .success(function(moviesObject) {
          var movieCollection = moviesObject;
          Object.keys(movieCollection).forEach(function(movie) {
            if (movieCollection[movie].uid === user.uid && movieCollection[movie].Rating > 0) {
              movieCollection[movie].id = movie;
              array.push(movieCollection[movie]);
            }
          });
          resolve(array);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };

  var updateRating = function(movie, newRating) {
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
      $http.put(
        `${firebaseURL}movies/${movie.id}.json`,
        JSON.stringify({
            Title: movie.Title,
            Year: movie.Year,
            Poster: movie.Poster,
            uid: user.uid,
            imdbID: movie.imdbID,
            id: movie.id,
            isWatched: true,
            Rating: newRating
          })
        )
        .success(
          function(objectFromFirebase) {
            resolve(objectFromFirebase);
          }
        );
    });
  }

  var deleteMovie = function(movieId){
        return $q(function(resolve, reject){
            $http
                .delete(`${firebaseURL}movies/${movieId}.json`)
                .success(function(objectFromFirebase){
                    resolve(objectFromFirebase);
                })
        })
    };


  var postNewMovie = function(newMovie) {
    var user = AuthFactory.getUser();
    return $q(function(resolve, reject) {
      $http.post(
          `${firebaseURL}movies.json`,
          JSON.stringify({
            Title: newMovie.Title,
            Year: newMovie.Year,
            Poster: newMovie.Poster,
            uid: user.uid,
            imdbID: newMovie.imdbID,
            id: null,
            isWatched: false,
            Rating: 0
          })
        )
        .success(
          function(objectFromFirebase) {
            resolve(objectFromFirebase);
          }
        );
    });
  };

  return {
    postNewMovie: postNewMovie,
    getWatchList: getWatchList,
    updateRating: updateRating,
    deleteMovie: deleteMovie,
    getWatchedList: getWatchedList
  };

});
