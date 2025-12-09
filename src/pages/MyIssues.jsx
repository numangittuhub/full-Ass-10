// src/pages/MyIssues.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function MyIssues() {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    if (user) {
      axiosInstance.get("/issues").then((res) => {
        const myIssues = res.data.filter((i) => i.email === user.email);
        setIssues(myIssues);
      });
    }
  }, [user]);

  const startEdit = (issue) => {
    setEditingId(issue._id);
    setFormData({
      title: issue.title,
      category: issue.category,
      location: issue.location,
      description: issue.description,
      amount: issue.amount,
      status: issue.status || "ongoing",
    });
  };

  const saveEdit = async (id) => {
    try {
      const response = await axiosInstance.patch(`/issues/${id}`, {
        ...formData,
        email: user.email,
      });

      setIssues(issues.map((i) => (i._id === id ? response.data : i)));
      setEditingId(null);
      Swal.fire("Success!", "Issue updated successfully", "success");
    } catch (err) {
      Swal.fire("Error!", err.response?.data?.message || "Update failed", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.delete(`/issues/${id}`, {
          data: { email: user.email },
        });
        setIssues(issues.filter((i) => i._id !== id));
        Swal.fire("Deleted!", "Your issue has been removed.", "success");
      } catch (err) {
        Swal.fire("Error!", err.response?.data?.message || "Delete failed", "error");
      }
    }
  };

  if (!user) {
    return <div className="text-center py-20 text-3xl">Please login first</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 text-blue-600 dark:text-blue-400">
          My Reported Issues
        </h2>
        <p className="text-center text-xl mb-10 text-gray-600 dark:text-gray-400">
          Total: {issues.length} issue{issues.length !== 1 && "s"}
        </p>

        {issues.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-500 dark:text-gray-400">
              You haven't reported any issues yet
            </p>
            <Link to="/add-issue" className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl px-10 py-4 rounded-xl transition">
              Report Your First Issue
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
              <div
                key={issue._id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col"
              >
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col">
                  {editingId === issue._id ? (
                    <>
                      {/* Title */}
                      <input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full text-2xl font-bold mb-3 input input-bordered"
                        placeholder="Title"
                      />

                      {/* Description */}
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows="3"
                        className="w-full textarea textarea-bordered mb-3"
                        placeholder="Description"
                      />

                      {/* Category + Status */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="select select-bordered"
                        >
                          <option>Garbage</option>
                          <option>Illegal Construction</option>
                          <option>Broken Public Property</option>
                          <option>Road Damage</option>
                        </select>
                        <select
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                          className="select select-bordered"
                        >
                          <option value="ongoing">Ongoing</option>
                          <option value="ended">Ended</option>
                        </select>
                      </div>

                      {/* Amount - নতুন যোগ করা */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Suggested Budget (BDT)</label>
                        <input
                          type="number"
                          value={formData.amount}
                          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                          className="w-full input input-bordered"
                          placeholder="e.g. 500"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={() => saveEdit(issue._id)}
                          className="flex-1 btn btn-success"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 btn btn-ghost"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold mb-3 line-clamp-2">
                        {issue.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 line-clamp-3">
                        {issue.description}
                      </p>

                      {issue.description.length > 100 && (
                        <button
                          onClick={() => setSelectedIssue(issue)}
                          className="text-blue-600 hover:text-blue-800 font-medium mb-4 text-left"
                        >
                          See More...
                        </button>
                      )}

                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="badge badge-primary">{issue.category}</span>
                        <span className={`badge ${issue.status === "ongoing" ? "badge-warning" : "badge-success"}`}>
                          {issue.status}
                        </span>
                        <span className="badge badge-info">৳{issue.amount}</span>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={() => startEdit(issue)}
                          className="flex-1 btn btn-warning"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(issue._id)}
                          className="flex-1 btn btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Description Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto p-8 relative">
            <button
              onClick={() => setSelectedIssue(null)}
              className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h3 className="text-3xl font-bold mb-6">{selectedIssue.title}</h3>
            <img
              src={selectedIssue.image}
              alt=""
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {selectedIssue.description}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedIssue(null)}
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}