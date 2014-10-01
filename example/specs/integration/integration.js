describe('Integration tests', function() {
  it('should pass integration test', function() {
    expect(1 + 2).toEqual(3);
  });

  it('should fail', function() {
    expect(1 + 1).toEqual(3);
  });

  xit('should be pending', function() {
  
  });

  describe('a failure', function() {
  
    it('should fail again', function() {
      expect(1 + 3).toEqual(3);
    });
  });
});
