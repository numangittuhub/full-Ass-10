import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext.jsx";

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [issue, setIssue] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contributing, setContributing] = useState(false);

  // ফেচ ইস্যু
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/issues/${id}`);
        setIssue(res.data);
      } catch (err) {
        Swal.fire("Error", "Issue not found!", "error");
        navigate("/all-issues");
      } finally {
        setLoading(false);
      }
    };
    fetchIssue();
  }, [id, navigate]);

  // কন্ট্রিবিউশন হ্যান্ডলার
  const handleContribute = async (e) => {
    e.preventDefault();
    setContributing(true);

    const formData = {
      issueId: id,
      issueTitle: issue.title,
      amount: Number(e.target.amount.value),
      name: e.target.name.value,
      email: user?.email || "anonymous@example.com",
      phone: e.target.phone.value,
      address: e.target.address.value,
      date: new Date().toISOString(),
    };

    try {
      // পরে এখানে POST /api/contributions API যোগ করব
      // এখন শুধু UI-তে দেখাব
      setContributions([...contributions, formData]);
      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: `You contributed ৳${formData.amount} successfully!`,
        timer: 3000,
      });
      e.target.reset();
      document.getElementById("contribute_modal").close();
    } catch (err) {
      Swal.fire("Error", "Contribution failed!", "error");
    } finally {
      setContributing(false);
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
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-96 object-cover"
          />
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

        {/* Contributors List */}
        {contributions.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Our Heroes (Contributors)</h2>
            <div className="space-y-4">
              {contributions.map((c, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-gray-600">{c.phone} • {c.address}</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">৳{c.amount}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <dialog id="contribute_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-2xl font-bold mb-6">Make Your Contribution</h3>
          <form onSubmit={handleContribute} className="space-y-5">
            <input
              name="name"
              type="text"
              placeholder="Your Full Name"
              required
              className="input input-bordered w-full"
            />
            <input
              name="amount"
              type="number"
              min="50"
              placeholder="Amount in BDT (min 50)"
              required
              className="input input-bordered w-full"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              required
              className="input input-bordered w-full"
            />
            <input
              name="address"
              type="text"
              placeholder="Your Address"
              required
              className="input input-bordered w-full"
            />

            <div className="modal-action">
              <button type="submit" disabled={contributing} className="btn btn-success">
                {contributing ? "Processing..." : "Contribute Now"}
              </button>
              <button
                type="button"
                className="btn"
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