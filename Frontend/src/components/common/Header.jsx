
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
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl border-b border-gray-200/30 dark:border-gray-700/30' 
          : 'bg-transparent backdrop-blur-sm'
      }`}
      style={{
        backdropFilter: isScrolled ? 'blur(20px)' : 'blur(4px)',
        WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'blur(4px)'
      }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="relative">
              <img 
                src="/Rose_Logo.png" 
                alt="Rose Academy" 
                className="h-10 w-10 lg:h-12 lg:w-12 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-30 blur-sm animate-pulse"></div>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-purple-400 transition-all duration-300">
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
                  className="group flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:bg-pink-50/80 dark:hover:bg-pink-900/30 hover:shadow-md backdrop-blur-sm"
                >
                  <IconComponent className="text-sm opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
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
              className="p-2.5 lg:p-3 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 hover:scale-110 shadow-md backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
              title={isDarkMode ? (isRTL ? 'الوضع النهاري' : 'Light Mode') : (isRTL ? 'الوضع الليلي' : 'Dark Mode')}
            >
              {isDarkMode ? 
                <FaSun className="text-yellow-500 text-lg transition-transform duration-300" /> : 
                <FaMoon className="text-blue-600 text-lg transition-transform duration-300" />
              }
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button 
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 lg:px-5 py-2.5 lg:py-3 rounded-full bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-700/80 text-gray-700 dark:text-gray-200 hover:from-pink-100/80 hover:to-purple-100/80 dark:hover:from-pink-900/30 dark:hover:to-purple-900/30 transition-all duration-300 shadow-md hover:shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-105"
                onClick={() => handleLanguageChange(language === 'ar' ? 'en' : 'ar')}
              >
                <FaGlobe className="text-pink-600 dark:text-pink-400 transition-transform duration-300 hover:rotate-12" />
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
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-pink-50/80 to-purple-50/80 dark:from-pink-900/30 dark:to-purple-900/30 border border-pink-200/50 dark:border-pink-700/50 text-pink-700 dark:text-pink-300 hover:from-pink-100/80 hover:to-purple-100/80 dark:hover:from-pink-900/40 dark:hover:to-purple-900/40 transition-all duration-300 px-4 lg:px-5 py-2.5 lg:py-3 rounded-full shadow-md hover:shadow-lg backdrop-blur-sm hover:scale-105"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                    <FaUser className="text-white text-xs" />
                  </div>
                  <span className="hidden sm:block font-medium text-sm lg:text-base">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-3 w-56 lg:w-64 bg-white/95 dark:bg-gray-900/95 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-lg z-50 overflow-hidden transition-all duration-300 animate-fade-in`}>
                    <div className="px-4 lg:px-5 py-3 lg:py-4 border-b border-gray-100/50 dark:border-gray-800/50 bg-gradient-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-900/20 dark:to-purple-900/20">
                      <p className="text-sm lg:text-base font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                      <span className="inline-block px-2 py-1 mt-1 text-xs bg-pink-100/80 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 rounded-full">
                        {user?.role === 'admin' ? (isRTL ? 'مشرف' : 'Admin') : (isRTL ? 'طالب' : 'Student')}
                      </span>
                    </div>
                    
                    <div className="py-2">
                      <a
                        href="/profile"
                        className="flex items-center px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors"
                      >
                        <FaUser className={`${isRTL ? 'ml-3' : 'mr-3'} text-gray-400 dark:text-gray-500`} />
                        {t('profile')}
                      </a>
                      
                      <a
                        href={user?.role === 'admin' ? '/admin' : '/dashboard'}
                        className="flex items-center px-4 lg:px-5 py-2.5 lg:py-3 text-sm lg:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors"
                      >
                        <FaTachometerAlt className={`${isRTL ? 'ml-3' : 'mr-3'} text-gray-400 dark:text-gray-500`} />
                        {t('dashboard')}
                      </a>
                    </div>
                    
                    <div className="border-t border-gray-100/50 dark:border-gray-800/50">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 lg:px-5 py-3 lg:py-3.5 text-sm lg:text-base text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/30 transition-colors"
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
                  className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-all duration-300 font-medium px-4 lg:px-5 py-2.5 lg:py-3 rounded-full hover:bg-pink-50/80 dark:hover:bg-pink-900/30 backdrop-blur-sm border border-transparent hover:border-pink-200/50 dark:hover:border-pink-700/50 hover:shadow-md"
                >
                  {t('login')}
                </a>
                <a
                  href="/auth"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 lg:px-7 py-2.5 lg:py-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-sm lg:text-base hover:scale-105 backdrop-blur-sm border border-pink-400/20"
                >
                  {t('register')}
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2.5 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 transition-all duration-300 shadow-md backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:scale-110"
            >
              {showMobileMenu ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl transition-all duration-300 animate-slide-down">
            <nav className="px-4 py-4 space-y-2">
              {navigationLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 rtl:space-x-reverse text-gray-700 dark:text-gray-200 hover:text-pink-600 dark:hover:text-pink-400 hover:bg-pink-50/80 dark:hover:bg-pink-900/30 py-3 px-3 rounded-lg transition-all duration-300 backdrop-blur-sm hover:shadow-md"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <IconComponent className="text-sm transition-transform duration-300 hover:scale-110" />
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
