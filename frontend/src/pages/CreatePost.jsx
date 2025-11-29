import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const CreatePost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Get the token from browser memory
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You must be logged in to post.');
      return;
    }

    try {
      // 2. Send data to Backend
      const response = await fetch('http://localhost:5000/api/blogs', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // <--- IMPORTANT: Send token here
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create post');
      }

      // 3. Success! Go back to dashboard
      console.log("Post created:", data);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Write a New Story</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter an engaging title..."
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              rows="12"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Tell your story..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Publish Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;