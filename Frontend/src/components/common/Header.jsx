
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FaGlobe, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { language, changeLanguage, t, isRTL } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/Rose_Logo.png" 
              alt="Rose Academy" 
              className="h-10 w-10 mr-2"
            />
            <span className="text-xl font-bold text-pink-600">
              {isRTL ? 'أكاديمية الورد' : 'Rose Academy'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-pink-600 transition-colors">
              {t('home')}
            </a>
            <a href="/courses" className="text-gray-700 hover:text-pink-600 transition-colors">
              {t('courses')}
            </a>
            <a href="/about" className="text-gray-700 hover:text-pink-600 transition-colors">
              {t('about')}
            </a>
            <a href="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
              {t('contact')}
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
                onClick={() => handleLanguageChange(language === 'ar' ? 'en' : 'ar')}
              >
                <FaGlobe />
                <span className="text-sm">
                  {language === 'ar' ? 'العربية' : 'English'}
                </span>
              </button>
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <FaUser />
                  <span className="hidden sm:block">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('profile')}
                    </a>
                    <a
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('dashboard')}
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a
                  href="/auth"
                  className="text-pink-600 hover:text-pink-700 transition-colors"
                >
                  {t('login')}
                </a>
                <a
                  href="/auth?tab=register"
                  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  {t('register')}
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-gray-700 hover:text-pink-600"
            >
              {showMobileMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="px-4 py-2 space-y-2">
              <a href="/" className="block text-gray-700 hover:text-pink-600 py-2">
                {t('home')}
              </a>
              <a href="/courses" className="block text-gray-700 hover:text-pink-600 py-2">
                {t('courses')}
              </a>
              <a href="/about" className="block text-gray-700 hover:text-pink-600 py-2">
                {t('about')}
              </a>
              <a href="/contact" className="block text-gray-700 hover:text-pink-600 py-2">
                {t('contact')}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
