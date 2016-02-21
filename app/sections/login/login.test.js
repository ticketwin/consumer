describe("LoginController", function() {
  var $controller, $scope, LoginController, $state, SessionsFactory, q, $localforage;
  var res_create = {
    users: {
      auth_token: "12345",
      created_at: "2016-02-15T11:20:08.375-06:00",
      email:      "user@ticketwin.com",
      updated_at: "2016-02-15T14:53:48.414-06:00",
      user_id:    1
    },
    status: 200
  };
  var res_invalid_login = {
    data: {
      errors: "Invalid email or password",
    },
    status: 422
  };

  beforeEach(module("ticketWin"));

  beforeEach(inject(function(_$controller_, $rootScope, _Sessions_, _$state_, $q, _$localforage_) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
    SessionsFactory = _Sessions_;
    $state = _$state_;
    q = $q;
    $localforage = _$localforage_;
    LoginController = $controller("LoginController as vm", { $scope: $scope, $state: $state, Sessions: SessionsFactory });
  }));

  it("should exist", function() {
    expect(LoginController).toBeDefined();
  });

  describe("signIn", function() {
    var result;

    beforeEach(function() {
      spyOn(LoginController, "signIn").and.callThrough();
      spyOn(SessionsFactory, "login").and.callThrough();
      spyOn($localforage, "set").and.returnValue(res_create.users.auth_token);
      spyOn($state, "go");
    });

    it("should transition to home on a successful login", function() {
      spyOn(SessionsFactory, "create").and.callFake(function() {
        return q.when(res_create);
      });
      LoginController.signIn();
      $scope.$apply();

      expect(LoginController.signIn).toHaveBeenCalled();
      expect(SessionsFactory.login).toHaveBeenCalled();
      expect(SessionsFactory.create).toHaveBeenCalled();
      expect($localforage.set).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith("home");
    });

    it("should set an error message on an unsuccessful login", function() {
      spyOn(SessionsFactory, "create").and.callFake(function() {
        return q.reject(res_invalid_login);
      });
      LoginController.signIn();
      $scope.$apply();

      expect(LoginController.signIn).toHaveBeenCalled();
      expect(SessionsFactory.login).toHaveBeenCalled();
      expect(SessionsFactory.create).toHaveBeenCalled();
      expect($localforage.set).not.toHaveBeenCalled();
      expect(LoginController.error).toEqual("Invalid email or password");
    });
  });
});
