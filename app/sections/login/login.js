module.exports = angular.module("controllers:login", [])
.controller("LoginController", function() {
  console.log("Login Controller!");
})
.config(function($stateProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      template: require("./login.jade"),
      controller: "LoginController as vm"
    });
});
