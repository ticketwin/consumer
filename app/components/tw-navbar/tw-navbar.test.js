describe("twNavbar", function() {
  var $compile, $rootScope;

  beforeEach(module("ticketWin"));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));

  describe("guest view", function() {
    var tabs, button;

    beforeEach(function() {
      var element = $compile("<tw-navbar></tw-navbar>")($rootScope);
      $rootScope.$digest();
      tabs = element.find("ul").find("a");
      button = element.find("ul").find("button");
    });

    it("should have four tabs", function() {
      expect(tabs.eq(0).text()).toEqual("Contact");
      expect(tabs.eq(1).text()).toEqual("Events");
      expect(tabs.eq(2).text()).toEqual("Sign in");
      expect(tabs.eq(3).text()).toEqual("Sign up");
    });

    it("should have one button", function() {
      expect(button.length).toEqual(1);
      expect(button.eq(0).text()).toEqual("New Event");
    });
  });

  //TODO: Mock Auth Service DI

  //describe("user view", function() {
    //it("should have four tabs", function() {
      //var element = $compile("<tw-navbar></tw-navbar>")($rootScope);
      //$rootScope.$digest();
      //var tabs = element.find("ul").find("a");

      //expect(tabs.eq(0).text()).toEqual("Contact");
      //expect(tabs.eq(1).text()).toEqual("Events");
      //expect(tabs.eq(2).text()).toEqual("Edit your account");
      //expect(tabs.eq(3).text()).toEqual("Sign out");
    //});

    //it("should have one button", function() {
      //var element = $compile("<tw-navbar></tw-navbar>")($rootScope);
      //$rootScope.$digest();
      //var buttons = element.find("ul").find("button");

      //expect(buttons.length).toEqual(2);
      //expect(buttons.eq(0).text()).toEqual("Manage Events");
      //expect(buttons.eq(1).text()).toEqual("New Event");
    //});
  //});
});
