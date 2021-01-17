const request = require('supertest');
const app = require('../src/app');
const connection = require('../src/connection');

describe('Test routes', () => {
    beforeEach(done => connection.query('DELETE FROM anime_list WHERE title = "Neon Genesis Evangelion"', done));
    it('GET / sends "Service is running!" as json', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                const expected = { message: 'Service is running!' };
                expect(response.body).toEqual(expected);
                done();
            });
    });

    it('GET /anime/:id retrives exact feilds from a table', (done) => {
        request(app)
            .get('/anime/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                const expected = { id: 1, title: expect.any(String), year: "2003-12-31T22:00:00.000Z", episodes: expect.any(Number), is_checked: 1 };
                expect(response.body).toEqual(expected);
                done();
            });
    });

    it('GET /anime/:id - error: "Anime not found"', (done) => {
        request(app)
            .get('/anime/101')
            .expect(404)
            .expect('Content-Type', /json/)
            .then(response => {
                const expected = { error: 'Anime not found' };
                expect(response.body).toEqual(expected);
                done();
            });
    })

    it('POST /anime - OK (fields provided)', (done) => {
        request(app)
        .post('/anime')
          .expect(201)
          .send({ title: 'Neon Genesis Evangelion', year: "1995-10-02", episodes: 26, is_checked: true })
          .expect('Content-Type', /json/)
          .then(response => {
            const expected = { id: expect.any(Number), title: 'Neon Genesis Evangelion', year: "1995-10-01T22:00:00.000Z", episodes: 26, is_checked: 1 };
            expect(response.body).toEqual(expected);
            done();
          })
          .catch(done);
    })

    it('POST /anime - error (fields missing) ', (done) => {
        request(app)
            .post('/anime')
            .expect(422)
            .send({})
            .expect('Content-Type', /json/)
            .then(response => {
                const expected = { error: 'required field(s) missing' };
                expect(response.body).toEqual(expected);
                done();
            });
    });
})