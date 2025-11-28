import Navbar from '../components/layout/Navbar';
import Login from '../components/auth/Login';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;