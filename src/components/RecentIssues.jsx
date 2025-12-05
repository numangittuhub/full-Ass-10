import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { Link } from "react-router-dom";

export default function RecentIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/issues")
      .then(res => {
        setIssues(res.data.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-20">Loading issues...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Recent Complaints</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {issues.map(issue => (
          <div key={issue._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <img src={issue.image} alt={issue.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{issue.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">{issue.description.slice(0, 80)}...</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{issue.category}</span>
                <span>{issue.location}</span>
              </div>
              <Link
                to={`/issue/${issue._id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                See Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}