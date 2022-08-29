import { response } from 'express';
import request from 'supertest';

import app from '../../app';

//schema for some basic test with 'jest'
describe('GET /api/v1', () => {
    it('responds with an array of todos', async () => {
        request(app)
            .get('/api/v1/todos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toHaveProperty('length');
                expect(response.body.length).toBe(1);
                expect(response.body[0]).toHaveProperty('content');
                expect(response.body[0]).toHaveProperty('done');
            })
    });
});