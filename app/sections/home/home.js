module.exports = angular.module("controllers:home", [])
.controller("HomeController", function(Home) {
  var vm = this;
  vm.users = Home.get();
})
.config(function($stateProvider) {
  $stateProvider
    .state("home", {
      url: "/",
      template: require("./home.jade"),
      controller: "HomeController as vm"
    });
});
