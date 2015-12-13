describe("HomeController", function() {
  var $controller, $scope, HomeController, HomeFactory, getResponse;
  getResponse = ["JOHN", "JANE"];

  beforeEach(module("ticketWin"));

  beforeEach(inject(function(_$controller_, _$rootScope_, _Home_) {
    $controller = _$controller_;
    $scope = _$rootScope_.$new();
    HomeFactory = _Home_;
  }));

  it("should exist", function() {
    HomeController = $controller("HomeController", { $scope: $scope });
    expect(HomeController).toBeDefined();
  });

  it("should get a list of users", function() {
    spyOn(HomeFactory, "get").and.callFake(function() {
      return getResponse;
    });
    HomeController = $controller("HomeController", { $scope: $scope });

    expect(HomeController.users).toEqual(getResponse);
  });
});
