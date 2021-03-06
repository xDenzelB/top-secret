const pool = require('../utils/pool');

module.exports = class Confidential {
    id;
    title;
    description;
    created_at;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.description = row.description;
        this.created_at = row.created_at;
    }

    static async insert({ title, description, created_at }) {
        const { rows } = await pool.query(
            `INSERT INTO 
            confidential 
            (title, description, created_at)
            VALUES 
            ($1, $2, $3)
            RETURNING
            *`,
            [title, description, created_at]
        );
        return new Confidential(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query(
            `SELECT
            *
            FROM
            confidential
            `
        );

        return rows.map((row) => new Confidential(row));
    }
}