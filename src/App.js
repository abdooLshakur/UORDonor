import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AboutUs from "./App/User/js/Aboutus";
import ContactPage from "./App/User/js/Contactpage";
import DonorDashboard from "./App/User/js/DonorsDashboard";
import DonorLogin from "./App/User/js/Login";
import DonorSignUp from "./App/User/js/Signup";
import DonatePage from "./App/User/js/DonoteDashboard";
import DonateFormPage from "./App/User/js/Donorsform";
import DonorProfile from "./App/User/js/DonorProfile";
import HomePage from "./App/User/js/Homepage";
import CausesListPage from "./App/User/js/Causespage";
import AdminDashboard from "./App/Admin/AdminDashboard";
import AdminDonations from "./App/Admin/Donations";
import AdminCauses from "./App/Admin/Causes";
import AdminUsers from "./App/Admin/Donors";
import AdminProfile from "./App/Admin/AdminProfile";
import AdminLogin from "./App/Admin/Login";
import ForgotPassword from "./App/User/js/Requestforgetpassword";
import CauseDetailPage from "./App/User/js/CauseDetailPage";
import AdminSignup from "./App/Admin/signup";


function App() {

  return (
    <Router>


      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/causes" element={<CausesListPage />} />
        <Route path="/donateform/:id" element={<DonateFormPage />} />
        <Route path="/causes/:id" element={<CauseDetailPage />} />
        <Route path="/donor-signup" element={<DonorSignUp />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/donate-dashboard" element={<DonatePage />} />
        <Route path="/profile" element={<DonorProfile />} />


        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-donations" element={<AdminDonations />} />
        <Route path="/admin-causes" element={<AdminCauses />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/record" element={<AdminSignup />} />
        <Route path="/admin-donors" element={<AdminUsers />} />
      </Routes>

    </Router>
  );
}

export default App;
