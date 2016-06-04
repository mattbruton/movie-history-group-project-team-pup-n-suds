"use strict";

app.controller("SearchCtrl", function($scope){
  
  $scope.omdbTypes = [
    {text: "Bing", url: "http://bing.com"},   
    {text: "ZDNet", url: "http://zdnet.com"},
    {text: "CNet", url: "http://cnet.com"}
  ]; 

});