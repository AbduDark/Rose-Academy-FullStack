import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./assets/styles/App.css";
import { useContext } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AuthPage from "./pages/AuthPage";
import LessonPage from "./pages/LessonPage";
import AdminPage from "./pages/AdminPage";
import StudentDashboardPage from './pages/StudentDashboardPage';
// import { AuthContext } from './context/AuthContext';
// import SubscriptionsPage from './pages/SubscriptionsPage';
// import NotFoundPage from './pages/NotFoundPage';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import CourseManagement from './pages/admin/CourseManagement';
// import LessonManagement from './pages/admin/LessonManagement';
// import UserManagement from './pages/admin/UserManagement';
// import SubscriptionManagement from './pages/admin/SubscriptionManagement';
// import AdminDashboard from "./pages/AdminPage";

// Protected Route component for user authentication
// const ProtectedRoute = ({ children, requireAdmin = false }) => {
//   const { user, isAdmin } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   if (requireAdmin && !isAdmin) {
//     return <Navigate to="/not-found" replace />;
//   }

//   return children;
// };

// Layout component to wrap pages with Header and Footer
const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Footer />
  </>
);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <CoursesPage />
            </Layout>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <Layout>
              <CourseDetailPage />
            </Layout>
          }
        />
        <Route
          path="/auth/*"
          element={
            <Layout>
              <AuthPage />
            </Layout>
          }
        />

        {/* User Protected Routes */}
        <Route
          path="/lessons/:lessonId"
          element={
            // <ProtectedRoute>
            <Layout>
              <LessonPage />
            </Layout>
            // </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            // <ProtectedRoute>
              <Layout>
                <StudentDashboardPage />
              </Layout>
            // </ProtectedRoute>
          }
        />
         {/* <Route
          path="/subscriptions"
          element={
            <ProtectedRoute>
              <Layout>
                <SubscriptionsPage />
              </Layout>
            </ProtectedRoute>
          }
        /> */}

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminPage />
            </Layout>
          }
        />
        {/* <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute requireAdmin>
              <Layout>
                <CourseManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/lessons"
          element={
            <ProtectedRoute requireAdmin>
              <Layout>
                <LessonManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin>
              <Layout>
                <UserManagement />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/subscriptions"
          element={
            <ProtectedRoute requireAdmin>
              <Layout>
                <SubscriptionManagement />
              </Layout>
            </ProtectedRoute>
          }
        /> */}

        {/* Not Found Route */}
        {/* <Route
          path="*"
          element={
            <Layout>
              <NotFoundPage />
            </Layout>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
