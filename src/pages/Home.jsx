// src/pages/Home.jsx
import BannerSlider from "../components/BannerSlider.jsx";
import RecentIssues from "../components/RecentIssues.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  const categories = [
    { name: "Garbage", color: "from-red-500 to-pink-600", icon: "🗑️" },
    { name: "Illegal Construction", color: "from-yellow-500 to-orange-600", icon: "🏗️" },
    { name: "Broken Public Property", color: "from-blue-500 to-cyan-600", icon: "🔧" },
    { name: "Road Damage", color: "from-purple-500 to-indigo-600", icon: "⚠️" },
  ];

  return (
    <>
      <BannerSlider />

      {/* Category Section - Clickable */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-5xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Report an Issue
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to="/add-issue"
              state={{ selectedCategory: cat.name }} // ← এটা পাঠাচ্ছি
              className={`group block bg-gradient-to-br ${cat.color} text-white rounded-2xl p-10 text-center shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300`}
            >
              <div className="text-7xl mb-6 group-hover:animate-bounce">
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold tracking-wide">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </div>

      <RecentIssues />

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="transform hover:scale-110 transition">
            <h3 className="text-6xl font-bold">500+</h3>
            <p className="text-2xl mt-4">Registered Users</p>
          </div>
          <div className="transform hover:scale-110 transition">
            <h3 className="text-6xl font-bold">89</h3>
            <p className="text-2xl mt-4">Issues Resolved</p>
          </div>
          <div className="transform hover:scale-110 transition">
            <h3 className="text-6xl font-bold">127</h3>
            <p className="text-2xl mt-4">Pending Reports</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 dark:bg-gray-800 py-24 text-center">
        <h2 className="text-5xl font-bold mb-6 text-gray-800 dark:text-white">
          Join Our Cleanup Drive!
        </h2>
        <p className="text-2xl mb-10 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
          Be a volunteer and help make our community cleaner and greener.
        </p>
        <Link
          to="/register"
          className="inline-block bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-5 px-16 rounded-full shadow-2xl transform hover:scale-110 transition"
        >
          Become a Volunteer
        </Link>
      </div>
    </>
  );
}