import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

//Function for user to login
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

//Function to create a account / register
export const registerUser = async (name, email, password, userType) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user`,
      { name, email, password, userType }
    );

    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Google Sign-In
export const googleSignIn = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/google/signin`, { token });
    const { token: authToken, user } = response.data;

    if (user) {
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userName', user.name); 
      localStorage.setItem('userType', user.userType);
    }
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }

    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

// Google Sign-Up
export const googleSignUp = async (token, userType) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/google/signup`, { token, userType });
    const { token: authToken, user } = response.data;

    if (user) {
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userName', user.name);  
      localStorage.setItem('userType', user.userType);
    }
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    }

    return user;
  } catch (error) {
    console.error('Error signing up with Google:', error);
    throw error;
  }
};

//fetchQuizByLessonId
export const fetchQuizByLessonId = async (lessonId, courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/course/${courseId}/${lessonId}/quizzes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
      headers: token ? { Authorization: `Bearer ${token}` } : {},
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
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching not enrolled courses by user:', error);
    // Check for 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.message || 'Unauthorized access';

      // Check if the token is invalid or expired
      if (errorMessage.toLowerCase().includes('token expired')) {
        throw new Error('Your session has expired. Please log in again.');
      } else if (errorMessage.toLowerCase().includes('invalid token')) {
        throw new Error('Invalid token. Please log in to continue.');
      } else {
        throw new Error('You are not authorized to access this resource.');
      }
    } else {
      throw error;
    }
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
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

//Function to fetch course data by course ID
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
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

//Function to fetch Teacher data by using course ID from user_course table
export const fetchTeacherDataByCourseId = async (courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/course/${courseId}/getTeacherData`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching teachers data:', error);
    throw error;
  }
};

//function to fetch user feedback - rating
export const FetchRatingFromUserFeedback = async (courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/user/UserFeedback/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching user feedback:', error);
    throw error;
  }
};

//function to update course rating
export const updateCourseRating = async (courseId, rating) => {
  try {
    const token = getAuthToken();
    const response = await axios.patch(
      `${API_BASE_URL}/course/updateCourseRating/${courseId}`,
      { rating },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating course rating:', error);
    throw new Error('Could not update course rating');
  }
};

//function to add user Feedback To Course addFeedbackToCourse
export const addUserFeedbackToCourse = async (
  courseId,
  userId,
  rating,
  feedback
) => {
  try {
    const token = getAuthToken();

    const response = await axios.post(
      `${API_BASE_URL}/user/UserFeedback/AddUserFeedback`,
      { courseId, rating, userId, feedback },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding user feedback to the course:', error);
    throw error;
  }
};

//Function to fetch list of course lessons using the courseId
export const fetchCourseLessons = async (courseId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE_URL}/course/${courseId}/lessons`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

//Function to assign selected course to user using userId and courseId
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
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding user courses:', error);
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
      }
    );
    return response.data; // Return the updated profile data
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
