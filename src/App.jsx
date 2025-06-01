import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx'; 
import MemberDashboard from './pages/MemberDashboard.jsx';
import LibrarianDashboard from './pages/LibrarianDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Corrected import path

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Member Dashboard Route */}
        <Route 
          path="/member/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['ROLE_MEMBER']}>
              <MemberDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Librarian Dashboard Route */}
        <Route 
          path="/librarian/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['ROLE_LIBRARIAN']}>
              <LibrarianDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Default route - redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch-all for undefined routes */}
        <Route path="*" element={
          <div>
            <h2>404 Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;
