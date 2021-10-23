import connection from "../database/database.js";
import { validateUsers } from "../validation/users.js";
import bcrypt from 'bcrypt';

async function postUsers(req, res) {

    const {
        name,
        email,
        password,
        repeat_password
    } = req.body;

    const validation = validateUsers.validate({
        name,
        email,
        password,
        repeat_password
    });

    if (validation.error) return res.status(400).send(validation.error.message);

    try {
        const result = await connection.query(`
        SELECT email FROM users WHERE email = $1;
        `,[email]);

        if (result.rowCount) return res.sendStatus(409);

        const passwordHash = bcrypt.hashSync(password, 10);

        await connection.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
        `, [name, email, passwordHash]);

        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export {
    postUsers,
}