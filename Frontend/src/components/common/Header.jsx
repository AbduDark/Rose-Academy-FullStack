
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { FaGlobe, FaUser, FaSignOutAlt, FaBars, FaTimes, FaMoon, FaSun, FaHome, FaBookOpen, FaInfoCircle, FaEnvelope, FaTachometerAlt } from 'react-icons/fa';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { language, changeLanguage, t, isRTL } = useLanguage();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [isScrolled, setIsScrolled] = useState(false);

  // تتبع التمرير لإضافة خلفية عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تطبيق النايت مود
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigationLinks = [
    { href: '/', label: 'home', icon: FaHome },
    { href: '/courses', label: 'courses', icon: FaBookOpen },
    { href: '/about', label: 'about', icon: FaInfoCircle },
    { href: '/contact', label: 'contact', icon: FaEnvelope },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="relative">
              <img 
                src="/Rose_Logo.png" 
                alt="Rose Academy" 
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full shadow-md"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30 blur-sm"></div>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-purple-400">
              {isRTL ? 'أكاديمية الورد' : 'Rose Academy'}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navigationLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:bg-pink-50 dark:hover:bg-pink-900/20"
                >
                  <IconComponent className="text-sm opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span className="font-medium">{t(link.label)}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-3 lg:space-x-4 rtl:space-x-reverse">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 lg:p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              title={isDarkMode ? (isRTL ? 'الوضع النهاري' : 'Light Mode') : (isRTL ? 'الوضع الليلي' : 'Dark Mode')}
            >
              {isDarkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-blue-600" />}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 rtl:space-x-reverse px-3 lg:px-4 py-2 lg:py-2.5 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-200 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/20 dark:hover:to-purple-900/20 transition-all duration-300 shadow-sm hover:shadow-md"
                onClick={() => handleLanguageChange(language === 'ar' ? 'en' : 'ar')}
              >
                <FaGlobe className="text-pink-600 dark:text-pink-400" />
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
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200 dark:border-pink-700/50 text-pink-700 dark:text-pink-300 hover:from-pink-100 hover:to-purple-100 dark:hover:from-pink-900/30 dark:hover:to-purple-900/30 transition-all duration-300 px-3 lg:px-4 py-2 lg:py-2.5 rounded-full shadow-sm hover:shadow-md"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xs" />
                  </div>
                  <span className="hidden sm:block font-medium text-sm lg:text-base">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-3 w-56 lg:w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md z-50 overflow-hidden`}>
                    <div className="px-4 lg:px-5 py-3 lg:py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10">
                      <p className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full">
                        {user?.role === 'admin' ? (isRTL ? 'مشرف' : 'Admin') : (isRTL ? 'طالب' : 'Student')}
                      </span>
                    </div>
                    
                    <div className="py-2">
                      <a
                        href="/profile"
                        className="flex items-center px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <FaUser className={`${isRTL ? 'ml-3' : 'mr-3'} text-gray-400 dark:text-gray-500`} />
                        {t('profile')}
                      </a>
                      
                      <a
                        href={user?.role === 'admin' ? '/admin' : '/dashboard'}
                        className="flex items-center px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <FaTachometerAlt className={`${isRTL ? 'ml-3' : 'mr-3'} text-gray-400 dark:text-gray-500`} />
                        {t('dashboard')}
                      </a>
                    </div>
                    
                    <div className="border-t border-gray-100 dark:border-gray-800">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 lg:px-5 py-3 lg:py-3.5 text-sm lg:text-base text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <FaSignOutAlt className={`${isRTL ? 'ml-3' : 'mr-3'} text-red-400`} />
                        {t('logout')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 lg:space-x-3 rtl:space-x-reverse">
                <a
                  href="/auth"
                  className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors font-medium px-3 lg:px-4 py-2 lg:py-2.5 rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/20"
                >
                  {t('login')}
                </a>
                <a
                  href="/auth"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm lg:text-base hover:scale-105"
                >
                  {t('register')}
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            >
              {showMobileMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <nav className="px-4 py-4 space-y-2">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 rtl:space-x-reverse text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 py-3 px-3 rounded-lg transition-all duration-300"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <IconComponent className="text-sm" />
                    <span className="font-medium">{t(link.label)}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
