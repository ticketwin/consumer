describe("SignupController", function() {
  var $controller, $scope, SignupController, $state, UsersFactory, q, $localforage;
  var res_signup = {
    users: {
      auth_token: "12345",
      created_at: "2016-02-15T11:20:08.375-06:00",
      email:      "user@ticketwin.com",
      updated_at: "2016-02-15T14:53:48.414-06:00",
      user_id:    1
    },
    status: 200
  };

  beforeEach(module("ticketWin"));

  beforeEach(inject(function(_$controller_, $rootScope, _Users_, _$state_, $q, _$localforage_) {
    $controller = _$controller_;
    $scope = $rootScope.$new();
    UsersFactory = _Users_;
    $state = _$state_;
    q = $q;
    $localforage = _$localforage_;
    SignupController = $controller("SignupController as vm", { $scope: $scope, $state: $state, Users: UsersFactory });
  }));

  it("should exist", function() {
    expect(SignupController).toBeDefined();
  });

  describe("signUp", function() {
    var result;

    beforeEach(function() {
      spyOn(SignupController, "signUp").and.callThrough();
      spyOn(UsersFactory, "login").and.callThrough();
      spyOn($localforage, "set").and.returnValue(res_signup.users.auth_token);
      spyOn($state, "go");
    });

    it("should transition to home on a successful login", function() {
      spyOn(UsersFactory, "create").and.callFake(function() {
        return q.when(res_signup);
      });
      SignupController.signUp();
      $scope.$apply();

      expect(SignupController.signUp).toHaveBeenCalled();
      expect(UsersFactory.login).toHaveBeenCalled();
      expect(UsersFactory.create).toHaveBeenCalled();
      expect($localforage.set).toHaveBeenCalled();
      expect($state.go).toHaveBeenCalledWith("home");
    });

    it("should display an error if TOS isn't checked", function() {
      spyOn(UsersFactory, "create").and.callFake(function() {
        return q.reject({
          status: 500
        });
      });
      SignupController.signUp();
      $scope.$apply();

      expect(SignupController.signUp).toHaveBeenCalled();
      expect(UsersFactory.login).toHaveBeenCalled();
      expect(UsersFactory.create).toHaveBeenCalled();
      expect($localforage.set).not.toHaveBeenCalled();
      expect(SignupController.error).toEqual("You must agree to Terms of Service");
    });

    it("should reject invalid credentials", function() {
      spyOn(UsersFactory, "create").and.callFake(function() {
        return q.reject({
          data: {
            errors: [
              "Password confirmation doesn't match Password"
            ]
          },
          status: 422,
          statusText: "Unprocessable Entity"
        });
      });
      SignupController.signUp();
      $scope.$apply();

      expect(SignupController.signUp).toHaveBeenCalled();
      expect(UsersFactory.login).toHaveBeenCalled();
      expect(UsersFactory.create).toHaveBeenCalled();
      expect($localforage.set).not.toHaveBeenCalled();
      expect(SignupController.error).toEqual(["Password confirmation doesn't match Password"]);
    });
  });
});
