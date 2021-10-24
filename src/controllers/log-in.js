import connection from "../database/database.js";
import { validateLogIn } from "../validation/users.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';


async function postLogIn(req, res) {
    const {
        email,
        password,
    } = req.body;

    const validation = validateLogIn.validate({
        email,
        password
    });

    if (validation.error) return res.status(400).send(validation.error.message);

    try {
        const emailSearch = await connection.query(`
        SELECT * FROM users WHERE email = $1;
        `, [email]);

        if (!emailSearch.rowCount) return res.sendStatus(404);
        const user = emailSearch.rows[0];

        if (!bcrypt.compareSync(password, user.password)) return res.sendStatus(401);

        const token = uuid();
        await connection.query(`
            DELETE FROM sessions WHERE "userId"=$1;
        `, [user.id]);
        await connection.query(`
            INSERT INTO sessions (token,"userId") VALUES ($1, $2);
        `, [token, user.id]);
        res.status(200).send({token: token, user:user.name });
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export {
    postLogIn,
}