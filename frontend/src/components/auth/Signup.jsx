import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  
  // login function from Context for immediate login after signup
  const { login } = useAuth();
  const navigate = useNavigate();

  // to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      // Send data to Backend API
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Check if request was successful
      if (!response.ok) {
        toast.error(data.message || 'Signup failed');
        return;
      }
      toast.success('Account created successfully!');
      // if successful, log the user in immediately
      login(data.user, data.token);
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            name="name" 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input 
            type="password" 
            name="password" 
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500" 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200">
          Create Account
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className
          ="text-blue-600 hover:underline">Login</Link>
</p>
</form>
</div>
);
};

export default Signup;

