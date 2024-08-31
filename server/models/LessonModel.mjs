import admin from '../config/firebase.mjs';

class LessonModel {
  constructor({
    lessonId,
    title,
    description = {}, // Default to empty object if not provided
    points = 0,
    order = 0,
    videoLinks = [], // Default to empty array if not provided
    materials = '',
  }) {
    // Validate types
    if (typeof lessonId !== 'string') throw new Error('Invalid lessonId');
    if (typeof title !== 'string') throw new Error('Invalid title');
    if (typeof points !== 'number') throw new Error('Invalid points');
    if (typeof order !== 'number') throw new Error('Invalid order');
    if (!Array.isArray(videoLinks)) throw new Error('Invalid videoLinks');
    if (typeof materials !== 'string') throw new Error('Invalid materials');
    if (typeof description !== 'object') throw new Error('Invalid description');

    this.lessonId = lessonId;
    this.title = title;
    this.description = description;
    this.points = points;
    this.order = order;
    this.videoLinks = videoLinks;
    this.materials = materials;
  }

  // Convert to Firestore format
  toFirestore() {
    return {
      lessonId: this.lessonId,
      title: this.title,
      description: this.description,
      points: this.points,
      order: this.order,
      videoLinks: this.videoLinks,
      materials: this.materials,
    };
  }

  // Convert from Firestore format
  static fromFirestore(data) {
    return new LessonModel({
      lessonId: data.lessonId,
      title: data.title,
      description: data.description || {}, 
      points: data.points || 0, 
      order: data.order || 0, 
      videoLinks: data.videoLinks || [], 
      materials: data.materials || '', 
    });
  }
}

export default LessonModel;
