import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; 

const getAuthToken = () => {
  return localStorage.getItem('authToken'); 
};

// Example function to fetch courses
export const fetchCourses = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/course/public`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Re-throw error if needed for further handling
  }
};
export const fetchNotEnrolledCourses = async (userId) => {
  try {
    const token = getAuthToken();
    
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/course/notEnrolledCourses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching not enrolled courses by user:', error);
    throw error; 
  }
};

// Example function to fetch enrolled courses with userId
export const fetchEnrolledCourses = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/course/UserCourses`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error; 
  }
};

export const fetchCourseLessons = async (courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/course/${courseId}/lessons`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching course lessons:', error);
    throw error; 
  }
};

// Example function to fetch user profile
export const fetchUserProfile = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; 
  }
};

export const AddUserCourse = async (userId,courseId) => {
  try {
    const token = getAuthToken();    
    const response = await axios.post(`${API_BASE_URL}/user/${userId}/course/${courseId}/enrollment`,{}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding user courses:', error);
    throw error; 
  }
};