import BannerSlider from "../components/BannerSlider.jsx";
import RecentIssues from "../components/RecentIssues.jsx";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <BannerSlider />

      {/* Category Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Report an Issue</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {["Garbage", "Illegal Construction", "Broken Public Property", "Road Damage"].map((cat) => (
            <div key={cat} className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl p-8 text-center hover:scale-105 transition transform">
              <div className="text-5xl mb-4">Icon</div>
              <h3 className="text-xl font-bold">{cat}</h3>
            </div>
          ))}
        </div>
      </div>

      <RecentIssues />

      {/* Stats */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-5xl font-bold">500+</h3>
            <p className="text-xl">Registered Users</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold">89</h3>
            <p className="text-xl">Issues Resolved</p>
          </div>
          <div>
            <h3 className="text-5xl font-bold">127</h3>
            <p className="text-xl">Pending Reports</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-100 dark:bg-gray-800 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Join Our Cleanup Drive!</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Be a volunteer and help make our community cleaner and greener.</p>
        <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 px-12 rounded-full transition">
          Become a Volunteer
        </Link>
      </div>
    </>
  );
}