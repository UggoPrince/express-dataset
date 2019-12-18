const Sqlite3Db = require('../database/Sqlite3DB');

class ActorsServices {
    async insertActor(data) {
        const queryStr = `INSERT INTO actors (id, login, avatar_url)
            VALUES (?, ?, ?)`;
        const params = [data.id, data.login, data.avatar_url];
        const db = new Sqlite3Db();
        const actor = await db.query(queryStr, params)
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        db.db.close();
        return actor;
    }

    async getActorById(actorId) {
        const queryStr = `SELECT * FROM actors WHERE id = ?`;
        const db = new Sqlite3Db();
        const actor = await db.getById(queryStr, actorId)
            .then((result) => {
                return {data: result, exist: true};
            }).catch((err) => {
                return {data: err,  exist: false};
            });
        db.db.close();
        return actor;
    }

    async getActorsByStreak() {
        const queryStr = `SELECT actors.id, actors.login, actors.avatar_url, COUNT(events.actorId) AS cnt FROM events
            INNER JOIN actors ON events.actorId = actors.id
            GROUP BY actorId
            ORDER BY COUNT(events.actorId) DESC, created_at DESC`;
        const db = new Sqlite3Db();
        const actor = await db.getAll(queryStr, [])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        db.db.close();
        return actor;
    }

    async getActorsByTotalEvents() {
        const queryStr = `SELECT actors.id, actors.login, actors.avatar_url, COUNT(*) AS cnt FROM events 
            INNER JOIN actors ON events.actorId = actors.id
            GROUP BY actorId
            ORDER BY COUNT(*) DESC, created_at DESC, login DESC`;
        const db = new Sqlite3Db();
        const actor = await db.getAll(queryStr, [])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        db.db.close();
        return actor;
    }

    async updateActor(data) {
        const queryStr = `UPDATE actors SET avatar_url = ? WHERE id = ?`;
        const db = new Sqlite3Db();
        const actor = await db.query(queryStr, [data.avatar_url, data.id])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        db.db.close();
        return actor;
    }

    async deleteAllActors() {
        const queryStr = `DELETE FROM actors`;
        const db = new Sqlite3Db();
        const event = await db.query(queryStr, [])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        db.db.close();
        return event;
    }
}

module.exports = new ActorsServices();
