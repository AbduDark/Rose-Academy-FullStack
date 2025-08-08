import { useState } from "react";
import { FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import Logo from "../../assets/images/Rose_Logo.png";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
<nav className="sticky top-0 flex-nowrap z-50 shadow-md bg-gradient-to-r from-secondary/80 to-primary/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            className="navbar-brand flex items-center h-full"
            onClick={() => setIsMenuOpen(false)}
            to="/"
          >
            <img src={Logo} alt="Logo" className="h-11 max-h-11 w-auto" />
          </Link>
          {/* Mobile menu button */}
          <button
            className="md:hidden ml-auto rounded-md p-2 text-gray-800 focus:outline-none"
            onClick={toggleMenu}
          >
            <div className="space-y-2">
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all ${
                  isMenuOpen ? "rotate-45 transform origin-top-left" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-600 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-gray-600 transition-all ${
                  isMenuOpen ? "-rotate-45 transform origin-bottom-left" : ""
                }`}
              ></span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:w-full">
            <ul className="navbar-nav mx-auto mb-xl-0 flex space-x-4">
              <li className="nav-item">
                <Link
                  className="nav-link px-3 py-2 text-white font-medium text-base hover:text-primary"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link px-3 py-2 text-white font-medium text-base hover:text-primary"
                  to="/courses"
                >
                  Courses
                </Link>
              </li>
            </ul>

            {/* Search Form */}
            {/* <form className="d-flex search-form hidden md:flex">
              <input
                className="form-control rounded-r-none border-r-0 px-3 py-1.5 text-sm focus:border-purple-500 focus:ring-purple-500"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn rounded-l-none bg-purple-600 text-white px-3 py-1.5"
                type="submit"
              >
                <FaSearch />
              </button>
            </form> */}

            {/* User Dropdown */}
            <div className="user-dropdown flex items-center ml-8 text-white relative">
              {false ? (
                <button
                  className="rounded-full text-2xl"
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <FaCircleUser />
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="bg-white text-primary hover:bg-purple-100 hover:text-primary px-4 py-2 rounded-md text-sm font-semibold transition duration-200"
                >
                  Login
                </Link>
              )}
              {isUserDropdownOpen && (
                <ul className="dropdown-menu absolute right-0 top-8 mt-2 w-56 bg-white shadow-lg rounded-md py-1 z-50 border-b-2 border-secondary">
                  <li>
                    <h4 className="dropdown-header px-4 py-2 text-sm font-bold text-center text-gray-700">
                      Mohamed Gomaa
                    </h4>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1 border-gray-300" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      href="student-dashboard.html"
                    >
                      My Profile <FaUser className="text-gray-600" />
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1 border-gray-300" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item flex justify-between items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      href="#"
                    >
                      Logout <FaSignOutAlt className="text-gray-600" />
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
            <ul className="navbar-nav flex flex-col">
              <li className="nav-item border-b border-gray-200">
                <Link
                  className="nav-link block px-4 py-3 text-gray-900 hover:text-indigo-600"
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item border-b border-gray-200">
                <Link
                  className="nav-link block px-4 py-3 text-gray-900 hover:text-indigo-600"
                  to="/courses"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Courses
                </Link>
              </li>
              <li className="nav-item border-b border-gray-200">
                <Link
                  className="nav-link block px-4 py-3 text-gray-900 hover:text-indigo-600"
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="px-4 py-3 border-t border-gray-200">
              <form className="search-form flex">
                <input
                  className="form-control flex-1 rounded-r-none border-r-0 px-3 py-2 text-sm"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn rounded-l-none bg-purple-600 text-white px-3 py-2"
                  type="submit"
                >
                  <FaSearch />
                </button>
              </form>
            </div>

            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <FaCircleUser />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">
                    Mohamed Gomaa
                  </h4>
                  <div className="flex space-x-4 mt-1">
                    <a
                      href="#"
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
