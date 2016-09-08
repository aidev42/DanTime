// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngStorage'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
      "url": "/home",
      "templateUrl": "templates/home.html",
      "controller": "MainController",
      "cache": false
    })
    .state("time", {
      "url": "/time",
      "templateUrl": "templates/time.html",
      "controller": "MainController",
      "cache": false
    });

  $urlRouterProvider.otherwise("home");
})

.controller("MainController", function($scope, $http, $ionicHistory, $localStorage, $state){

  $scope.init = function(){
    $scope.times = undefined;
    $scope.activities = ["Watching TV", "At a friend's house", "At his house", "Gaming", "Eating a burrito", "Eating poutine", "Eating a poutine burrito", "Taking a shower"]
    $scope.selectedActivity = $scope.activities[0]
  }

  $scope.initTime = function(){
    $scope.times = $localStorage.times;
  }

  $scope.back = function() {
    $ionicHistory.goBack();
  }

  $scope.convert = function(time,activity){

    var timeMultiplier = function(time,low,high){
      return Math.round(time * (Math.floor(Math.random() * high) + low))
    }

    if (isNaN(time)){
      angular.element(document.querySelector('#minInput')).attr('placeholder','Please insert a valid number')
    } else{
      var response = "";
      switch(activity){
        case $scope.activities[0]:
          // Each one will have a text response incorporating existing time * its unique time multiplier
          response = "however long is left in the movie."
          break;
        case $scope.activities[1]:
          response = "at least " + timeMultiplier(time,2,4) + " minutes."
          break;
        case $scope.activities[2]:
          response = timeMultiplier(time,1.5,2) + " minutes after you get to his house."
          break;
        case $scope.activities[3]:
          response = "if you are lucky, only " + timeMultiplier(time,2,5) + " minutes."
          break;
        case $scope.activities[4]:
          response = "about " + timeMultiplier(time,1.5,2) + " minutes. Lucky he's a quick eater."
          break;
        case $scope.activities[5]:
          response = "about " + timeMultiplier(time,1.75,2.5) + " minutes, plus another 30 minutes for him to describe it later."
          break;
        case $scope.activities[6]:
          response = "you will never see him again."
          break;
        case $scope.activities[7]:
          response = "about " + timeMultiplier(time,1.25,2) + " minutes after you get to his house."
          break;
      }
      $localStorage.times = [time,response];
      $state.go("time");
    }
  }

});