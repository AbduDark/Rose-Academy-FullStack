
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { coursesAPI, commentsAPI, favoritesAPI } from "../services/api";
import HeaderCourse from "../components/courses/HeaderCourse";
import OverviewCourse from "../components/courses/OverviewCourse";
import InstructorCourse from "../components/courses/InstructorCourse";
import ReviewCorse from "../components/courses/ReviewCorse";
import EnrollCourse from "../components/courses/EnrollCourse";

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [course, setCourse] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // جلب تفاصيل الكورس
  const fetchCourse = async () => {
    try {
      const result = await coursesAPI.getCourse(id);
      if (result.success) {
        setCourse(result.data);
        setIsSubscribed(result.data.is_subscribed || false);
        setIsFavorite(result.data.is_favorite || false);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('حدث خطأ في جلب تفاصيل الكورس');
    }
  };

  // جلب التعليقات
  const fetchComments = async () => {
    try {
      const result = await commentsAPI.getCourseComments(id);
      if (result.success) {
        setComments(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCourse(), fetchComments()]);
      setLoading(false);
    };

    if (id) {
      loadData();
    }
  }, [id]);

  // التعامل مع الاشتراك/إلغاء الاشتراك
  const handleSubscriptionToggle = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    try {
      let result;
      if (isSubscribed) {
        result = await coursesAPI.unsubscribeFromCourse(id);
      } else {
        result = await coursesAPI.subscribeToCourse(id);
      }

      if (result.success) {
        setIsSubscribed(!isSubscribed);
        alert(isSubscribed ? 'تم إلغاء الاشتراك' : 'تم الاشتراك بنجاح');
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('حدث خطأ أثناء تنفيذ العملية');
    }
  };

  // التعامل مع المفضلات
  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    try {
      let result;
      if (isFavorite) {
        result = await favoritesAPI.removeFromFavorites(id);
      } else {
        result = await favoritesAPI.addToFavorites(id);
      }

      if (result.success) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  // إضافة تعليق
  const handleAddComment = async (content) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    try {
      const result = await commentsAPI.addComment(id, content);
      if (result.success) {
        await fetchComments(); // تحديث التعليقات
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('حدث خطأ أثناء إضافة التعليق');
    }
  };

  // تقييم الكورس
  const handleRateCourse = async (rating) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    try {
      const result = await coursesAPI.rateCourse(id, rating);
      if (result.success) {
        await fetchCourse(); // تحديث تفاصيل الكورس
        alert('تم إضافة التقييم بنجاح');
      } else {
        alert(result.error);
      }
    } catch (error) {
      alert('حدث خطأ أثناء إضافة التقييم');
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

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">الكورس غير موجود</h2>
          <button
            onClick={() => navigate('/courses')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            العودة للكورسات
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeaderCourse 
        course={course} 
        isSubscribed={isSubscribed}
        isFavorite={isFavorite}
        onSubscriptionToggle={handleSubscriptionToggle}
        onFavoriteToggle={handleFavoriteToggle}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <OverviewCourse course={course} />
            <InstructorCourse course={course} />
            <ReviewCorse 
              comments={comments}
              course={course}
              onAddComment={handleAddComment}
              onRateCourse={handleRateCourse}
            />
          </div>
          
          <div className="lg:col-span-1">
            <EnrollCourse 
              course={course}
              isSubscribed={isSubscribed}
              onSubscriptionToggle={handleSubscriptionToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
