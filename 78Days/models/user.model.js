const bcrypt = require('bcryptjs');

const db = require('../data/database');

class User { // 청사진 - 객체를 위한 설계도 역할
  constructor(email, password, fullname, street, postal, city) {
    this.email = email; //this는 다른것
    this.password = password;
    this.name = fullname;
    this.address = {
        street: street, 
        postalCode: postal, 
        city: city
    };
  }

  getUserWithSameEmail() {
    return db.getDb().collection('users').findOne({ email: this.email });
  }

  async existAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
        return true;
    }
        return false;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection('users').insertOne({ //연결된 데이터베이스를 유지
        email: this.email,
        password: hashedPassword,
        name: this.name,
        address: this.address
    });
  }

  async hasMatchingPassword(hashPassword) {
    return bcrypt.compare(this.password, hashPassword);
  }
}

module.exports = User;