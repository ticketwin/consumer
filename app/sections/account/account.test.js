describe("AccountController", function() {
  var $controller, $scope, AccountController, mockIsLoggedIn;
  mockIsLoggedIn = "TCKTWN1337";

  beforeEach(module("ticketWin"));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
  }));

  it("should exist", function() {
    AccountController = $controller("AccountController", { $scope: $scope, isLoggedIn: mockIsLoggedIn });
    expect(AccountController).toBeDefined();
  });

  it("should resolve a logged in user", function() {
    AccountController = $controller("AccountController", { $scope: $scope, isLoggedIn: mockIsLoggedIn });
    expect(AccountController.user).toEqual(mockIsLoggedIn);
  });
});
