import { FaWhatsapp, FaInstagram, FaTiktok, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-200 text-sm mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Umma of Rasulullah</h3>
          <p>
            A charity foundation committed to helping those in need with love, support, and mercy — as a form of gratitude to Allah.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/aboutus" className="hover:underline">About Us</a></li>
            <li><a href="/causes" className="hover:underline">Causes</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p>📞 +234 707 856 1641</p>
          <p>✉️ uorcharityfoundation@gmail.com</p>
          <p>🌍 Remote, Nigeria</p>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-2">Connect with us</h4>
          <div className="flex gap-4 text-xl">
            <a href="https://whatsapp.com/channel/0029VaBNMp15fM5Vn8qY112s" target="_blank" rel="noopener noreferrer" className="text-green-500"><FaWhatsapp /></a>
            <a href="https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=qbvu3w2" className="hover:text-white"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@ummaofrasulullah?_t=ZM-8xwSQUmExqn&_r=1" className="hover:text-white"><FaTiktok /></a>
            <a href="https://www.youtube.com/@umma_of_rasulullah1" className="hover:text-white"><FaYoutube /></a>
            {/* <a href="#" className="hover:text-white"><FaTwitter /></a> */}
          </div>
        </div>
      </div>

      <div className="text-center border-t border-stone-700 py-4 text-xs">
        © {new Date().getFullYear()} Umma of Rasulullah. All rights reserved.
      </div>
    </footer>
  );
}
