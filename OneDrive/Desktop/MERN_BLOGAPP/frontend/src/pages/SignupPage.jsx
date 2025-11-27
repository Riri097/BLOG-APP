import Navbar from '../components/layout/Navbar';
import Signup from '../components/auth/Signup';

const SignupPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-12">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;