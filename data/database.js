const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(//실제 mongoDB서버에 연결
    'mongodb://localhost:27017'
  );
  database = client.db('auth-blog');//'auth-blog'이런 DB를 사용
}

function getDb() {
  if (!database) {
    throw { message: 'You must connect first!' };
  }
  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
