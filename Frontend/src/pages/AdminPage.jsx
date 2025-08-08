import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
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
