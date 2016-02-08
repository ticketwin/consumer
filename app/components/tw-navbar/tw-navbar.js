function twNavbar() {
  function twNavbarCtrl() {
    console.log("twNavbarCtrl!");
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
