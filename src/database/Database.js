
module.exports = class Database {
  db = null

  constructor(database) {
    this.db = database
  }

  async closeConnection() {
    await this.db.closeConnection()
  }
  
  async execute(query) {
    await this.db.execute(query)
  }

  async query(query) {
    const data = await this.db.query(query)
    return data
  }

  async insert(query, params) {
   await this.db.insert(query, params)
  }
}
