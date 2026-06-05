import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';

import Members from './pages/Members';

import LandingPage from './pages/landing/LandingPage';
import StaffLogin from './pages/auth/StaffLogin';
import MemberLogin from './pages/auth/MemberLogin';
import Register from './pages/auth/Register';
import ProfessionalProfile from './pages/member/ProfessionalProfile';
import MemberDashboard from './pages/member/MemberDashboard';
import MemberBookings from './pages/member/MemberBookings';
import MemberPayments from './pages/member/MemberPayments';
import MemberSupport from './pages/member/MemberSupport';
import StaffAttendance from './pages/staff/StaffAttendance';
import StaffPayments from './pages/staff/StaffPayments';
import StaffReports from './pages/staff/StaffReports';
import StaffSettings from './pages/staff/StaffSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/staff-login" element={<StaffLogin />} />
        <Route path="/auth/member-login" element={<MemberLogin />} />
        <Route path="/auth/register" element={<Register />} />
        
        {/* Staff Dashboard Routes */}
        <Route path="/staff" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<Members />} />
          <Route path="attendance" element={<StaffAttendance />} />
          <Route path="payments" element={<StaffPayments />} />
          <Route path="reports" element={<StaffReports />} />
          <Route path="settings" element={<StaffSettings />} />
        </Route>

        {/* Member Dashboard Routes */}
        <Route path="/member" element={<DashboardLayout />}>
          <Route index element={<MemberDashboard />} />
          <Route path="bookings" element={<MemberBookings />} />
          <Route path="payments" element={<MemberPayments />} />
          <Route path="support" element={<MemberSupport />} />
        </Route>

        <Route path="/professional/:id" element={<ProfessionalProfile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
