module.exports = angular.module("controllers:signup", [])
.controller("SignupController", function() {
  console.log("Signup Controller!");
})
.config(function($stateProvider) {
  $stateProvider
    .state("signup", {
      url: "/signup",
      template: require("./signup.jade"),
      controller: "SignupController as vm"
    });
});
