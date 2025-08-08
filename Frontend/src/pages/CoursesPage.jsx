
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { coursesAPI, favoritesAPI } from "../services/api";
import FiltersCourses from "../components/courses/FiltersCourses";
import SingleCourse from "../components/courses/SingleCourse";
import Pagination from "../components/courses/Pagination";

const CoursesPage = () => {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    level: '',
    category: '',
    price: '',
    sort: 'newest'
  });

  // جلب الكورسات
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        ...filters
      };
      
      const result = await coursesAPI.getAllCourses(params);
      
      if (result.success) {
        setCourses(result.data.data || []);
        setTotalPages(result.data.last_page || 1);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('حدث خطأ في جلب الكورسات');
    } finally {
      setLoading(false);
    }
  };

  // جلب المفضلات إذا كان المستخدم مسجل دخول
  const fetchFavorites = async () => {
    if (!isAuthenticated) return;
    
    try {
      const result = await favoritesAPI.getFavorites();
      if (result.success) {
        setFavorites(result.data.map(fav => fav.course_id));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchFavorites();
  }, [currentPage, filters, isAuthenticated]);

  // التعامل مع تغيير الفلاتر
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // العودة للصفحة الأولى عند تغيير الفلتر
  };

  // التعامل مع إضافة/إزالة من المفضلات
  const handleToggleFavorite = async (courseId) => {
    if (!isAuthenticated) {
      alert('يجب تسجيل الدخول لإضافة الكورسات للمفضلة');
      return;
    }

    try {
      const isFavorite = favorites.includes(courseId);
      
      if (isFavorite) {
        await favoritesAPI.removeFromFavorites(courseId);
        setFavorites(favorites.filter(id => id !== courseId));
      } else {
        await favoritesAPI.addToFavorites(courseId);
        setFavorites([...favorites, courseId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // التعامل مع الاشتراك في الكورس
  const handleSubscribeToCourse = async (courseId) => {
    if (!isAuthenticated) {
      alert('يجب تسجيل الدخول للاشتراك في الكورسات');
      return;
    }

    try {
      const result = await coursesAPI.subscribeToCourse(courseId);
      if (result.success) {
        alert('تم الاشتراك في الكورس بنجاح!');
        // تحديث قائمة الكورسات
        fetchCourses();
      } else {
        alert(result.error || 'فشل في الاشتراك');
      }
    } catch (error) {
      console.error('Error subscribing to course:', error);
      alert('حدث خطأ أثناء الاشتراك');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-1/4">
          <FiltersCourses filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        {/* Main Content */}
        <main className="lg:w-3/4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">جميع الكورسات</h1>
            <p className="text-gray-600">
              تم العثور على {courses.length} كورس
            </p>
          </div>

          {/* Courses Grid */}
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {courses.map((course) => (
                <SingleCourse
                  key={course.id}
                  course={course}
                  isFavorite={favorites.includes(course.id)}
                  onToggleFavorite={() => handleToggleFavorite(course.id)}
                  onSubscribe={() => handleSubscribeToCourse(course.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-500 text-lg mb-4">لا توجد كورسات متوفرة حالياً</div>
              <p className="text-gray-400">جرب تغيير معايير البحث</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default CoursesPage;
