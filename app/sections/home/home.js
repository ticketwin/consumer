module.exports = angular.module("controllers:home", [])
.controller("HomeController", function() {
  console.log("Home Controller!");
})
.config(function($stateProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      template: require("./home.jade"),
      controller: "HomeController as vm"
    });
});
