// Live Production Render REST API Base URL
export const API_BASE_URL = "https://studyhub-backend-server.onrender.com/api/v1";

export const API_ENDPOINTS = {
  // 1. Admin Auth & Profile
  ADMIN_LOGIN: `${API_BASE_URL}/admin/login`,
  ADMIN_REGISTER: `${API_BASE_URL}/admin/register`,
  ADMIN_PROFILE: `${API_BASE_URL}/admin/profile`,
  ADMIN_CHANGE_PASSWORD: `${API_BASE_URL}/admin/change-password`,
  
  // 2. Executive Analytics & Dashboard
  DASHBOARD_STATS: `${API_BASE_URL}/admin/stats`,
  
  // 3. Academic Colleges Management (CRUD)
  COLLEGES: `${API_BASE_URL}/admin/colleges`,
  TOGGLE_FEATURED_COLLEGE: (id: string) => `${API_BASE_URL}/admin/colleges/${id}/featured`,
  
  // 4. Degree Courses & Subjects Management (CRUD)
  COURSES: `${API_BASE_URL}/admin/courses`,
  SUBJECTS: `${API_BASE_URL}/admin/subjects`,
  
  // 5. Materials & Video Upload System
  MATERIALS: `${API_BASE_URL}/admin/materials`,
  
  // 6. Banners & Home Layout Manager
  BANNERS: `${API_BASE_URL}/admin/banners`,
  TOGGLE_BANNER: (id: string) => `${API_BASE_URL}/admin/banners/${id}/toggle`,
  HOME_SECTIONS: `${API_BASE_URL}/admin/home-sections`,
  TOGGLE_HOME_SECTION: (id: string) => `${API_BASE_URL}/admin/home-sections/${id}/toggle`,
  
  // 7. Push Notification Broadcast
  NOTIFICATIONS: `${API_BASE_URL}/admin/notifications`,
  NOTIFICATIONS_BROADCAST: `${API_BASE_URL}/admin/notifications/broadcast`,
  
  // 8. Student Directory & Moderation
  STUDENTS: `${API_BASE_URL}/admin/students`,
  TOGGLE_BLOCK_STUDENT: (id: string) => `${API_BASE_URL}/admin/students/${id}/block`,
  STUDENT_FEEDBACK: `${API_BASE_URL}/admin/feedback`
};
