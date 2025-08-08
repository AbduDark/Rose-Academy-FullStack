import { useState, useEffect } from "react";
import {
  FiEdit,
  FiMenu,
  FiX,
  FiTrash2,
  FiVideo,
} from "react-icons/fi";
import DeleteAccount from "../components/user/DeleteAccount";

const StudentDashboardPage = () => {
  const [userData] = useState({
    name: "Mohamed Gomaa",
    email: "mohamed.gomaa@example.com",
    phone: "+1234567890",
    specialty: "Computer Science",
    years: "3rd Year",
    section: "A",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  });

  const [menuOpen, setMenuOpen] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    {
      id: 1,
      label: "Courses",
      icon: <FiVideo className="w-5 h-5" />,
      component: <h1>My Courses</h1>,
    },
    {
      id: 6,
      label: "Edit Profile",
      icon: <FiEdit className="w-5 h-5" />,
      component: <h1>My Courses</h1>,
    },
    {
      id: 7,
      label: "Delete Account",
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
