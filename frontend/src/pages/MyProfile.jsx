import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';

const MyProfile = () => {
  const { user, login, logout } = useAuth(); 
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // 1. HANDLE UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated!");
        
        // Update Local Storage
        const oldStorage = JSON.parse(localStorage.getItem('user') || '{}');
        const newStorage = { ...oldStorage, ...data.user };
        localStorage.setItem('user', JSON.stringify(newStorage));

        setIsEditing(false);
        window.location.reload(); 
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // 2. HANDLE DELETE ACCOUNT
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This cannot be undone!")) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/auth/delete', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success("Account deleted. Bye!");
        logout();
        navigate('/signup');
      } else {
        toast.error("Failed to delete account");
      }
    } catch (error) {
      toast.error("Error deleting account");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 px-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-dark">My Profile</h1>
        </div>

        {isEditing ? (
          // --- EDIT MODE ---
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-[#5fbd99e5] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-2 border rounded focus:ring-2 focus:ring-[#5fbd99e5] outline-none"
                />
              </div>
            </div>
            
            {/* Edit Mode Buttons */}
            <div className="flex gap-3 pt-4">
              <button 
                type="submit" 
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded hover:opacity-90 transition"
              >
                <FiSave /> Save
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="flex-1 flex items-center justify-center gap-2 text-gray-600 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                <FiX /> Cancel
              </button>
            </div>
          </form>
        ) : (
          // --- VIEW MODE ---
          <div className="space-y-6">
            
            {/* Name Field */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-2 bg-white rounded-full text-dark shadow-sm">
                <FiUser size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Name</p>
                <p className="text-gray-900 font-medium text-lg">{user?.name}</p>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="p-2 bg-white rounded-full text-dark shadow-sm">
                <FiMail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Email</p>
                <p className="text-gray-900 font-medium text-lg">{user?.email}</p>
              </div>
            </div>

            {/* Action Buttons (Side by Side) */}
            <div className="flex gap-3 pt-6 mt-2 border-t border-gray-100">
              <button 
                onClick={() => setIsEditing(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition font-medium shadow-sm"
              >
                <FiEdit2 /> Edit Profile
              </button>
              
              <button 
                onClick={handleDeleteAccount}
                className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-lg hover:bg-red-100 transition font-medium"
              >
                <FiTrash2 /> Delete
              </button>
            </div>
</div>
    )}

  </div>
</div>);
};

export default MyProfile;
