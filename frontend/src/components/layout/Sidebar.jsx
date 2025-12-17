import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FiHome, FiEdit, FiUser, FiLogOut, FiFileText } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome size={20} /> },
    { path: '/create-post', name: 'Write Story', icon: <FiEdit size={20} /> },
    { path: '/feed', name: 'My Feed', icon: <FiFileText size={20} /> },
    { path: '/profile', name: 'My Profile', icon: <FiUser size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClass = (path) => {
    const base = "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 cursor-pointer font-medium";
    const active = "bg-white text-gray-900 shadow-lg scale-105 translate-x-2";
    const inactive = "text-white/70 hover:text-white hover:bg-white/10"; // Fixed text colors for dark sidebar

    return location.pathname === path ? `${base} ${active}` : `${base} ${inactive}`;
  };

  return (
    // Fixed width container
    <aside className="w-64 h-screen bg-primary flex flex-col py-8 pr-4 sticky top-0">
      
      {/* User Info */}
      <div onClick={() => navigate('/profile')} className="px-8 mb-12 flex items-center gap-4 cursor-pointer hover:opacity-80 transition">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <h3 className="text-white font-bold text-sm truncate">{user?.name}</h3>
          <p className="text-white/60 text-xs truncate">{user?.email}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-2 pl-4">
        {menuItems.map((item) => (
          <div key={item.path} onClick={() => navigate(item.path)} className={getLinkClass(item.path)}>
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="pl-4 mt-auto">
        <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 text-red-300 hover:text-white hover:bg-red-500/20 rounded-2xl transition-all duration-300 font-medium">
          <FiLogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;