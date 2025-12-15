import { useState, useEffect } from 'react';
import BlogCard from '../components/blog/BlogCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        // Fetch everything (no filtering)
        const response = await fetch('http://localhost:5000/api/blogs');
        const data = await response.json();
        if (response.ok) setPosts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark mb-8">Community Feed</h1>
        
        {loading ? (
          <div className="text-center">Loading stories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post._id} blog={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;