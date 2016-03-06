module.exports = angular.module("ticketWin:services:api", [
    require("./sessions").name,
    require("./users").name,
    require("./home").name
]);
