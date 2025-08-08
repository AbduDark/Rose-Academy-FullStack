import { useState, useEffect } from "react";
import {
  FiEdit,
  FiMenu,
  FiX,
  FiTrash2,
  FiVideo,
} from "react-icons/fi";
import DeleteAccount from "../components/user/DeleteAccount";

import { coursesAPI, favoritesAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FiHeart } from "react-icons/fi";

const StudentDashboardPage = () => {
  const { user } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);

  // جلب الكورسات المشترك فيها
  const fetchMyCourses = async () => {
    try {
      const result = await coursesAPI.getMyCourses();
      if (result.success) {
        setMyCourses(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching my courses:', error);
    }
  };

  // جلب المفضلات
  const fetchFavorites = async () => {
    try {
      const result = await favoritesAPI.getFavorites();
      if (result.success) {
        setFavorites(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    fetchMyCourses();
    fetchFavorites();
  }, []);

  // مكون عرض الكورسات المشترك فيها
  const MyCoursesComponent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">كورساتي</h2>
      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((subscription) => (
            <div key={subscription.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={subscription.course.image || '/placeholder.jpg'}
                alt={subscription.course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{subscription.course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{subscription.course.description?.substring(0, 100)}...</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">مشترك</span>
                  <Link
                    to={`/course/${subscription.course.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    عرض الكورس
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">لم تشترك في أي كورس بعد</p>
          <Link
            to="/courses"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            تصفح الكورسات
          </Link>
        </div>
      )}
    </div>
  );

  // مكون عرض المفضلات
  const FavoritesComponent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">المفضلة</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={favorite.course.image || '/placeholder.jpg'}
                alt={favorite.course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{favorite.course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{favorite.course.description?.substring(0, 100)}...</p>
                <Link
                  to={`/course/${favorite.course.id}`}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  عرض الكورس
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 mb-4">لا توجد كورسات في المفضلة</p>
          <Link
            to="/courses"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            تصفح الكورسات
          </Link>
        </div>
      )}
    </div>
  );

  const menuItems = [
    {
      id: 1,
      label: "كورساتي",
      icon: <FiVideo className="w-5 h-5" />,
      component: <MyCoursesComponent />,
    },
    {
      id: 2,
      label: "المفضلة",
      icon: <FiHeart className="w-5 h-5" />,
      component: <FavoritesComponent />,
    },
    {
      id: 6,
      label: "تعديل الملف الشخصي",
      icon: <FiEdit className="w-5 h-5" />,
      component: <div>قريباً...</div>,
    },
    {
      id: 7,
      label: "حذف الحساب",
      icon: <FiTrash2 className="w-5 h-5" />,
      component: <DeleteAccount />,
    },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  const ActiveComponent = menuItems.find(
    (item) => item.id === activeTab
  )?.component;

  return (
    <section className="relative pb-8">
      {/* Background Cover */}
      <div className="h-28 bg-gradient-to-r from-secondary to-primary"></div>

      {/* Profile Head */}
      <div className="-mt-8 mb-6">
        <div className="container mx-auto px-4">
          <div className="bg-transparent shadow-none">
            <div className="flex flex-wrap items-center">
              <div className="w-auto">
                <div className="w-32 h-32 mr-4 rounded-full bg-white p-1 border-4 border-gray-300">
                  <img
                    src={userData.image}
                    alt={userData.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mt-2 md:mt-0 bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-800">
                      {userData.name}
                    </h2>
                  </div>
                  <div className="md:hidden">
                    <button
                      onClick={toggleMenu}
                      className="p-2 -mt-6 text-white bg-white/20 rounded-full hover:bg-white/30"
                    >
                      {menuOpen ? (
                        <FiX className="w-5 h-5" />
                      ) : (
                        <FiMenu className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-3">
          {/* Sidebar Navigation */}
          {menuOpen && (
            <div className="w-full md:w-1/4 px-3 mb-6">
              <div className="rounded-lg bg-gradient-to-r from-secondary to-primary p-4 shadow-lg">
                <nav>
                  <ul className="space-y-1">
                    {menuItems.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleTabChange(item.id)}
                          className={`w-full flex items-center p-2 rounded transition-colors ${
                            activeTab === item.id
                              ? "bg-white text-gray-900"
                              : "text-white hover:bg-white/20"
                          }`}
                        >
                          <span
                            className={`mr-3 ${
                              activeTab === item.id
                                ? "text-primary"
                                : "text-white"
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="font-semibold">{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}

          <div className={`px-3 ${menuOpen ? "w-full md:w-3/4" : "w-full"}`}>
            {ActiveComponent}
          </div>
        </div>
      </div>
    </section>
  );
};
  

export default StudentDashboardPage;
