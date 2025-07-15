import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaDonate, FaUser, FaChartBar, FaSignOutAlt, FaClipboardList ,FaIdBadge} from "react-icons/fa";

const AdminSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div>
            {/* Mobile Hamburger */}
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white bg-stone-800 p-2 rounded">
                    <FaBars size={20} />
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`fixed md:static min-h-screen z-40 top-0 left-0 h-full w-64 bg-stone-800 text-white flex flex-col justify-between transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <div>
                    <div className="text-center text-2xl font-bold py-6 border-b border-stone-700">
                        Admin Panel
                    </div>
                    <nav className="flex flex-col gap-2 p-4">
                        <Link to="/admin-dashboard" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
                            <FaChartBar /> Dashboard
                        </Link>
                        <Link to="/admin-donations" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
                            <FaDonate /> Donations
                        </Link>
                        <Link to="/admin-donors" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
                            <FaUser /> Donors
                        </Link>
                        <Link to="/admin-causes" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
                            <FaClipboardList /> Causes
                        </Link>
                        <Link to="/admin-profile" className="flex items-center gap-3 p-2 rounded hover:bg-stone-700">
                            <FaIdBadge /> Profile
                        </Link>
                    </nav>
                </div>
                <div className="p-4 border-t border-stone-700">
                    <button className="flex items-center gap-3 p-2 w-full rounded hover:bg-stone-700">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>
        </div>
    )
}

export default AdminSidebar
