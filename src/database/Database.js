
module.exports = class Repository {
  database = null

  constructor(database) {
    this.database = database
  }

  async closeConnection() {
    await this.database.closeConnection()
  }
  
  async execute(query) {
    await this.database.execute(query)
  }

  async query(query) {
    const data = await this.database.query(query)
    return data
  }

  async insert(query, params) {
   await this.database.insert(query, params)
  }
}