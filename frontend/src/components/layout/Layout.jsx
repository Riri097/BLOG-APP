import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = () => {
  const { user } = useAuth();

  // --- SCENARIO 1: LOGGED IN USER ---
  // Shows Sidebar on the left, Content on the right. No Footer.
  if (user) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Sidebar stays fixed */}
        <Sidebar />
        
        {/* Main Content scrolls independently */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  // --- SCENARIO 2: GUEST ---
  // Shows Navbar on top, Content in middle, Footer at bottom.
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;