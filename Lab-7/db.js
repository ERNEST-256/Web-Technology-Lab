const { MongoClient } = require('mongodb');

// Connection URI and DB name can be customized via environment variables.
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'lab7_mongodb';

let client;
let db;

async function connectToDb() {
  if (db) {
    return db;
  }

  if (!client) {
    client = new MongoClient(MONGODB_URI);
  }

  if (!client.topology || client.topology.isDisconnected()) {
    await client.connect();
  }

  db = client.db(MONGODB_DB_NAME);
  return db;
}

async function getNotesCollection() {
  const database = await connectToDb();
  return database.collection('notes');
}

async function getBooksCollection() {
  const database = await connectToDb();
  return database.collection('books');
}

module.exports = {
  connectToDb,
  getNotesCollection,
  getBooksCollection,
};

