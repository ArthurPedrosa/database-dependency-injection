const Database = require("./database/Database");
const SqliteAdapter = require("./database/SqliteAdapter");

const sqlite = new SqliteAdapter()
const database = new Database(sqlite);

describe('Test dependency injection in database', () => {
  beforeAll(async () => {
    await database.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)")
  })

  afterAll(async () => {
    await database.execute("DROP TABLE users")
    await database.closeConnection();
});

  test('should get all inserted users', async () => {
    await database.insert("INSERT INTO users (name) VALUES (?)", ["John Doe", "Jane Smith"]);
    
    const rows = await database.query("SELECT * FROM users");
    expect(rows[0].id).toBeTruthy();
    expect(rows[1].id).toBeTruthy();
  })
})
