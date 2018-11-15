describe('Shutdown server', () => {
  beforeEach(async () => {
    require('../index').shutdown()
  })
  it('should shutdown server',  (done) => {
    done()
  })
})
