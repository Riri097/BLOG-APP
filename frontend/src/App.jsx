import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/layout/Navbar';

// 1. FIX IMPORTS: Point to the actual files we created
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'; 
import CreatePost from './pages/CreatePost';

// Protected Route (Blocks guests)
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

// Public Route (Blocks logged-in users)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return !user ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Login: Wrapped in PublicRoute so logged-in users can't see it */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />

        {/* Signup: Wrapped in PublicRoute */}
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } 
        />

        {/* Dashboard: Wrapped in ProtectedRoute so guests can't see it */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        <Route 
        path="/create-post" 
        element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        } 
        />

        {/* Catch-all: Redirect unknown URLs to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;