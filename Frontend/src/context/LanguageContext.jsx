
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ar');
  const [direction, setDirection] = useState(language === 'ar' ? 'rtl' : 'ltr');

  const translations = {
    ar: {
      // Navigation
      'home': 'الرئيسية',
      'courses': 'الدورات',
      'about': 'من نحن',
      'contact': 'اتصل بنا',
      'login': 'تسجيل الدخول',
      'register': 'إنشاء حساب',
      'logout': 'تسجيل الخروج',
      'profile': 'الملف الشخصي',
      'dashboard': 'لوحة التحكم',
      
      // Forms
      'name': 'الاسم',
      'email': 'البريد الإلكتروني',
      'password': 'كلمة المرور',
      'confirm_password': 'تأكيد كلمة المرور',
      'gender': 'الجنس',
      'male': 'ذكر',
      'female': 'أنثى',
      'submit': 'إرسال',
      'cancel': 'إلغاء',
      'save': 'حفظ',
      'edit': 'تعديل',
      'delete': 'حذف',
      
      // Course related
      'course_title': 'عنوان الدورة',
      'course_description': 'وصف الدورة',
      'course_price': 'سعر الدورة',
      'course_category': 'فئة الدورة',
      'instructor': 'المدرب',
      'duration': 'المدة',
      'students': 'الطلاب',
      'rating': 'التقييم',
      'enroll_now': 'اشترك الآن',
      'view_course': 'عرض الدورة',
      
      // Messages
      'loading': 'جاري التحميل...',
      'no_data': 'لا توجد بيانات',
      'error_occurred': 'حدث خطأ',
      'success': 'تم بنجاح',
      'welcome': 'مرحباً',
      'goodbye': 'وداعاً',
      
      // Buttons
      'view_all': 'عرض الكل',
      'learn_more': 'اعرف المزيد',
      'get_started': 'ابدأ الآن',
      'continue': 'متابعة',
      'back': 'رجوع',
      'next': 'التالي',
      'previous': 'السابق',
      
      // Footer
      'all_rights_reserved': 'جميع الحقوق محفوظة',
      'privacy_policy': 'سياسة الخصوصية',
      'terms_of_service': 'شروط الخدمة',
      'follow_us': 'تابعنا',
      
      // Language
      'language': 'اللغة',
      'arabic': 'العربية',
      'english': 'English',
      
      // Additional translations
      'welcome_user': 'مرحباً بك',
      'my_courses': 'دوراتي',
      'settings': 'الإعدادات',
      'notifications': 'الإشعارات',
      'help': 'المساعدة',
      'search': 'بحث',
      'filter': 'تصفية',
      'sort': 'ترتيب',
      'newest': 'الأحدث',
      'oldest': 'الأقدم',
      'price_low_high': 'السعر: من الأقل للأعلى',
      'price_high_low': 'السعر: من الأعلى للأقل',
      'popular': 'الأكثر شعبية',
      'featured': 'مميز',
      'free': 'مجاني',
      'paid': 'مدفوع',
      
      // Theme and UI
      'dark_mode': 'الوضع الليلي',
      'light_mode': 'الوضع النهاري',
      'menu': 'القائمة',
      'close_menu': 'إغلاق القائمة',
      'toggle_menu': 'تبديل القائمة',
      
      // Status and roles
      'admin': 'مشرف',
      'student': 'طالب',
      'instructor': 'مدرس',
      'moderator': 'مراقب',
      'active': 'نشط',
      'inactive': 'غير نشط',
      
      // Actions
      'view': 'عرض',
      'edit': 'تعديل',
      'update': 'تحديث',
      'create': 'إنشاء',
      'add': 'إضافة',
      'remove': 'إزالة',
      'confirm': 'تأكيد',
      'close': 'إغلاق',
      'open': 'فتح',
      
      // Time and dates
      'today': 'اليوم',
      'yesterday': 'أمس',
      'tomorrow': 'غداً',
      'this_week': 'هذا الأسبوع',
      'this_month': 'هذا الشهر',
      'last_updated': 'آخر تحديث'
    },
    en: {
      // Navigation
      'home': 'Home',
      'courses': 'Courses',
      'about': 'About',
      'contact': 'Contact',
      'login': 'Login',
      'register': 'Register',
      'logout': 'Logout',
      'profile': 'Profile',
      'dashboard': 'Dashboard',
      
      // Forms
      'name': 'Name',
      'email': 'Email',
      'password': 'Password',
      'confirm_password': 'Confirm Password',
      'gender': 'Gender',
      'male': 'Male',
      'female': 'Female',
      'submit': 'Submit',
      'cancel': 'Cancel',
      'save': 'Save',
      'edit': 'Edit',
      'delete': 'Delete',
      
      // Course related
      'course_title': 'Course Title',
      'course_description': 'Course Description',
      'course_price': 'Course Price',
      'course_category': 'Course Category',
      'instructor': 'Instructor',
      'duration': 'Duration',
      'students': 'Students',
      'rating': 'Rating',
      'enroll_now': 'Enroll Now',
      'view_course': 'View Course',
      
      // Messages
      'loading': 'Loading...',
      'no_data': 'No data available',
      'error_occurred': 'An error occurred',
      'success': 'Success',
      'welcome': 'Welcome',
      'goodbye': 'Goodbye',
      
      // Buttons
      'view_all': 'View All',
      'learn_more': 'Learn More',
      'get_started': 'Get Started',
      'continue': 'Continue',
      'back': 'Back',
      'next': 'Next',
      'previous': 'Previous',
      
      // Footer
      'all_rights_reserved': 'All Rights Reserved',
      'privacy_policy': 'Privacy Policy',
      'terms_of_service': 'Terms of Service',
      'follow_us': 'Follow Us',
      
      // Language
      'language': 'Language',
      'arabic': 'العربية',
      'english': 'English',
      
      // Additional translations
      'welcome_user': 'Welcome',
      'my_courses': 'My Courses',
      'settings': 'Settings',
      'notifications': 'Notifications',
      'help': 'Help',
      'search': 'Search',
      'filter': 'Filter',
      'sort': 'Sort',
      'newest': 'Newest',
      'oldest': 'Oldest',
      'price_low_high': 'Price: Low to High',
      'price_high_low': 'Price: High to Low',
      'popular': 'Popular',
      'featured': 'Featured',
      'free': 'Free',
      'paid': 'Paid',
      
      // Theme and UI
      'dark_mode': 'Dark Mode',
      'light_mode': 'Light Mode',
      'menu': 'Menu',
      'close_menu': 'Close Menu',
      'toggle_menu': 'Toggle Menu',
      
      // Status and roles
      'admin': 'Admin',
      'student': 'Student',
      'instructor': 'Instructor',
      'moderator': 'Moderator',
      'active': 'Active',
      'inactive': 'Inactive',
      
      // Actions
      'view': 'View',
      'edit': 'Edit',
      'update': 'Update',
      'create': 'Create',
      'add': 'Add',
      'remove': 'Remove',
      'confirm': 'Confirm',
      'close': 'Close',
      'open': 'Open',
      
      // Time and dates
      'today': 'Today',
      'yesterday': 'Yesterday',
      'tomorrow': 'Tomorrow',
      'this_week': 'This Week',
      'this_month': 'This Month',
      'last_updated': 'Last Updated'
    }
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setDirection(newLanguage === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('language', newLanguage);
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
  }, [language, direction]);

  const value = {
    language,
    direction,
    changeLanguage,
    t,
    isRTL: language === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
