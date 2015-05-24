describe('Integration tests', function() {
  it('Should pass integration test', function() {
    expect(1 + 2).toEqual(3);
  });

  it('Should fail', function() {
    expect(1 + 1).toEqual(3);
  });

  xit('Should be pending', function() {

  });

  describe('A failure', function() {

    it('Should fail again', function() {
      expect(1 + 3).toEqual(3);
    });
  });
});
