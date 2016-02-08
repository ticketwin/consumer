describe("Home Page", function() {
  it("should default to home state", function() {
    browser.get("http://localhost:8080/#/");
    expect(browser.getCurrentUrl()).to.eventually.equal("http://localhost:8080/#/");
    expect(browser.getTitle()).to.eventually.equal("TicketWin");
  });
});
