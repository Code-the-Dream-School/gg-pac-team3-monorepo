import mainController from '../../server/controllers/mainController.mjs';
import supertest from 'supertest';
import express from 'express';

const app = express();

app.get('/', mainController.get);

describe('Main Controller', () => {
    test('should return the correct JSON response', async () => {
        const response = await supertest(app)
            .get('/')
            .expect(200);

        expect(response.body).toEqual({
            data: 'This is a full stack app!'
        });  // Verify that the response contains the correct data
    });
});
