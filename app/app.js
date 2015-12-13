angular.module("ticketWin", [
  "ui.router",
  require("./sections/sections.js").name
])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
});
