import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// 1. Import icons from react-icons (Feather Icons pack is very clean)
import { FiHome, FiEdit, FiUser, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // 2. DATA: Define your menu items here (No more hard coding!)
  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <FiHome size={20} /> },
    { path: '/create-post', name: 'Write Story', icon: <FiEdit size={20} /> },
    { path: '/profile', name: 'My Profile', icon: <FiUser size={20} /> },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 3. STYLE: The function for the "Active Card" look
  const getLinkClass = (path) => {
    const base = "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 cursor-pointer font-medium";
    const active = "bg-white text-gray-900 shadow-lg scale-105 translate-x-2";
    const inactive = "text-text hover:text-white hover:bg-white/5";

    return location.pathname === path ? `${base} ${active}` : `${base} ${inactive}`;
  };

  return (
    <aside className="w-72 h-screen bg-primary flex flex-col py-8 pr-4 sticky top-0 ">

      <div 
        onClick={() => navigate('/settings')}
        className="px-8 mb-12 flex items-center gap-4 cursor-pointer hover:opacity-80 transition"
      >
        <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="overflow-hidden">
          <h3 className="text-white font-bold text-sm truncate">{user?.name}</h3>
          <p className="text-text text-xs truncate">{user?.email}</p>
        </div>
      </div>

      {/* --- MAIN NAVIGATION (Looping through the list) --- */}
      <nav className="flex-1 flex flex-col gap-2 pl-4">
        {menuItems.map((item) => (
          <div 
            key={item.path} 
            onClick={() => navigate(item.path)} 
            className={getLinkClass(item.path)}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </nav>

      {/* --- BOTTOM ACTIONS --- */}
      <div className="pl-4 mt-auto flex flex-col">

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 text-red-600 hover:text-red-600 hover:bg-red-500/10 rounded-2xl transition-all duration-300 font-medium"
        >
          <FiLogOut size={20} />
          <span>Log Out</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;