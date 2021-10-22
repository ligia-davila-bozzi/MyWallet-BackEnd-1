import connection from "../database/database.js";


async function postUsers (req, res) {
   
    const {
        name,
        email,
        password
      } = req.body;
   
    try {

        await connection.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
        `, [name, email,password]);
        
        res.sendStatus(201)
    } catch (error) {
        console.log(error);
        res.sendStatus(500)
    }
} 

export {
    postUsers,
}