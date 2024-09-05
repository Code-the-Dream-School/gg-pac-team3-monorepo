import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Function to fetch a list of courses to display on the front page
export const fetchCourses = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/course/public`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Function to fetch a list of courses that the user might be interested in
export const FetchSuggestedCoursesForUser = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/user/${userId}/course/SuggestedCourses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching not enrolled courses by user:', error);
    throw error;
  }
};

// function to fetch user enrolled courses using the userId
export const fetchUserEnrolledCourses = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/user/${userId}/course/UserCourses`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

//Function to fetch list of course lessons  using the courseId
export const fetchCourseLessons = async (courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/course/${courseId}/lessons`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching course lessons:', error);
    throw error;
  }
};

// Function to fetch user profile data
export const fetchUserProfile = async (userId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/user/${userId}/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

//Function to assing selected course to user using userId and courseId
export const AddUserCourse = async (userId, courseId, role) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${API_BASE_URL}/user/${userId}/course/${courseId}/enrollment`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error adding user courses:', error);
    throw error;
  }
};
// export const LoginUser = async (email, password) => {
//   try {
//     // Sending a POST request to the login endpoint
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, {
//       email,
//       password,
//     });

//     // Store the token in local storage if login is successful
//     localStorage.setItem('authToken', response.data.token);

//     // Return the response data (could include user details, token, etc.)
//     return response.data;
//   } catch (error) {
//     console.error('Error logging in:', error);
//     throw error;
//   }
// };
