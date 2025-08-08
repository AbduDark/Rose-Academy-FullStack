import React from 'react'

function NotFoundPage() {
  return (
    <div>NotFoundPage</div>
  )
}

export default NotFoundPage
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage = () => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="text-center px-6">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-pink-300 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-gray-600 text-lg">
            {isRTL ? 'عذراً، لا يمكن العثور على الصفحة التي تبحث عنها.' : 'Sorry, we couldn\'t find the page you\'re looking for.'}
          </p>
        </div>
        
        <div className="flex justify-center space-x-4 rtl:space-x-reverse">
          <Link
            to="/"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
          >
            {isRTL ? 'العودة للرئيسية' : 'Go Home'}
          </Link>
          <Link
            to="/courses"
            className="border border-pink-600 text-pink-600 px-6 py-3 rounded-lg hover:bg-pink-50 transition-colors font-medium"
          >
            {isRTL ? 'تصفح الدورات' : 'Browse Courses'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
