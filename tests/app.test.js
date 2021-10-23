import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database/database.js';

beforeAll(async () => {
    await connection.query('DELETE FROM users;');
});
afterAll(async () => {
    await connection.query('DELETE FROM users;');
    connection.end();
});
describe("POST /sign-up", () => {

    it("returns 201 for create user", async () => {
        const body = {
            name: 'Lucas',
            email: 'luqinha@lu.com',
            password: '12345688',
            repeat_password: '12345688',
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(201);
    });
    it("returns 409 for email already used", async () => {
        const body = {
            name: 'Jão',
            email: 'luqinha@lu.com',
            password: '12345678',
            repeat_password: '12345678'
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(409);
    });
    it("returns 400 for invalid entry", async () => {
        const body = { name: 'Lucas', email: 'luqinha@', password: '1234' }
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(400);
    });
});

describe("POST /sign-up", () => {
    beforeAll(async () => {
        await connection.query('DELETE FROM sessions;');
    });
    afterAll(async () => {
        await connection.query('DELETE FROM sessions;');
    });

    it("returns 200 for log-in", async () => {
        const body = {
            email: 'luqinha@lu.com',
            password: '12345688',
        };
        const result = await supertest(app).post("/log-in").send(body);
        expect(result.text.length).toBeGreaterThan(10)
        expect(result.status).toEqual(200);
    });

    it("returns 404 for email not find", async () => {
        const body = {
            email: 'l@k.com',
            password: '12345688',
        };
        const result = await supertest(app).post("/log-in").send(body);
        expect(result.status).toEqual(404);
    });

    it("returns 401 for wrong password", async () => {
        const body = {
            email: 'luqinha@lu.com',
            password: '12345678',
        };
        const result = await supertest(app).post("/log-in").send(body);
        expect(result.status).toEqual(401);
    });

    it("returns 400 for invalid entry", async () => {
        const body = { name: 'Lucas', email: 'luqinha@', password: '1234' }
        const result = await supertest(app).post("/log-in").send(body);
        expect(result.status).toEqual(400);
    });

});