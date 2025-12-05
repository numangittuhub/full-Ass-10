import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function AllIssues() {
  const [issues, setIssues] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all issues
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/issues");
        setIssues(res.data);
        setFiltered(res.data);
      } catch (err) {
        Swal.fire("Error", "Failed to load issues", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...issues];

    if (search.trim()) {
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(search.toLowerCase()) ||
          i.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((i) => i.category === category);
    }

    setFiltered(result);
  }, [search, category, issues]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          All Reported Issues
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 text-lg">
          Total: {filtered.length} {filtered.length === 1 ? "issue" : "issues"} found
        </p>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 input input-bordered input-lg rounded-xl dark:bg-gray-800"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="select select-bordered select-lg rounded-xl dark:bg-gray-800"
          >
            <option value="">All Categories</option>
            <option value="Garbage">Garbage</option>
            <option value="Illegal Construction">Illegal Construction</option>
            <option value="Broken Public Property">Broken Public Property</option>
            <option value="Road Damage">Road Damage</option>
          </select>
        </div>

        {/* Issues Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-500 dark:text-gray-400">No issues found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((issue) => (
              <div
                key={issue._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
              >
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
                    {issue.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Category:</span> {issue.category}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Location:</span> {issue.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold text-green-600">Budget:</span> ৳{issue.amount}
                    </p>
                  </div>
                  <Link
                    to={`/issue/${issue._id}`}
                    className="block text-center bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 rounded-xl transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}