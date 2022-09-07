import request from 'supertest';
import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async () => {
    try {
        await Todos.drop();
    } catch (error) {
    }
})


//schema for some basic test with 'jest'
describe('GET /api/v1', () => {
    it('responds with an array of todos', (done) => {
        request(app)
            .get('/api/v1/todos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(0);
                done();
            })
    });
});


//test for createOne post method
describe('POST /api/v1', () => {
    it('responds with an error if the todo is invalid', (done) => {
        request(app)
            .post('/api/v1/todos')
            .set('Accept', 'application/json')
            .send({
                content: '',
            })
            .expect('Content-Type', /json/)
            .expect(422)
            .then((response) => {
                expect(response.body).toHaveProperty('message');
                done();
            })
    });
    it('responds with an inserted object', (done) => {
        request(app)
            .post('/api/v1/todos')
            .set('Accept', 'application/json')
            .send({
                content: 'Learn TypeScript',
                done: false,
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .then((response) => {
                console.log(response.body)
                expect(response.body).toHaveProperty('_id');
                expect(response.body).toHaveProperty('content');
                expect(response.body.content).toBe('Learn TypeScript');
                expect(response.body).toHaveProperty('done');
                done();
            })
    });
});