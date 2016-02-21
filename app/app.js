angular.module("ticketWin", [
  "ui.router",
  require("./components/components.js").name,
  require("./sections/sections.js").name,
  require("./services/services.js").name
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");
  $httpProvider.interceptors.push("httpRequestInterceptor");
});
