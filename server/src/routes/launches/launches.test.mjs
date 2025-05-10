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

    const data = {
        mission: 'USS Enterprise',
        rocket: 'NCC 17071-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028',
    }

    test('It should resond with 201 success', async () => {
        const response = await request(app)
        .post('/launches')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(201);

        expect(response.body).toMatchObject({
            ...data,
            launchDate: new Date(data.launchDate).toISOString(),
        });
    
    });

    test('It should catch missing required properties', async () => {
        const response = await request(app)
        .post('/launches')
        .send({ ...data, launchDate: ''})
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid or missing property input.'
        });
    });

    test('It should catch invalid dates', async () => {
        const response = await request(app)
        .post('/launches')
        .send({ ...data, launchDate: 'HelloWorld'})
        .expect('Content-Type', /json/)
        .expect(400);

        expect(response.body).toStrictEqual({
            error: 'Invalid Date input'
        })
    });
});