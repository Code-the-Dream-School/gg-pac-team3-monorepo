import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Function for user to login
export const LoginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/login`, {
      email,
      password,
    });
    const { token, user } = response.data;

    if (user) {
      localStorage.setItem('userId', user.uid);
    }
    if (token) {
      localStorage.setItem('authToken', token);
    }

    return user;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

// Function to create an account / register
export const registerUser = async (name, email, password, userType) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(
      `${API_BASE_URL}/user`,
      { name, email, password, userType },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Function to fetch quizzes by lesson ID
export const fetchQuizByLessonId = async (lessonId, courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/course/${courseId}/${lessonId}/quizzes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
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

// Function to fetch a list of suggested courses for a user
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
    console.error('Error fetching suggested courses:', error);
    throw error;
  }
};

// Function to fetch user enrolled courses using userId
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

// Function to fetch course data by course ID
export const fetchCourseByCourseId = async (courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching course data:', error);
    throw error;
  }
};

// Function to fetch course data by course ID
export const fetchCourseByCourseId = async (courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_BASE_URL}/course/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching course data:', error);
    throw error;
  }
};

// Function to fetch lessons for a course
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

// Function to assign selected course to user using userId and courseId
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
    console.error('Error adding user course:', error);
    throw error;
  }
};

// Function to update user profile information
export const updateProfileInfo = async (userId, updatedProfile) => {
  try {
    const token = getAuthToken();
    const response = await axios.patch(
      `${API_BASE_URL}/user/${userId}`,
      {
        name: updatedProfile.name,
        email: updatedProfile.email,
        profilePictureUrl: updatedProfile.profilePictureUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data; // Return the updated profile data
  } catch (error) {
    console.error('Error updating profile:', error);
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
