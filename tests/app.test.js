import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database/database.js';

afterAll(() => {
    connection.end();
});
describe("POST /users", () => {
    beforeAll(async () => {
        await connection.query('DELETE FROM users;');
    });
    afterAll(async () => {
        await connection.query('DELETE FROM users;');
    });

    it("returns 201 for create user", async () => {
        const body = {
            name: 'Lucas',
            email: 'luqinha@lu.com',
            password: '12345688',
            repeat_password: '12345688',
        };
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(201);
    })
    it("returns 409 for email already used", async () => {
        const body = {
            name: 'Jão',
            email: 'luqinha@lu.com',
            password: '12345678',
          repeat_password: '12345678'
        };
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(409);
    })
    it("returns 400 for invalid entry", async () => {
        const body = { name: 'Lucas', email: 'luqinha@', password: '1234' }
        const result = await supertest(app).post("/users").send(body);
        expect(result.status).toEqual(400);
    })
});