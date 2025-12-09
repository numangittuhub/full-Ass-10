// src/layout/Footer.jsx
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Copyright } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Background gradient changed from 'from-gray-900 to-gray-800' to 'bg-gradient-to-r from-blue-900 to-blue-700'
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* 1. Logo & Description */}
          <div className="space-y-5">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              CleanCity
            </h2>
            {/* Translation: আপনার এলাকা পরিষ্কার ও বাসযোগ্য রাখতে আমরা প্রতিশ্রুতিবদ্ধ। সহজেই সমস্যা রিপোর্ট করুন এবং পরিবর্তনের অংশ হোন। */}
            <p className="text-gray-300 leading-relaxed">
              We are committed to keeping your area clean and livable. Easily report issues and be part of the change.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Copyright size={16} />
              {/* Translation: সর্বস্বত্ব সংরক্ষিত। */}
              <span>{currentYear} CleanCity. All rights reserved.</span>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            {/* Translation: গুরুত্বপূর্ণ লিঙ্ক */}
            <h3 className="text-2xl font-bold mb-6 text-green-400 border-b border-green-500 pb-2 inline-block">
              Important Links
            </h3>
            <ul className="space-y-3">
              {/* Translation: হোম */}
              <li><Link to="/" className="hover:text-cyan-400 transition flex items-center gap-2"><span className="text-cyan-400">›</span> Home</Link></li>
              {/* Translation: সকল সমস্যা */}
              <li><Link to="/all-issues" className="hover:text-cyan-400 transition flex items-center gap-2"><span className="text-cyan-400">›</span> All Issues</Link></li>
              {/* Translation: সমস্যা রিপোর্ট করুন */}
              <li><Link to="/add-issue" className="hover:text-cyan-400 transition flex items-center gap-2"><span className="text-cyan-400">›</span> Report an Issue</Link></li>
              {/* Translation: আমার রিপোর্ট */}
              <li><Link to="/my-issues" className="hover:text-cyan-400 transition flex items-center gap-2"><span className="text-cyan-400">›</span> My Reports</Link></li>
            </ul>
          </div>

          {/* 3. User Actions */}
          <div>
            {/* Translation: ব্যবহারকারী */}
            <h3 className="text-2xl font-bold mb-6 text-green-400 border-b border-green-500 pb-2 inline-block">
              User
            </h3>
            <ul className="space-y-3">
              {/* Translation: আমার কন্ট্রিবিউশন */}
              <li><Link to="/my-contribution" className="hover:text-cyan-400 transition flex items-center gap-2"><span className="text-cyan-400">›</span> My Contribution</Link></li>
              {/* Translation: লগইন */}
              <li><Link to="/login" className="hover:text-cyan-400 transition flex items-center gap-2"><span className="text-cyan-400">›</span> Login</Link></li>
              {/* Translation: রেজিস্টার */}
              <li><Link to="/register" className="hover:text-cyan-400 transition flex items-center gap-2"><span className="text-cyan-400">›</span> Register</Link></li>
            </ul>
          </div>

          {/* 4. Contact & Social */}
          <div className="space-y-6">
            {/* Translation: যোগাযোগ করুন */}
            <h3 className="text-2xl font-bold mb-6 text-green-400 border-b border-green-500 pb-2 inline-block">
              Contact Us
            </h3>
            
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-cyan-400" />
                <span>info@cleancity.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-cyan-400" />
                <span>+880 17XX-XXXXXX</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-cyan-400" />
                {/* Translation: ঢাকা, বাংলাদেশ */}
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

{/* Social Links */}
            <div>
              {/* Translation: আমাদের সাথে যুক্ত হোন */}
              <p className="text-lg font-medium mb-4">Connect With Us</p>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 hover:bg-cyan-500 p-3 rounded-full transition transform hover:scale-110">
                  <Facebook size={24} />
                </a>
                <a href="#" className="bg-white/10 hover:bg-cyan-500 p-3 rounded-full transition transform hover:scale-110">
                  <Twitter size={24} />
                </a>
                <a href="#" className="bg-white/10 hover:bg-cyan-500 p-3 rounded-full transition transform hover:scale-110">
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credit */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            {/* Translation: Developed with ❤️ by Noman Ahmad | Powered by MERN Stack */}
            Developed with ❤️ by <span className="font-bold text-cyan-400">Noman Ahmad</span> | Powered by MERN Stack
          </p>
        </div>
      </div>
    </footer>
  );
}