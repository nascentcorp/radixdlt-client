import chai = require('chai')
import chaiHttp = require('chai-http')
import 'mocha'
import server from '../src/server'

let should = chai.should()

chai.use(chaiHttp)

describe('/GET faucet', () => {
  it('it should GET funds', (done) => {
    chai.request(server)
        .get('/faucet')
        .end((err, res) => {
              console.log('response body: ' + JSON.stringify(res.body))
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(6)
          done();
        })
  });
});
