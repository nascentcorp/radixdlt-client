import chai = require('chai')
import chaiHttp = require('chai-http')
import 'mocha'
import server from '../src/server'

let should = chai.should()

chai.use(chaiHttp)

describe('/POST message', () => {
  it('it should POST a message', (done) => {
    let message = { message: 'Drink your ovaltine' }
    chai.request(server)
        .post('/message')
        .send(message)
        .end((err, res) => {
              console.log('response body: ' + JSON.stringify(res.body))
              res.should.have.status(200)
              res.body.should.be.a('array')
              res.body.length.should.be.eql(6)
          done();
        })
  });
});
