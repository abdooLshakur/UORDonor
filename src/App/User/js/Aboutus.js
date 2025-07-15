import React from "react";
import { FaHeart, FaPeopleCarry, FaBullseye, FaWhatsapp, FaBook, FaTshirt, FaHome, FaUtensils, FaLightbulb } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="w-[100vw] bg-stone-50 text-stone-800 overflow-x-hidden">
      <Navbar/>
      {/* Header Section with Background Image */}
      <section className="relative bg-cover bg-center text-white py-24 px-6" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551907234-2281e6fc7f19?auto=format&fit=crop&w=1650&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg md:text-xl">
            Umma of Rasulullah Charity Foundation is committed to restoring hope,
            dignity, and opportunity to the vulnerable in our society — through
            compassion, action, and sustainable support.
          </p>
        </div>
      </section>

      {/* Founder Motivation Section */}
      <section className="bg-stone-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Founder's Motivation</h2>
          <p className="text-lg text-stone-700">
            "This foundation is my way of showing gratitude to Allah for the gift of life
            and the blessings He has given me — love, care, and kindness from family,
            friends, and even strangers. It is through this platform that I give back that
            same love and support to others who need it most."
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-3 gap-10 text-center">
        <div>
          <FaBullseye size={40} className="mx-auto mb-3 text-stone-800" />
          <h2 className="text-xl font-bold mb-2">Our Mission</h2>
          <p className="text-sm text-stone-600">
            To provide food, shelter, education, and support to those in urgent need,
            especially orphans, widows, and the poor, inspired by the teachings of the Prophet Muhammad (ﷺ).
          </p>
        </div>
        <div>
          <FaHeart size={40} className="mx-auto mb-3 text-stone-800" />
          <h2 className="text-xl font-bold mb-2">Our Vision</h2>
          <p className="text-sm text-stone-600">
            A world where no child goes hungry, no widow is neglected, and every soul
            has the dignity of care, love, and opportunity.
          </p>
        </div>
        <div>
          <FaPeopleCarry size={40} className="mx-auto mb-3 text-stone-800" />
          <h2 className="text-xl font-bold mb-2">Our Values</h2>
          <p className="text-sm text-stone-600">
            Compassion, transparency, unity, service, and unwavering faith in the power of collective good.
          </p>
        </div>
      </section>

      {/* Core Programs */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Core Programs</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-4">
              <FaUtensils size={30} className="text-stone-800 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Feeding the Hungry</h4>
              <p className="text-sm text-stone-600">Food drives for orphans, widows, and poor families.</p>
            </div>
            <div className="p-4">
              <FaBook size={30} className="text-stone-800 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Education Support</h4>
              <p className="text-sm text-stone-600">Scholarships, learning kits, and school fee support.</p>
            </div>
            <div className="p-4">
              <FaTshirt size={30} className="text-stone-800 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">Clothing Drives</h4>
              <p className="text-sm text-stone-600">Wardrobe donations and seasonal outreach programs.</p>
            </div>
            <div className="p-4">
              <FaLightbulb size={30} className="text-stone-800 mx-auto mb-2" />
              <h4 className="font-semibold mb-1">MOXES Innovation</h4>
              <p className="text-sm text-stone-600">Empowering communities through innovation and modern outreach projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-white py-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Why Support Us?</h2>
          <p className="text-lg text-stone-700">
            Every naira you give helps us feed a child, clothe a soul, fund an education,
            or restore hope. We're more than a charity — we're a family for the forgotten.
          </p>
        </div>
      </section>

      {/* WhatsApp Community */}
      <section className="bg-stone-200 py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-stone-900">
            Join Our WhatsApp Community
          </h2>
          <p className="mb-6 text-stone-700">
            Stay connected with fellow donors, receive timely updates, and get inspired
            through real stories of change.
          </p>
          <a
            href="https://chat.whatsapp.com/E1T1LqGwk2cByn6s4wel7s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
          >
            <FaWhatsapp size={20} /> Join Now
          </a>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default AboutUs;
