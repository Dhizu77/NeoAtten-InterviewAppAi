import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500">
      <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500">
        <nav aria-label="Global" className="flex items-center justify-between p-4 lg:p-6 lg:px-8">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-white font-inter">ExpressInEnglish</h1>
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-800 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-6">
            <button onClick={() => scrollToSection('home')} className="text-sm font-semibold leading-6 text-white hover:text-orange-700 transition duration-300">Home</button>
            <button onClick={() => scrollToSection('about-us')} className="text-sm font-semibold leading-6 text-white hover:text-orange-700 transition duration-300">About Us</button>
            <button onClick={() => scrollToSection('teams')} className="text-sm font-semibold leading-6 text-white hover:text-orange-700 transition duration-300">Teams</button>
            <a href="/start" className="text-sm font-extrabold leading-6 text-white hover:text-orange-700 transition duration-300">Try it!</a>
          </div>
        </nav>

        {/* Mobile menu (dropdown) */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 space-y-2 p-4 bg-white shadow-lg rounded-lg">
            <button onClick={() => scrollToSection('home')} className="block text-sm font-semibold leading-6 text-gray-800 hover:text-orange-700 transition duration-300">Home</button>
            <button onClick={() => scrollToSection('about-us')} className="block text-sm font-semibold leading-6 text-gray-800 hover:text-orange-700 transition duration-300">About Us</button>
            <button onClick={() => scrollToSection('teams')} className="block text-sm font-semibold leading-6 text-gray-800 hover:text-orange-700 transition duration-300">Teams</button>
            <a href="/start" className="block text-sm font-extrabold leading-6 text-gray-800 hover:text-orange-700 transition duration-300">Try it!</a>
          </div>
        )}
      </header>
    </div>

  );
}

export default Navbar;
