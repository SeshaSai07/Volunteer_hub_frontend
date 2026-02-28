import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public pages
import LandingPage from './pages/LandingPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import OpportunityDetailPage from './pages/OpportunityDetailPage';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import CalendarPage from './pages/CalendarPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AboutUsPage from './pages/AboutUsPage';

// Authenticated pages
import ProfilePage from './pages/ProfilePage';
import VolunteerDashboardPage from './pages/VolunteerDashboardPage';
import NotificationsPage from './pages/NotificationsPage';
import MessagesPage from './pages/MessagesPage';
import GroupsPage from './pages/GroupsPage';
import PostOpportunityPage from './pages/PostOpportunityPage';
import PostResourcePage from './pages/PostResourcePage';
import OrgVolunteersPage from './pages/organization/OrgVolunteersPage';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminHoursPage from './pages/admin/AdminHoursPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminVolunteersPage from './pages/admin/AdminVolunteersPage';

import './index.css';
import './App.css';

// Inner app that can read ThemeContext
function AppInner() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const toastBg = isDark ? '#1a1f2e' : '#fff0f5';
  const toastColor = isDark ? '#fff' : '#1e1220';
  const toastBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(212,85,138,0.2)';
  const toastAccent = isDark ? '#00c896' : '#d4558a';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
          <Route path="/opportunities/:id" element={<OpportunityDetailPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/resources/:id" element={<ResourceDetailPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutUsPage />} />

          {/* Authenticated */}
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><VolunteerDashboardPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
          <Route path="/groups" element={<ProtectedRoute><GroupsPage /></ProtectedRoute>} />
          <Route path="/post-opportunity" element={<ProtectedRoute orgOrAdminOnly><PostOpportunityPage /></ProtectedRoute>} />
          <Route path="/post-resource" element={<ProtectedRoute orgOrAdminOnly><PostResourcePage /></ProtectedRoute>} />
          <Route path="/org/volunteers" element={<ProtectedRoute orgOrAdminOnly><OrgVolunteersPage /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute adminOnly><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/hours" element={<ProtectedRoute adminOnly><AdminHoursPage /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute adminOnly><AdminReviewsPage /></ProtectedRoute>} />
          <Route path="/admin/volunteers" element={<ProtectedRoute adminOnly><AdminVolunteersPage /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: toastBg, color: toastColor, border: `1px solid ${toastBorder}` },
          success: { iconTheme: { primary: toastAccent, secondary: isDark ? '#000' : '#fff' } },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppInner />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
