import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3">
                <span className="text-white font-bold">SP</span>
              </div>
              <h3 className="text-xl font-bold">Suhas Palani</h3>
            </div>
            <p className="text-gray-400 mt-2">Software Engineer & Developer</p>
          </div>
          
          <div className="flex space-x-8">
            <div>
              <h4 className="text-gray-300 font-medium mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#skills" className="text-gray-400 hover:text-purple-400 transition-colors">Skills</a></li>
                <li><a href="#projects" className="text-gray-400 hover:text-purple-400 transition-colors">Projects</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-gray-300 font-medium mb-3">Contact</h4>
              <ul className="space-y-2">
                <li><a href="mailto:spalani3@hawk.iit.edu" className="text-gray-400 hover:text-purple-400 transition-colors">Email</a></li>
                <li><a href="https://linkedin.com/in/suhaspalani/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">LinkedIn</a></li>
                <li><a href="https://github.com/SuhasPalani" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition-colors"
          >
            <ArrowUp size={20} className="text-white" />
          </button>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Suhas Palani. All rights reserved.</p>
          <p className="text-gray-500 text-sm mt-2">Built with React and Tailwind CSS</p>
          <br />
          <br />
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;