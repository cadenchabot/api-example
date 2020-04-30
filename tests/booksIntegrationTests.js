require('should');

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const Book = mongoose.model('Book');
const agent = request.agent(app);
process.env.ENV = 'Test';

describe('Book CRUD', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = {
      title: 'My book',
      genre: 'Fiction',
      author: 'Caden'
    };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        console.log(results);
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
