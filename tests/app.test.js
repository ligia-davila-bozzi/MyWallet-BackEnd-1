import app from '../src/app.js';
import supertest from 'supertest';
import connection from '../src/database/database.js';

beforeAll(async () => {
    await connection.query('DELETE FROM users;');
});

describe("POST /sign-up", () => {

    it("returns 201 for create user", async () => {
        const body = {
            name: 'Lucas',
            email: 'admin@admin.com',
            password: '12345678',
            repeat_password: '12345678',
        };
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toEqual(201);
    });
    it("returns 409 for email already used", async () => {
        const body = {
            name: 'Jão',
            email: 'admin@admin.com',
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

describe("POST /log-in", () => {
    beforeAll(async () => {
        await connection.query('DELETE FROM sessions;');
    });

    it("returns 200 for log-in", async () => {
        const body = {
            email: 'admin@admin.com',
            password: '12345678',
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
            email: 'admin@admin.com',
            password: '123456789',
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

describe("POST /wallet", () => {
    beforeAll(async () => {
        const result = await connection.query(`SELECT id FROM users WHERE email = 'admin@admin.com';`);
        const userId = result.rows[0].id;
        await connection.query(`
            INSERT INTO sessions (token,"userId") VALUES
            ('T0K3NT3ST10',$1),
            ('T0K3NT3ST01',1)`, [userId]);
    });
    it("returns 404 for inexistent token", async () => {
        const body = {
            description: "teste",
            value: 10.40,
        };
        const result = await supertest(app)
            .post('/wallet')
            .set('Authorization', 'Bearer 123e4567-e89b-12d3-a456-426614174000')
            .send(body);
        expect(result.status).toEqual(404);
    });

    it("returns 400 for invalid entry", async () => {
        const body = {
            description: "",
            value: 10.40,
        };
        const result = await supertest(app)
            .post('/wallet')
            .set('Authorization', 'Bearer T0K3NT3ST10')
            .send(body);
        expect(result.status).toEqual(400);
    });

    it("returns 404 for invalid token", async () => {
        const body = {
            description: "teste",
            value: 10.40,
        };
        const result = await supertest(app)
            .post('/wallet')
            .set('Authorization', 'Bearer T0K3NT3ST01')
            .send(body);
        expect(result.status).toEqual(404);
    });

    it("returns 201 for success", async () => {
        const body = {
            description: "teste",
            value: 10.40,
        };
        const result = await supertest(app)
            .post('/wallet')
            .set('Authorization', 'Bearer T0K3NT3ST10')
            .send(body);
        expect(result.status).toEqual(201);
    });
});

describe("GET /wallet", () => {
    afterEach(async () => {
        await connection.query('DELETE FROM wallet;');
    });
    it("returns 200 for success", async () => {
        const body = {
            description: "teste",
            value: 10.40,
        };
        const result = await supertest(app)
            .get('/wallet')
            .set('Authorization', 'Bearer T0K3NT3ST10')
            .send(body);
        expect(result.status).toEqual(200);
    });

    it("returns 404 for inexistent token", async () => {
        const result = await supertest(app)
            .get('/wallet')
            .set('Authorization', 'Bearer 123e4567-e89b-12d3-a456-426614174000')
        expect(result.status).toEqual(404);
    });

    it("returns 404 for invalid token (user doesn't exist)", async () => {
        const result = await supertest(app)
            .get('/wallet')
            .set('Authorization', 'Bearer T0K3NT3ST01')
        expect(result.status).toEqual(404);
    });

    it("returns 204 for success but no data", async () => {
        const body = {
            description: "teste",
            value: 10.40,
        };
        const result = await supertest(app)
            .get('/wallet')
            .set('Authorization', 'Bearer T0K3NT3ST10')
            .send(body);
        expect(result.status).toEqual(204);
    });
});