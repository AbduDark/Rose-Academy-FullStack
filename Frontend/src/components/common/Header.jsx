
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
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-pink-600 transition-colors bg-gray-100 px-3 py-1 rounded-full"
                onClick={() => handleLanguageChange(language === 'ar' ? 'en' : 'ar')}
              >
                <FaGlobe />
                <span className="text-sm font-medium">
                  {language === 'ar' ? 'English' : 'العربية'}
                </span>
              </button>
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-pink-50 border border-pink-200 text-pink-700 hover:bg-pink-100 transition-colors px-4 py-2 rounded-full"
                >
                  <FaUser />
                  <span className="hidden sm:block font-medium">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border`}>
                    <div className="px-4 py-2 border-b bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <a
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaUser className={`${isRTL ? 'ml-3' : 'mr-3'} text-gray-400`} />
                      {t('profile')}
                    </a>
                    <a
                      href="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <span className={`${isRTL ? 'ml-3' : 'mr-3'} text-gray-400`}>📊</span>
                      {t('dashboard')}
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                    >
                      <FaSignOutAlt className={`${isRTL ? 'ml-3' : 'mr-3'} text-red-400`} />
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <a
                  href="/auth"
                  className="text-pink-600 hover:text-pink-700 transition-colors font-medium px-4 py-2"
                >
                  {t('login')}
                </a>
                <a
                  href="/auth"
                  className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium"
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
