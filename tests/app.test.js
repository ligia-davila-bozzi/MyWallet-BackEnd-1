import app from '../src/app.js';
import supertest from 'supertest';

describe("POST /users",() => {
    it("returns 201 for create user", async () => {
        const body = { name: 'Lucas', email: 'luqinha@lu.com', password: '1234' };
//
        const firstTry = await supertest(app).post("/users").send(body);
        expect(firstTry.status).toEqual(201); 
    })
});