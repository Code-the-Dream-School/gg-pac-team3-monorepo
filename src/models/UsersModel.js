const admin = require('../config/firebase'); // Import the Firebase Admin SDK

class UsersModel {
    constructor({
      name,
      email,
      profilePicture = 'http://localhost:8000/images/userProfileImage.jpg', // Default image URL
      loginType = null,
      adminCode = null,
      createdAt = new Date(),
      lastLogin = null,
      lastLogout = null
    }) {
      this.name = name;
      this.email = email;
      this.profilePicture = profilePicture;
      this.loginType = loginType;
      this.adminCode = adminCode;
      this.createdAt = createdAt;
      this.lastLogin = lastLogin;
      this.lastLogout = lastLogout;
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new UserModel({
        name: data.name,
        email: data.email,
        profilePicture: data.profilePicture,
        loginType: data.loginType,
        adminCode: data.adminCode,
        createdAt: data.createdAt.toDate(),
        lastLogin: data.lastLogin ? data.lastLogin.toDate() : null,
        lastLogout: data.lastLogout ? data.lastLogout.toDate() : null
      });
    }
  
    toFirestore() {
      return {
        name: this.name,
        email: this.email,
        profilePicture: this.profilePicture,
        loginType: this.loginType,
        adminCode: this.adminCode,
      // Use admin.firestore.FieldValue for server timestamps
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastLogin: this.lastLogin ? admin.firestore.Timestamp.fromDate(this.lastLogin) : null,
        lastLogout: this.lastLogout ? admin.firestore.Timestamp.fromDate(this.lastLogout) : null
      };
    }
  }
  
  module.exports = UsersModel;
  