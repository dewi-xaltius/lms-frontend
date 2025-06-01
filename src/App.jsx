import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // Import your LoginPage
// import other pages here as you create them

function App() {
  return (
    <> {/* You can use a Fragment or a div as the root wrapper */}
      {/* You might add a global Navbar or Layout component here later */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Default route, e.g., redirect to login or show a home page */}
        <Route path="/" element={<LoginPage />} /> {/* For now, default to login */}
        {/* Add other routes here, e.g., /signup, /dashboard */}
      </Routes>
    </>
  );
}

export default App;
