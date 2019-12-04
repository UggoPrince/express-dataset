const sqlite3 = require('sqlite3').verbose();
const {
    actorsTable,
    reposTable,
    eventsTable,
    dropActors,
    dropRepos,
    dropEvents
} = require('./tables');

module.exports = class sqlite3DB {
    constructor() {
        this.db = null;
        this.connectDB();
    }

    connectDB() {
        this.db = new sqlite3.Database('./database/express-data.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
              console.error(err.message);
            }
            //else console.log('Connected to the express-data database.');
          });
    }

    query(queryStr, params) {
        const sqlite = this;
        const data = new Promise((resolve, reject) => {
            sqlite.db.run(queryStr, params, (err, row) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
        return data;
    }

    getById(queryStr, params) {
        const sqlite = this;
        const data = new Promise((resolve, reject) => {
            sqlite.db.serialize(() => {
                sqlite.db.get(queryStr, params, (err, row) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve(row);
                    }
                });
            });
        });
        return data;
    }

    getAll(queryStr, params) {
        const sqlite = this;
        const data = new Promise((resolve, reject) => {
                sqlite.db.all(queryStr, params, (err, row) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        resolve(row);
                    }
                });
        });
        return data;
    }

    async createAllTables () {
        await this.createTables(actorsTable).then((res) => {console.log(res);}).catch((err)=> {console.log(err);});
        await this.createTables(reposTable).then((res) => {console.log(res);}).catch((err)=> {console.log(err);});
        await this.createTables(eventsTable).then((res) => {console.log(res);}).catch((err)=> {console.log(err);});
    }

    async dropAllTables() {
        await this.dropTables(dropActors).then((res) => {console.log(res);}).catch((err)=> {console.log(err);});
        await this.dropTables(dropRepos).then((res) => {console.log(res);}).catch((err)=> {console.log(err);});
        await this.dropTables(dropEvents).then((res) => {console.log(res);}).catch((err)=> {console.log(err);});
    }

    createTables(tableName) {
        const sqlite = this;
        return new Promise(function(resolve, reject) {
            sqlite.db.run(tableName, 
                function(err)  {
                    if(err) reject(err.message);
                    else    resolve('Table Created.');
            })
        })
    }

    dropTables(tableName) {
        const sqlite = this;
        return new Promise(function(resolve, reject) {
            sqlite.db.run(tableName, 
                function(err)  {
                    if(err) reject(err.message);
                    else    resolve('Table Dropped.');
            })
        })
    }
};
