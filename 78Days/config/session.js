const expressSession = require('express-session');
const mongoDbStore = require('connect-mongodb-session');

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession);

    const store = new MongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });

    return store;
}

function createSessionConfig() {
    return {
        secret: 'super-secret',
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000, //2일이라는 뜻 (밀리초 단위), 없으면 닫을때 마다 초기화
        },
    };
}

module.exports = createSessionConfig;

