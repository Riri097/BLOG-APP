import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';

import { FiGlobe, FiImage, FiMessageSquare } from 'react-icons/fi';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 text-dark leading-tight">
            Share Your Story with the World
          </h1>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            A simple, beautiful place to write, read, and connect. 
            Whether you have a daily journal or a big idea, StorySpace is your home.
          </p>
          
          {user ? (
            <Link to="/dashboard">
              <Button className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all bg-primary text-white">
                Start Reading & Writing
              </Button>
            </Link>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link to="/signup">
                <Button className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all bg-primary text-white">
                  Start Writing for Free
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">

          <div className="bg-primary p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">

            <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
              <FiGlobe className="text-primary text-2xl group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark">
              Global Community
            </h3>
            <p className="text-gray-600">
              Connect with readers and writers from around the globe. Share your unique perspective.
            </p>
          </div>

          <div className="bg-primary p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
            <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
              <FiImage className="text-primary text-2xl group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark">
              Rich Media
            </h3>
            <p className="text-gray-600">
              Bring your stories to life with beautiful cover images and clean typography.
            </p>
          </div>


          <div className="bg-primary p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
            <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
              <FiMessageSquare className="text-primary text-2xl group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark">
              Engage & Discuss
            </h3>
            <p className="text-gray-600">
              Like posts and leave comments to start meaningful conversations with authors.
</p>
</div>
   </div>
  </div>
</div>
);
};

export default Home;