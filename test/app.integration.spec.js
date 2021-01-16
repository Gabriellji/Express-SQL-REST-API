const request = require('supertest');
const app = require('../src/app');
const connection = require('../src/connection');

describe('Test routes', () => {
    //beforeEach(done => connection.query('TRUNCATE anime_list', done));
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

    // it('GET /anime retrives all of the data from a table', (done) => {
    //     request(app)
    //         .get('/anime')
    //         .expect(200)
    //         .expect('Content-Type', /json/)
    //         .then(response => {
    //             const expected = [{}];
    //             expect(response.body).toEqual(expected);
    //             done();
    //         });
    // });

    it('GET /anime/:id retrives exact feilds from a table', (done) => {
        request(app)
            .get('/anime/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                const expected = { id: expect.any(Number), title: 'Neon Genesis Evangelion', year: "1995-10-02T22:00:00.000Z", episodes: 26, is_checked: 1 };
                expect(response.body).toEqual(expected);
                done();
            });
    });

    it('GET /anime/:id - error: "Anime not found"', (done) => {
        request(app)
            .get('/anime/10')
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
          .send({ title: 'Neon Genesis Evangelion', year: "1995-10-02T22:00:00.000Z", episodes: 26, is_checked: 1 })
          .expect('Content-Type', /json/)
          .then(response => {
            const expected = { id: expect.any(Number), title: 'Neon Genesis Evangelion', year: expect.to.be(Date), episodes: 26, is_checked: 1 };
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