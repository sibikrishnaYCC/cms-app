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
import CourseFile from './pages/CourseFile/CourseFile.jsx';
import QuestionAnswer from './pages/QuestionAnswer/QuestionAnswer.jsx';
import TimeTable from './pages/TimeTable/TimeTable.jsx';
import Marksheet from './pages/Marksheet/Marksheet.jsx';
import StudentDetails from './pages/StudentDetails/StudentDetails.jsx';
import StudentPerformance from './pages/StudentPerformance/StudentPerformance.jsx';
import AttendancePercentage from './pages/AttendancePercentage/AttendancePercentage.jsx';

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
            <ProtectedRoute>
              <MainInterface />
            </ProtectedRoute>
          }
        />

          <Route path='/login' element={<LoginPage />} />

        <Route
          path="/course-file"
          element={
            <ProtectedRoute>
              <CourseFile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/question-answer"
          element={
            <ProtectedRoute>
              <QuestionAnswer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <TimeTable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/marksheet"
          element={
            <ProtectedRoute>
              <Marksheet />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-details"
          element={
            <ProtectedRoute>
              <StudentDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-performance"
          element={
            <ProtectedRoute>
              <StudentPerformance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance-percentage"
          element={
            <ProtectedRoute>
              <AttendancePercentage />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}
