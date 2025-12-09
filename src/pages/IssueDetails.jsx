// src/pages/IssueDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js"; // এটাই ব্যবহার করতে হবে
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext.jsx";

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  // ইস্যু ফেচ করা
  useEffect(() => {
    axiosInstance
      .get(`/issues/${id}`)
      .then((res) => setIssue(res.data))
      .catch(() => {
        Swal.fire("Error", "Issue not found!", "error");
        navigate("/all-issues");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // কন্ট্রিবিউশন পোস্ট করা (সার্ভারে যাবে)
  const handleContribute = async (e) => {
    e.preventDefault();
    const form = e.target;

    const contributionData = {
      issueId: id,
      issueTitle: issue.title,
      amount: Number(form.amount.value),
      name: form.name.value,
      email: user.email,
      phone: form.phone.value,
      address: form.address.value,
    };

    try {
      await axiosInstance.post("/contributions", contributionData);

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: `৳${contributionData.amount} contributed successfully!`,
        timer: 3000,
      });

      form.reset();
      document.getElementById("contribute_modal").close();
    } catch (err) {
      console.error("Contribution failed:", err);
      Swal.fire("Error!", "Failed to contribute. Try again.", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!issue) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Main Issue Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <img src={issue.image} alt={issue.title} className="w-full h-96 object-cover" />
          <div className="p-8 lg:p-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              {issue.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {issue.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">Category</p>
                <p className="font-bold text-blue-600 dark:text-blue-400">{issue.category}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                <p className="font-bold text-green-600 dark:text-green-400">{issue.location}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
                <p className="font-bold text-purple-600 dark:text-purple-400">৳{issue.amount}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                <p className="font-bold text-orange-600 dark:text-orange-400 capitalize">
                  {issue.status || "Ongoing"}
                </p>
              </div>
            </div>

            {/* Contribute Button */}
            <button
              onClick={() => document.getElementById("contribute_modal").showModal()}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl px-10 py-5 rounded-xl shadow-lg transform hover:scale-105 transition"
            >
              Pay Clean-Up Contribution
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
     {/* Contribute Modal */}
<dialog id="contribute_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="text-3xl font-bold mb-8 text-green-600">Make Your Contribution</h3>
    <form onSubmit={handleContribute} className="space-y-6">
      {/* Name - Auto filled if logged in */}
      <div>
        <label className="block text-lg font-medium mb-2">Your Name</label>
        <input
          name="name"
          type="text"
          defaultValue={user?.displayName || user?.email?.split("@")[0] || ""}
          required
          readOnly={!!user} // লগইন থাকলে এডিট করা যাবে না
          className={`input input-bordered w-full text-lg ${user ? "bg-gray-100 dark:bg-gray-700" : ""}`}
          placeholder="Your Full Name"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-lg font-medium mb-2">Amount (BDT)</label>
        <input
          name="amount"
          type="number"
          min="50"
          required
          className="input input-bordered w-full text-lg"
          placeholder="Minimum ৳50"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-lg font-medium mb-2">Phone Number</label>
        <input
          name="phone"
          type="tel"
          required
          className="input input-bordered w-full text-lg"
          placeholder="01XXXXXXXXX"
        />
      </div>

      {/* Address */}
      <div>
        <label className="block text-lg font-medium mb-2">Your Address</label>
        <input
          name="address"
          type="text"
          required
          className="input input-bordered w-full text-lg"
          placeholder="House no, Road, Area, City"
        />
      </div>

      {/* Buttons */}
      <div className="modal-action flex justify-center gap-6">
        <button type="submit" className="btn btn-success btn-lg px-10">
          Contribute Now
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-lg px-10"
          onClick={() => document.getElementById("contribute_modal").close()}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</dialog>
      
    </div>
  );
}