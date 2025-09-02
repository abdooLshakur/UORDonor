import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setIsAuthenticated(true);
      console.log("User found:", user);
    } else {
      console.log("No user found");
      setIsAuthenticated(false);
    }
  }, [location.pathname]);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-stone-800">
          Umma of <span className="text-stone-600">Rasulullah</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-stone-700 text-sm font-medium items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/causes">Causes</Link></li>
          <li><Link to="/contactus">Contact</Link></li>
          {isAuthenticated ? (
            <li><Link to="/donor-dashboard">Dashboard</Link></li>
          ) : (
            <li><Link to="/donor-login" className="text-stone-800 hover:underline">Sign In</Link></li>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-stone-800 focus:outline-none"
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}>
        <ul className="flex flex-col gap-4 px-4 pb-4 text-stone-700 text-sm font-medium">
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/aboutus" onClick={() => setIsOpen(false)}>About Us</Link></li>
          <li><Link to="/causes" onClick={() => setIsOpen(false)}>Causes</Link></li>
          <li><Link to="/contactus" onClick={() => setIsOpen(false)}>Contact</Link></li>
          <li><Link to="/donor-dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
          {isAuthenticated ? (
            <li><Link to="/donor-dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link></li>
          ) : (
            <li><Link to="/donor-login" onClick={() => setIsOpen(false)}>Sign In</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
}
