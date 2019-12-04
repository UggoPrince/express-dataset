const actorsTable = `
CREATE TABLE IF NOT EXISTS actors(
    id INTEGER,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL
)`;

const reposTable = `
CREATE TABLE IF NOT EXISTS repos(
    id INTEGER,
    name TEXT NOT NULL,
    url TEXT NOT NULL
)`;

const eventsTable = `
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    actorId INTERGER NOT NULL,
    repoId INTERGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (actorId) 
        REFERENCES actors (id) 
            ON DELETE CASCADE
            ON UPDATE NO ACTION,
    FOREIGN KEY (repoId) 
        REFERENCES repos (id) 
            ON DELETE CASCADE
            ON UPDATE NO ACTION
)`;

const dropActors = 'DROP TABLE IF EXISTS actors';
const dropRepos = 'DROP TABLE IF EXISTS repos';
const dropEvents = 'DROP TABLE IF EXISTS events';

module.exports = {actorsTable, reposTable, eventsTable, dropActors, dropRepos, dropEvents};
