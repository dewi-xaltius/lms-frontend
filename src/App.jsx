import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx'; 
import MemberDashboard from './pages/MemberDashboard.jsx';
import LibrarianDashboard from './pages/LibrarianDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx'; 
import Box from '@mui/material/Box';
import Container from '@mui/material/Container'; // Import MUI Container for content centering

function App() {
  return (
    <> {/* A React fragment doesn't add extra nodes to the DOM, good for direct children of #root */}
      <Navbar /> {/* Navbar will be at the top, taking full width of its container (#root) */}
      
      {/* Main content area */}
      <Container component="main" maxWidth="lg" sx={{ pt: 3, pb: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}> 
        {/* Using MUI Container to center content with a max-width.
          'maxWidth="lg"' is an example, adjust as needed.
          'pt: 3, pb: 3' provides top and bottom padding for the content area.
          'flexGrow: 1' helps if #root is a flex container, making this area take available vertical space.
        */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          
          <Route 
            path="/member/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_MEMBER']}>
                <MemberDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/librarian/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_LIBRARIAN']}>
                <LibrarianDashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="*" element={
            <div>
              <h2>404 Not Found</h2>
              <p>Sorry, the page you are looking for does not exist.</p>
            </div>
          } />
        </Routes>
      </Container>
    </>
  );
}

export default App;
