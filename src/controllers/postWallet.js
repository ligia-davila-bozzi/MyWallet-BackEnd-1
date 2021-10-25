import connection from "../database/database.js";
import { validateRegister } from "../validation/wallet.js";


async function postWallet(req, res) {
    const {
        description,
        value,
    } = req.body;

    const token = req.headers['authorization']?.replace('Bearer ', '');


    const validation = validateRegister.validate({
        description,
        value
    });

    if (validation.error) return res.status(400).send(validation.error.message);

    try {
        const sessionsResult = await connection.query(`
        SELECT users.id FROM sessions JOIN users ON sessions."userId" = users.id 
        WHERE token = $1;
        `, [token]);
        if (!sessionsResult.rowCount) return res.sendStatus(404);

        await connection.query(`
        INSERT INTO wallet (description,value,date,"userId")
        VALUES ($1,$2,NOW(),$3);
        `, [description,value,sessionsResult.rows[0].id]);

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export {
    postWallet,
}