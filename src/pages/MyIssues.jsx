import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import Swal from "sweetalert2";

export default function MyIssues() {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    if (user) {
      axiosInstance.get("/issues").then(res => {
        setIssues(res.data.filter(i => i.email === user.email));
      });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This issue will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        // পরে delete API বানাবে, এখন শুধু ফিল্টার করছি
        setIssues(issues.filter(i => i._id !== id));
        Swal.fire("Deleted!", "Issue removed", "success");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">My Reported Issues</h2>

        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(issue => (
                <tr key={issue._id} className="border-b dark:border-gray-700">
                  <td className="p-4">{issue.title}</td>
                  <td className="p-4">{issue.category}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${issue.status === "ongoing" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td className="p-4 space-x-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Update</button>
                    <button onClick={() => handleDelete(issue._id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}