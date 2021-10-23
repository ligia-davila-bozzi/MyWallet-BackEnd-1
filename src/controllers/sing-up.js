import connection from "../database/database.js";
import { validateNewUserInfo } from "../validation/users.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


async function postSignUp(req, res) {

    const {
        name,
        email,
        password,
        repeat_password
    } = req.body;

    const validation = validateNewUserInfo.validate({
        name,
        email,
        password,
        repeat_password
    });

    if (validation.error) return res.status(400).send(validation.error.message);

    try {
        const emailSearch = await connection.query(`
        SELECT email FROM users WHERE email = $1;
        `, [email]);

        if (emailSearch.rowCount) return res.sendStatus(409);

        const passwordHash = bcrypt.hashSync(password, 10);
        await connection.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
        `, [name, email, passwordHash]);
        const { rows: userSearch } = await connection.query(`
        SELECT id FROM users WHERE email = $1;
        `, [email]);

        const userId = userSearch[0].id;
        const token = uuid();
        await connection.query(`
            INSERT INTO sessions (token,"userId") VALUES ($1, $2);
        `, [token, userId]);

        res.status(201).send(token);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export {
    postSignUp,
}