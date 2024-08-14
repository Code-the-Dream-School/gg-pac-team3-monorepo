import admin from '../config/firebase.mjs';

class UsersModel {
  constructor({
    name,
    email,
    userType,
    profilePictureUrl = null, // Default image URL    
    createdAt = new Date()      
  }) {
    this.name = name;
    this.email = email;
    this.userType = userType;
    this.profilePictureUrl = profilePictureUrl;    
    this.createdAt = createdAt;     
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new UsersModel({
      name: data.name,
      email: data.email,
      userType: data.userType,
      profilePictureUrl: data.profilePictureUrl,      
      createdAt: data.createdAt.toDate(),        
    });
  }

  toFirestore() {
    return {
      name: this.name,
      email: this.email,
      userType: this.userType,
      profilePictureUrl: this.profilePictureUrl,      
      createdAt: admin.firestore.FieldValue.serverTimestamp()        
    };
  }
}

export default UsersModel;
