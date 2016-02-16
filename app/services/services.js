module.exports = angular.module("ticketWin:services", [
  require("./api/api").name,
  require("./localforage/localforage").name
]);
