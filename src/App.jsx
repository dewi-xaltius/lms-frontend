import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MemberDashboard from './pages/MemberDashboard'; // Import MemberDashboard
import LibrarianDashboard from './pages/LibrarianDashboard'; // Import LibrarianDashboard
// import SignupPage from './pages/SignupPage'; // To be created

function App() {
  // Later, you'll add logic here to check if the user is authenticated
  // and what their role is, to protect routes and redirect appropriately.
  // For now, we'll set up the basic routes.

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        
        {/* Member specific routes */}
        {/* For now, directly accessible. Later, wrap with ProtectedRoute */}
        <Route path="/member/dashboard" element={<MemberDashboard />} /> 
        {/* You might have more member routes like /member/profile, /member/my-books etc. */}
        {/* Those could be nested routes within MemberDashboard or separate top-level routes */}

        {/* Librarian specific routes */}
        {/* For now, directly accessible. Later, wrap with ProtectedRoute */}
        <Route path="/librarian/dashboard" element={<LibrarianDashboard />} />
        {/* You might have more librarian routes like /librarian/members, /librarian/books etc. */}

        {/* Default route */}
        {/* If not logged in, redirect to login. If logged in, redirect to appropriate dashboard. */}
        {/* For now, let's just default to login page. */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch-all for undefined routes (optional) */}
        <Route path="*" element={<div><h2>404 Not Found</h2><p>Sorry, the page you are looking for does not exist.</p></div>} />
      </Routes>
    </>
  );
}

export default App;
