import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import all your page components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import CreateFormPage from './pages/CreateFormPage';
import FeedbackFormPage from './pages/FeedbackFormPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<RegisterPage />} />

          {/* User Routes */}
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/form/:formId" element={<FeedbackFormPage />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-form" element={<CreateFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;