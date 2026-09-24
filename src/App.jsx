import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './components/layout/SiteLayout';

import Home from './pages/Home';
import Work from './pages/Work';
import Project from './pages/Project';
import Contact from './pages/Contact';
import Journey from './pages/Journey';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

function ProtectedAdmin() {
  const authenticated =
    sessionStorage.getItem('james_admin') === 'true';

  if (!authenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <AdminDashboard />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/work" element={<Work />} />

          <Route
            path="/work/:slug"
            element={<Project />}
          />

          <Route path="/journey" element={<Journey />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin/dashboard"
          element={<ProtectedAdmin />}
        />
      </Routes>
    </BrowserRouter>
  );
}