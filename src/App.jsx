import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import useAuthStatus from './Authentication/useAuthCheck.jsx';
import MainInterface from './Components/Main/MainInterface.jsx';
import LoginPage from './Authentication/LoginPage.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStatus();

  if (isAuthenticated === null) return null; // or a loading spinner
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute>
              <MainInterface />
            // </ProtectedRoute>
          }
        />

          <Route path='/login' element={<LoginPage />} />
        
      </Routes>
    </Router>
  );
}
