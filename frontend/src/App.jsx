import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'; // Import useAuth
import { Toaster } from 'react-hot-toast';

import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import BlogDetails from './pages/BlogDetails';
import MyProfile from './pages/MyProfile';
import Feed from './pages/Feed';

function App() {
  const { user } = useAuth(); // Get current user status

  return (
    <div className="App">
      <Toaster position="top-center" />
      
      <Routes>
        <Route element={<Layout />}>
          
          {/* --- SMART HOME ROUTE --- */}
          {/* If user is logged in, redirect to Dashboard. If not, show Home. */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" replace /> : <Home />} 
          />
          {/* ------------------------ */}

          {/* Public Routes */}
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/edit-post/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          <Route path="/blog/:id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;