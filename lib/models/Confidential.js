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