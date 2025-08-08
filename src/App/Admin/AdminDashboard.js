import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "./Sidebar";

const AdminDashboard = () => {
  const api = "https://api.ummaofrasulullahcharityfoundation.com";
  const [stats, setStats] = useState(null);
  const [causes, setCauses] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, causesRes] = await Promise.all([
          fetch(`${api}/api/users/stats`, { credentials: "include" }),
          fetch(`${api}/api/causes`, { credentials: "include" }),
        ]);

        if (!statsRes.ok || !causesRes.ok) throw new Error("Failed to fetch dashboard data");

        const statsData = await statsRes.json();
        const causesData = await causesRes.json();

        setStats(statsData);
        setCauses(causesData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      <AdminSidebar/>
      {/* Main Content */}
      <main className="min-w-[100vw] lg:min-w-[85vw] flex-1 bg-stone-100 p-6">
        <h1 className="text-2xl font-bold text-stone-800 mb-6">Admin Overview</h1>

        {stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white shadow-md rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Total Donations</h3>
                <p className="text-3xl font-bold text-green-600">₦{stats.totalDonations.toLocaleString()}</p>
              </div>

              <div className="bg-white shadow-md rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Total Donors</h3>
                <p className="text-3xl font-bold text-stone-800">{stats.totalDonors}</p>
              </div>

              <div className="bg-white shadow-md rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Total Causes</h3>
                <p className="text-3xl font-bold text-stone-800">{stats.totalCauses}</p>
              </div>

              <div className="bg-white shadow-md rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-4">Donations Status</h3>
                <div className="flex justify-between text-sm font-medium">
                  <div className="text-green-600">✅ Verified: <span className="text-stone-800">{stats.verifiedDonations}</span></div>
                  <div className="text-yellow-600">⏳ Pending: <span className="text-stone-800">{stats.pendingDonations}</span></div>
                </div>
                <div className="mt-4 h-2 bg-stone-200 rounded-full overflow-hidden">
                  <div className="bg-green-600 h-2" style={{ width: `${(stats.verifiedDonations / (stats.verifiedDonations + stats.pendingDonations || 1)) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* Causes Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow rounded-2xl p-4">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">✅ Completed Causes</h3>
                <table className="w-full text-sm text-stone-700">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Title</th>
                      <th className="text-right py-2">Raised</th>
                      <th className="text-right py-2">Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {causes.filter(c => c.isCompleted).map(cause => (
                      <tr key={cause._id}>
                        <td className="py-2">{cause.title}</td>
                        <td className="py-2 text-right">₦{cause.raisedAmount.toLocaleString()}</td>
                        <td className="py-2 text-right">₦{cause.goalAmount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white shadow rounded-2xl p-4">
                <h3 className="text-lg font-semibold text-stone-800 mb-4">⏳ Incomplete Causes</h3>
                <table className="w-full text-sm text-stone-700">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Title</th>
                      <th className="text-right py-2">Raised</th>
                      <th className="text-right py-2">Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    {causes.filter(c => !c.isCompleted).map(cause => (
                      <tr key={cause._id}>
                        <td className="py-2">{cause.title}</td>
                        <td className="py-2 text-right">₦{cause.raisedAmount.toLocaleString()}</td>
                        <td className="py-2 text-right">₦{cause.goalAmount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <p>Loading dashboard...</p>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
