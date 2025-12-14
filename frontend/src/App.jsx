import {Routes, Route, Navigate } from 'react-router-dom';
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
import Layout from './components/layout/Layout';

function App() {
  return (
    <div className="min-h-screen bg-background text-text font-sans">      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

        {/* Protected App Routes */}
        <Route element={<Layout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/myposts" element={<ProtectedRoute><MyPosts /></ProtectedRoute>} />
            <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            <Route path="/blog/:id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;