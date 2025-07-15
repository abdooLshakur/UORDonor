import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const DonorDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("https://uor.onrender.com/api/donations/my", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      const data = await res.json();
      setDashboardData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  const totalDonated = typeof dashboardData?.totalDonated === "number" ? dashboardData.totalDonated : 0;
  const causesSupported = dashboardData?.causesSupported || 0;
  const lastDonation = dashboardData?.lastDonation;
  const recentDonations = Array.isArray(dashboardData?.recentDonations) ? dashboardData.recentDonations : [];

  const formatAmount = (amount) => {
    return typeof amount === "number" ? amount.toFixed(2) : "0.00";
  };

  const formatDate = (dateString) => {
    try {
      return dateString ? new Date(dateString).toISOString().split('T')[0] : "N/A";
    } catch {
      return "N/A";
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="min-w-[100vw] lg:min-w-[85vw]  max-w-full flex-1 bg-stone-100 p-6 overflow-x-hidden">
        <h2 className="text-2xl font-bold text-stone-800 mb-6">My Donation Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-stone-800">Total Donated</h3>
            <p className="text-2xl font-bold text-green-600">₦{formatAmount(totalDonated)}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-stone-800">Causes Supported</h3>
            <p className="text-2xl font-bold">{causesSupported}</p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6 md:col-span-2">
            <h3 className="text-lg font-semibold mb-2 text-stone-800">Last Donation</h3>
            {lastDonation ? (
              <>
                <p>
                  <strong>Cause:</strong> {lastDonation?.causeId?.title || "N/A"}
                </p>
                <p>
                  <strong>Amount:</strong> ₦{formatAmount(lastDonation?.amount)}
                </p>
                <p>
                  <strong>Date:</strong> {formatDate(lastDonation?.createdAt)}
                </p>
              </>
            ) : (
              <p className="text-stone-500">No donations yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-stone-800">Recent Donations</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-stone-100 text-stone-700">
                <tr>
                  <th className="py-3 px-4 text-left">Cause</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.length > 0 ? (
                  recentDonations.map((donation) => (
                    <tr key={donation._id} className="border-b">
                      <td className="py-2 px-4">{lastDonation?.causeId?.title || "N/A"}</td>
                      <td className="py-2 px-4 text-right">₦{formatAmount(donation?.amount)}</td>
                      <td className="py-2 px-4">{donation?.status || "N/A"}</td>
                      <td className="py-2 px-4">{formatDate(donation?.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-stone-500">
                      No donations yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;
