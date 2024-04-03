const Repository = require("./database/Database");
const SqliteAdapter = require("./database/SqliteAdapter");

const sqlite = new SqliteAdapter()
const repository = new Repository(sqlite);

describe('Test dependency injection in database', () => {
  beforeAll(async () => {
    await repository.execute("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)")
  })

  afterAll(async () => {
    await repository.execute("DROP TABLE users")
    await repository.closeConnection();
});

  test('should get all inserted users', async () => {
    await repository.insert("INSERT INTO users (name) VALUES (?)", ["John Doe", "Jane Smith"]);
    
    const rows = await repository.query("SELECT * FROM users");
    expect(rows[0].id).toBeTruthy();
    expect(rows[1].id).toBeTruthy();
  })
})