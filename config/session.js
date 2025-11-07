const mongodbStore = require('connect-mongodb-session');

function createSessionStore(session) {

    const MongoDBStore = mongodbStore(session);//연결인가..?
    
    const sessionStore = new MongoDBStore({
      uri: 'mongodb://localhost:27017',
      databaseName: 'auth-blog',
      collection: 'sessions'
    });

    return sessionStore;
}

function createSessionConfig(sessionStore) {
    return {//세션 설정
          secret: 'super-secret', //세션 데이터 암호화용 키
          resave: false, // 매 요청마다 다시 저장 안함
          saveUninitialized: false, // 아무내용 없으면 저장 안함
          store: sessionStore, // MongoDB에 저장
          cookie: {//쿠키 저장 기간
            maxAge: 2 * 24 * 60 * 60 * 1000
          }
        }
    }

module.exports = {
    createSessionStore: createSessionStore,
    createSessionConfig: createSessionConfig

};