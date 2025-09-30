const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class User {
  constructor(email, password, name) {
    this.id = uuidv4();
    this.email = email;
    this.password = password;
    this.name = name;
    this.createdAt = new Date().toISOString();
  }

  // Hash password before saving
  static async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  // Compare password for login
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Remove password from response
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;