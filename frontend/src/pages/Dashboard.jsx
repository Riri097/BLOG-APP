import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/blogs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        //this checks if token is invalid or expired
        if (response.status === 401) {
          alert("Session expired. Please login again.");
          logout(); 
          navigate('/login');
          return;
        }
        
        const data = await response.json();
        if (response.ok) setPosts(data);

      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty array means "run once on load"

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name}!</p>
          </div>
          <Link to="/create-post">
            <Button variant="secondary">+ Create New Post</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-[#005519da]">
            <h3 className="text-text text-sm font-medium">Total Posts</h3>
            <p className="text-3xl font-bold text-text">{posts.length}</p>
          </Card>
        </div>

        {/* Recent Posts List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Your Recent Posts</h2>
          </div>

          {loading ? (
            <div className="p-10 text-center text-gray-500">Loading posts...</div>
          ) : posts.length === 0 ? (
            <div className="p-10 text-center">
              <h3 className="text-xl font-medium text-gray-900">No posts yet</h3>
              <Link to="/create-post" className="mt-4 inline-block">
                <Button variant="secondary">Write your first post</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {/* 2. MAP THROUGH THE POSTS */}
              {posts.map((post) => (
                <div key={post._id} className="p-6 hover:bg-gray-50 transition">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
                  <div className="text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;