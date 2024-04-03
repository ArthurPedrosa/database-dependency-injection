const sqlite3 = require('sqlite3').verbose();

// THIS IS THE DATABASE THAT WILL BE USE IN INTEGRATION TESTS
module.exports = class SqliteAdapter {
  connection = null

  constructor() {
    if (!this.connection) {
      this.connection = new sqlite3.Database(':memory:')
    }
  }

  closeConnection() {
    return new Promise((resolve, reject) => {
      this.connection.close((err) => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    });
  }

  execute(query) {
    return new Promise((resolve, reject) => {
      this.connection.run(query, (err) => {
        if (err) {
          reject(err)
        }

        resolve()
      })
    });
  }

  query(query) {
    return new Promise((resolve, reject) => {
      this.connection.serialize(() => {
        this.connection.all(query, (err, rows) => {
          if (err) {
              reject(err);
          } else {
              resolve(rows);
          }
      })});
    });
  }

  insert(query, params) {
    return new Promise((resolve, reject) => {
      this.connection.serialize(() => {
        const stmt = this.connection.prepare(query);
        params.forEach(item => {
          stmt.run(item);
        })
        
        stmt.finalize();
        resolve()
      });
    });
  }
}