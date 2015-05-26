describe("A suite is just a function", function() {
  var a;

  it("And so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });

  it("Should fail", function() {
    expect(false).toBe(true);
  });
});
