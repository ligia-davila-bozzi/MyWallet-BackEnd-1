import connection from "../database/database.js";

async function getWallet(req, res) {

    const token = req.headers['authorization']?.replace('Bearer ', '');

    try {
        const sessionsResult = await connection.query(`
        SELECT * FROM sessions
        JOIN users ON sessions."userId" = users.id
        WHERE token = $1;
        `, [token]);
        if (sessionsResult.rowCount !== 1) return res.sendStatus(404);

        const walletActivity = await connection.query(`
        SELECT description,value,date FROM wallet
        JOIN users ON wallet."userId" = users.id
        WHERE users.id = $1
        ORDER BY date DESC LIMIT 1000;
        `, [sessionsResult.rows[0].userId]);
        if (!walletActivity.rowCount) return res.sendStatus(204);

        res.status(200).send(walletActivity.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
}

export {
    getWallet
}