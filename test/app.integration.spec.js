const request = require('supertest');
const app = require('../src/app');
const connection = require('../src/connection');

describe('Test routes', () => {
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

    it('GET /anime sall of the data from a table', (done) => {
        request(app)
            .get('/anime')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(response => {
                const expected = [];
                expect(response.body).toEqual(expected);
                done();
            });
    });
})