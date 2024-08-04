class UsersModel {
  constructor({
    name,
    email,
    isTeacher,
    profilePicture = null, // Default image URL
    loginType = null,    
    createdAt = new Date()      
  }) {
    this.name = name;
    this.email = email;
    this.isTeacher = isTeacher,
    this.profilePicture = profilePicture;
    this.loginType = loginType;   
    this.createdAt = createdAt;     
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new UserModel({
      name: data.name,
      email: data.email,
      isTeacher: data.isTeacher,
      profilePicture: data.profilePicture,
      loginType: data.loginType,      
      createdAt: data.createdAt.toDate(),        
    });
  }

  toFirestore() {
    return {
      name: this.name,
      email: this.email,
      isTeacher: this.isTeacher,
      profilePicture: this.profilePicture,
      loginType: this.loginType,     
      createdAt: admin.firestore.FieldValue.serverTimestamp()        
    };
  }
}

module.exports = UsersModel;
