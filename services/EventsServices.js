const Sqlite3Db = require('../database/Sqlite3DB');
class ReposServices {

    async insertEvent(data) {
        const queryStr = `INSERT INTO events (id, type, actorId, repoId, created_at)
            VALUES (?, ?, ?, ?, ?)`;

        const params = [data.id, data.type, data.actorId, data.repoId, data.created_at];

        const db = new Sqlite3Db();
        const event = await db.query(queryStr, params)
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        return event;
    }

    async getEventbyId(id) {
        const queryStr = `SELECT * FROM events WHERE id = ?`;
        const db = new Sqlite3Db();
        const event = await db.getById(queryStr, [id])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        db.db.close();
        return event;
    }

    async getEventsByActorId(id) {
        const queryStr = `SELECT events.id as eventId, type, actors.id as actorId, actors.login, actors.avatar_url, 
            repos.id as repoId, repos.name, repos.url, events.created_at FROM events 
            INNER JOIN actors ON events.actorId = actors.id
            INNER JOIN repos ON events.repoId = repos.id
            WHERE actorId = ?`;
        const db = new Sqlite3Db();
        const event = await db.getAll(queryStr, [id])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        db.db.close();
        return event;
    }

    async getEvents() {
        const queryStr = `SELECT * FROM events`;
        const queryStr2 = `SELECT * FROM actors WHERE id = ?`;
        const queryStr3 = `SELECT * FROM repos WHERE id = ?`;

        const db = new Sqlite3Db();
        const events = await db.getAll(queryStr, [])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        let actors = [];
        let repos = [];
        for (let i = 0; i < events.length; i++) {
            actors[i] = await db.getById(queryStr2, [events[i].actorId])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
            repos[i] = await db.getById(queryStr3, [events[i].repoId])
            .then((result) => {
                return result;
            }).catch((err) => {
                return err;
            });
        }   
        
        db.db.close();
        return {E: events, A: actors, R: repos};
    }

    async deleteAllEvents() {
        const queryStr = `DELETE FROM events`;
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


module.exports = new ReposServices();
