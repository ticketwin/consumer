function twNavbar() {
  function twNavbarCtrl() {
    var vm = this;
    //vm.isAuthenticated = false;
  }

  function link($scope, $element, $attrs, $ctrl) {

  }

  return {
    restrict: "E",
    scope: {},
    template: require("./tw-navbar.jade"),
    controllerAs: "vm",
    controller: twNavbarCtrl,
    link: link
  };
}

module.exports = angular.module("components:twNavbar", [])
.directive("twNavbar", twNavbar);
