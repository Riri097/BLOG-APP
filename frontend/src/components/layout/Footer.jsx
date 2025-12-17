import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin, FiHeart } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary mb-4 block">
              BlogApp
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              A modern platform for sharing your stories, ideas, and expertise with the world. Built with the MERN stack.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition">Trending Stories</Link></li>
              <li><Link to="/signup" className="hover:text-primary transition">Get Started</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link to="#" className="hover:text-primary transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-primary transition">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-primary transition">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-primary hover:text-white transition">
                <FiGithub size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-primary hover:text-white transition">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-600 hover:bg-primary hover:text-white transition">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear} BlogApp. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1">
Made with <FiHeart className="text-red-500 fill-current" /> by You
</p>
</div>
</div>
</footer>
);
};

export default Footer;
