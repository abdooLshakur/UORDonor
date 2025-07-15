import React, { useState } from 'react';
import { FaDonate, FaSignOutAlt, FaChartBar, FaUser, FaBars, FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        '/api/users/logout',
        {},
        { withCredentials: true }
      );
      navigate('/donor-login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLinkClick = () => {
    setSidebarOpen(false); // Auto-close on mobile after link click
  };

  return (
    <div>
      {/* Mobile Hamburger */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white bg-stone-800 p-2 rounded shadow-md"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-stone-800 text-white flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          <div className="text-center text-2xl font-bold py-6 border-b border-stone-700">
            UOR Dashboard
          </div>
          <nav className="flex flex-col gap-2 p-4">
            <NavLink
              to="/"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded hover:bg-stone-700 ${
                  isActive ? 'bg-stone-700' : ''
                }`
              }
            >
              <FaHome /> Home
            </NavLink>
            <NavLink
              to="/donor-dashboard"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded hover:bg-stone-700 ${
                  isActive ? 'bg-stone-700' : ''
                }`
              }
            >
              <FaChartBar /> Dashboard
            </NavLink>
            <NavLink
              to="/donate-dashboard"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded hover:bg-stone-700 ${
                  isActive ? 'bg-stone-700' : ''
                }`
              }
            >
              <FaDonate /> Donate
            </NavLink>
            <NavLink
              to="/profile"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded hover:bg-stone-700 ${
                  isActive ? 'bg-stone-700' : ''
                }`
              }
            >
              <FaUser /> Profile
            </NavLink>
          </nav>
        </div>
        <div className="p-4 border-t border-stone-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 w-full rounded hover:bg-stone-700"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden transition-opacity duration-300 ease-in-out"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
