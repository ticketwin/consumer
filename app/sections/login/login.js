module.exports = angular.module("controllers:login", [])
.controller("LoginController", function(Sessions) {
  console.log("Login Controller!");
  var vm = this;

  vm.login = function() {
    Sessions.create(vm.user).then(function(result) {
      console.log("result ", result);
    });
  };
})
.config(function($stateProvider) {
  $stateProvider
    .state("login", {
      url: "/login",
      template: require("./login.jade"),
      controller: "LoginController as vm"
    });
});
