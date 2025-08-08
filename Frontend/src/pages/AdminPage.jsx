import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { adminAPI, coursesAPI } from "../services/api";
import {
  FiBookOpen,
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
  FiMonitor,
  FiPieChart,
  FiBarChart2,
  FiUser,
  FiMenu,
  FiHome,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");

const AdminPage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({});
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  // جلب إحصائيات لوحة التحكم
  const fetchDashboardStats = async () => {
    try {
      const result = await adminAPI.getDashboardStats();
      if (result.success) {
        setDashboardStats(result.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  // جلب المستخدمين
  const fetchUsers = async () => {
    try {
      const result = await adminAPI.getUsers();
      if (result.success) {
        setUsers(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // جلب الكورسات
  const fetchCourses = async () => {
    try {
      const result = await coursesAPI.getAllCourses();
      if (result.success) {
        setCourses(result.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchUsers();
    fetchCourses();
  }, []);

  // مكون لوحة التحكم الرئيسية
  const DashboardComponent = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">لوحة التحكم</h2>
      
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FiUser className="text-blue-500 text-2xl ml-3" />
            <div>
              <p className="text-gray-600">إجمالي المستخدمين</p>
              <p className="text-2xl font-bold">{dashboardStats.total_users || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FiBookOpen className="text-green-500 text-2xl ml-3" />
            <div>
              <p className="text-gray-600">إجمالي الكورسات</p>
              <p className="text-2xl font-bold">{dashboardStats.total_courses || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FiAward className="text-purple-500 text-2xl ml-3" />
            <div>
              <p className="text-gray-600">الاشتراكات</p>
              <p className="text-2xl font-bold">{dashboardStats.total_subscriptions || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <FiBarChart2 className="text-orange-500 text-2xl ml-3" />
            <div>
              <p className="text-gray-600">التعليقات</p>
              <p className="text-2xl font-bold">{dashboardStats.total_comments || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* الأنشطة الأخيرة */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">الأنشطة الأخيرة</h3>
        <div className="space-y-4">
          {dashboardStats.recent_activities?.map((activity, index) => (
            <div key={index} className="flex items-center p-3 bg-gray-50 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-3"></div>
              <div>
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.created_at}</p>
              </div>
            </div>
          )) || (
            <p className="text-gray-500">لا توجد أنشطة أخيرة</p>
          )}
        </div>
      </div>
    </div>
  );

  // مكون إدارة المستخدمين
  const UsersComponent = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">إدارة المستخدمين</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الاسم
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                البريد الإلكتروني
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الدور
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاريخ التسجيل
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role === 'admin' ? 'مدير' : 'طالب'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleDateString('ar-EG')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:text-red-900 ml-4"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // مكون إدارة الكورسات
  const CoursesComponent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">إدارة الكورسات</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          إضافة كورس جديد
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={course.image || '/placeholder.jpg'}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {course.description?.substring(0, 100)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-blue-600 font-medium">{course.level}</span>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">تعديل</button>
                  <button 
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // حذف مستخدم
  const handleDeleteUser = async (userId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        const result = await adminAPI.deleteUser(userId);
        if (result.success) {
          setUsers(users.filter(user => user.id !== userId));
          alert('تم حذف المستخدم بنجاح');
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert('حدث خطأ أثناء حذف المستخدم');
      }
    }
  };

  // حذف كورس
  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الكورس؟')) {
      try {
        const result = await coursesAPI.deleteCourse(courseId);
        if (result.success) {
          setCourses(courses.filter(course => course.id !== courseId));
          alert('تم حذف الكورس بنجاح');
        } else {
          alert(result.error);
        }
      } catch (error) {
        alert('حدث خطأ أثناء حذف الكورس');
      }
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'لوحة التحكم',
      icon: <FiMonitor className="w-5 h-5" />,
      component: <DashboardComponent />
    },
    {
      id: 'users',
      label: 'المستخدمين',
      icon: <FiUser className="w-5 h-5" />,
      component: <UsersComponent />
    },
    {
      id: 'courses',
      label: 'الكورسات',
      icon: <FiBookOpen className="w-5 h-5" />,
      component: <CoursesComponent />
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">لوحة الإدارة</h2>
          <p className="text-gray-600 mt-2">مرحباً {user?.name}</p>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-3 text-right hover:bg-gray-50 ${
                activeTab === item.id ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-600' : 'text-gray-600'
              }`}
            >
              {item.icon}
              <span className="mr-3">{item.label}</span>
            </button>
          ))}
          
          <button
            onClick={logout}
            className="w-full flex items-center px-6 py-3 text-right text-red-600 hover:bg-red-50"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="mr-3">تسجيل الخروج</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {menuItems.find(item => item.id === activeTab)?.component}
      </div>
    </div>
  );
};

export default AdminPage;

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dashboardData = {
    courses: Array(5)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        title: `Course ${i + 1}`,
        instructor: `Instructor ${i + 1}`,
        students: Math.floor(Math.random() * 100),
        status: ["Published", "Draft", "Archived"][
          Math.floor(Math.random() * 3)
        ],
      })),
    lessons: Array(8)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        title: `Lesson ${i + 1}`,
        course: `Course ${Math.floor(i / 2) + 1}`,
        duration: `${Math.floor(Math.random() * 60) + 30} min`,
      })),
    instructors: Array(4)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        name: `Instructor ${i + 1}`,
        email: `instructor${i + 1}@example.com`,
        courses: Math.floor(Math.random() * 10) + 1,
      })),
    categories: ["Web", "Mobile", "Data", "Design"].map((name, i) => ({
      id: i + 1,
      name,
      courses: Math.floor(Math.random() * 20) + 5,
    })),
    subcategories: ["React", "Vue", "Flutter", "Python"].map((name, i) => ({
      id: i + 1,
      name,
      category: ["Web", "Mobile", "Data", "Design"][i],
      courses: Math.floor(Math.random() * 10) + 2,
    })),
    users: Array(10)
      .fill()
      .map((_, i) => ({
        id: i + 1,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        joined: new Date(Date.now() - Math.random() * 31536000000)
          .toISOString()
          .split("T")[0],
      })),
  };

  const menuItems = [
    { id: "courses", label: "Courses", icon: FiBookOpen },
    { id: "lessons", label: "Lessons", icon: FiMonitor },
    { id: "instructors", label: "Instructors", icon: FiAward },
    { id: "categories", label: "Categories", icon: FiPieChart },
    { id: "subcategories", label: "Subcategories", icon: FiBarChart2 },
    { id: "users", label: "Users", icon: FiUser },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const renderTable = (data, columns) => (
    <div className="overflow-x-auto rounded-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            {Object.entries(columns).map(([key, label]) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-800/50 transition-colors"
            >
              {Object.keys(columns).map((key) => (
                <td
                  key={`${item.id}-${key}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-300"
                >
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );

    const contentMap = {
      courses: renderTable(dashboardData.courses, {
        title: "Title",
        instructor: "Instructor",
        students: "Students",
        status: "Status",
      }),
      lessons: renderTable(dashboardData.lessons, {
        title: "Title",
        course: "Course",
        duration: "Duration",
      }),
      instructors: renderTable(dashboardData.instructors, {
        name: "Name",
        email: "Email",
        courses: "Courses",
      }),
      categories: renderTable(dashboardData.categories, {
        name: "Name",
        courses: "Courses",
      }),
      subcategories: renderTable(dashboardData.subcategories, {
        name: "Name",
        category: "Category",
        courses: "Courses",
      }),
      users: renderTable(dashboardData.users, {
        name: "Name",
        email: "Email",
        joined: "Joined",
      }),
    };

    return contentMap[activeTab] || contentMap.courses;
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <button
        onClick={() => setMobileSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg shadow"
      >
        <FiMenu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
        ${sidebarCollapsed ? "w-20" : "w-64"}
        ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        fixed md:relative z-40 h-full bg-gray-800 border-r border-gray-700
        transition-all duration-300 flex flex-col
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <FiBookOpen className="text-blue-400 w-6 h-6" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                EduAdmin
              </h1>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:block p-1 hover:bg-gray-700 rounded"
          >
            {sidebarCollapsed ? (
              <FiChevronRight className="w-5 h-5" />
            ) : (
              <FiChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                activeTab === id
                  ? "bg-gradient-to-r from-secondary to-primary text-white shadow-lg"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${sidebarCollapsed ? "mx-auto" : "mr-3"}`}
              />
              {!sidebarCollapsed && label}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg"
          >
            <FiHome className="w-5 h-5 mr-3" />
            {!sidebarCollapsed && "Back to Home"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              router.push("/login");
            }}
            className="w-full flex items-center p-3 text-red-400 hover:bg-red-900/20 rounded-lg mt-1"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            {!sidebarCollapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {menuItems.find((item) => item.id === activeTab)?.label ||
              "Dashboard"}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-blue-300">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-gray-900">
          <div className="max-w-6xl mx-auto">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
