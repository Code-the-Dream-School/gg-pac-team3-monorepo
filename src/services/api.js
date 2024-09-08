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

export const googleSignIn = async (token, userType) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/google`, { token, userType });
    const { token: authToken, user } = response.data;

    if (user) {
      localStorage.setItem('userId', user.uid);
      localStorage.setItem('userName', user.name || user.displayName);
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
    console.error('Error fetching suggested courses:', error);
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
    // console.log('courseId:api file:', courseId);
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

//function to add user Feedback To Course addFeedbackToCourse
export const addUserFeedbackToCourse = async (
  courseId,
  rating,
  userId,
  feedback
) => {
  try {
    const token = getAuthToken();
   
    const response = await axios.post(
      `${API_BASE_URL}/user/AddUserFeedback`,
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

      },

    );
    return response.data; // Return the updated profile data
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
