
const API_BASE_URL = 'https://workspace-rose-academy-fullstack-abdudark.replit.app/api';

// Helper function to get headers
const getHeaders = (includeAuth = true) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': localStorage.getItem('language') || 'ar'
  };

  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getHeaders(options.includeAuth !== false),
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API call failed');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth APIs
export const authAPI = {
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      includeAuth: false
    }),

  register: (userData) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      includeAuth: false
    }),

  logout: () =>
    apiCall('/auth/logout', { method: 'POST' }),

  getProfile: () =>
    apiCall('/auth/profile'),

  updateProfile: (userData) =>
    apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData)
    }),

  changePassword: (passwords) =>
    apiCall('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwords)
    }),

  forgotPassword: (email) =>
    apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      includeAuth: false
    }),

  resetPassword: (resetData) =>
    apiCall('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData),
      includeAuth: false
    })
};

// Courses APIs
export const coursesAPI = {
  getAllCourses: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/courses${queryString ? `?${queryString}` : ''}`, { includeAuth: false });
  },

  getCourse: (id) =>
    apiCall(`/courses/${id}`, { includeAuth: false }),

  createCourse: (courseData) =>
    apiCall('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData)
    }),

  updateCourse: (id, courseData) =>
    apiCall(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(courseData)
    }),

  deleteCourse: (id) =>
    apiCall(`/courses/${id}`, { method: 'DELETE' }),

  subscribeToCourse: (id) =>
    apiCall(`/courses/${id}/subscribe`, { method: 'POST' }),

  unsubscribeFromCourse: (id) =>
    apiCall(`/courses/${id}/unsubscribe`, { method: 'DELETE' }),

  getMyCourses: () =>
    apiCall('/my-subscriptions'),

  rateCourse: (id, rating) =>
    apiCall(`/courses/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating })
    })
};

// Lessons APIs
export const lessonsAPI = {
  getLesson: (id) =>
    apiCall(`/lessons/${id}`),

  createLesson: (lessonData) =>
    apiCall('/lessons', {
      method: 'POST',
      body: JSON.stringify(lessonData)
    }),

  updateLesson: (id, lessonData) =>
    apiCall(`/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lessonData)
    }),

  deleteLesson: (id) =>
    apiCall(`/lessons/${id}`, { method: 'DELETE' }),

  markAsWatched: (id) =>
    apiCall(`/lessons/${id}/mark-watched`, { method: 'POST' })
};

// Comments APIs
export const commentsAPI = {
  getCourseComments: (courseId) =>
    apiCall(`/courses/${courseId}/comments`),

  addComment: (courseId, content) =>
    apiCall(`/courses/${courseId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content })
    }),

  updateComment: (id, content) =>
    apiCall(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content })
    }),

  deleteComment: (id) =>
    apiCall(`/comments/${id}`, { method: 'DELETE' })
};

// Favorites APIs
export const favoritesAPI = {
  getFavorites: () =>
    apiCall('/favorites'),

  addToFavorites: (courseId) =>
    apiCall('/favorites', {
      method: 'POST',
      body: JSON.stringify({ course_id: courseId })
    }),

  removeFromFavorites: (courseId) =>
    apiCall(`/favorites/${courseId}`, { method: 'DELETE' })
};

// Admin APIs
export const adminAPI = {
  getUsers: () =>
    apiCall('/admin/users'),

  deleteUser: (id) =>
    apiCall(`/admin/users/${id}`, { method: 'DELETE' }),

  updateUserRole: (id, role) =>
    apiCall(`/admin/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    }),

  getDashboardStats: () =>
    apiCall('/admin/dashboard-stats')
};

export default {
  authAPI,
  coursesAPI,
  lessonsAPI,
  commentsAPI,
  favoritesAPI,
  adminAPI
};
