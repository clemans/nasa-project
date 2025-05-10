import request from 'supertest';
import app from '../../app';

describe('GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
        .get('/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});

describe('POST /launch', () => {
    test('It should resond with 201 success', async () => {

    });

    test('It should catch missing required properties', () => {});
    test('It should catch invalid dates', () => {});
});