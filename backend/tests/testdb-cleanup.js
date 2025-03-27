const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_TEST_DB_URI;
if (!uri) {
  console.error("MONGODB_TEST_DB_URI is not set. Check your .env file.");
  process.exit(1);
}

const deleteTestDatabases = async () => {
  const client = new MongoClient(process.env.MONGODB_TEST_DB_URI);

  try {
    await client.connect();
    const databaseNames = await client.db().admin().listDatabases();
    const testDatabasesNames = databaseNames.databases.filter((db) =>
      db.name.startsWith("test_")
    );
    for (const database of testDatabasesNames) {
      await client.db(database.name).dropDatabase();
      console.log(`Delete database: ${database.name}`);
    }
  } catch (error) {
    console.error("Error deleting test databases", error);
  } finally {
    await client.close();
  }
};

deleteTestDatabases();
