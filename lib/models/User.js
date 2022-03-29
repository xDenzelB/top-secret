const pool = require('../utils/pool');
const jwt = require('jsonwebtoken');

module.exports = class User {
    user_id;
    email;
    #passwordHash;

    constructor(row) {
        this.user_id = row.user_id;
        this.email = row.email;
        this.#passwordHash = row.password_hash;

    }

static async insert({ email, passwordHash }) {
    const { rows } = await pool.query(
        `INSERT INTO 
        users (email, password_hash)
        VALUES 
        ($1, $2)
        RETURNING 
        * `,
        [email, passwordHash]
    );
    return new User(rows[0]);
}

authToken() {
    return jwt.sign({ ...this }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
    });
}
}