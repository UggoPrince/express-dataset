const Sqlite3Db = require('../database/Sqlite3DB');

class ReposServices {
    async insertRepo(data) {
        const queryStr = `INSERT INTO repos (id, name, url)
            VALUES (?, ?, ?)`;
        const params = [data.id, data.name, data.url];
        const db = new Sqlite3Db();
        const repo = await db.query(queryStr, params)
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        return repo;
    }
}

module.exports = new ReposServices();
