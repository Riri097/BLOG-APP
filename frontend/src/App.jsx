import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

// Import Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

// 1. IMPORT BLOG DETAILS
import BlogDetails from './pages/BlogDetails'; 
import MyPosts from './pages/MyPosts';

function AppRoutes() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">      
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={
          <PublicRoute><Login /></PublicRoute>
        } />
        
        <Route path="/signup" element={
          <PublicRoute><Signup /></PublicRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/myposts" element={
          <ProtectedRoute><MyPosts /></ProtectedRoute>
        } />

        <Route path="/create-post" element={
          <ProtectedRoute><CreatePost /></ProtectedRoute>
        } />

        {/* 2. ADD THIS ROUTE */}
        {/* URL: /blog/12345 */}
        <Route path="/blog/:id" element={
          <ProtectedRoute><BlogDetails /></ProtectedRoute>
        } />

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