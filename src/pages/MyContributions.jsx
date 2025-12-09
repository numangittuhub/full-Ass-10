// src/pages/MyContribution.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

export default function MyContribution() {
  const { user } = useAuth();
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axiosInstance
        .get(`/contributions/my/${user.email}`)
        .then((res) => {
          setContributions(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(34, 139, 34);
    doc.text("My Contributions - CleanCity", 14, 25);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Contributor: ${user?.displayName || user?.email || "User"}`, 14, 38);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 46);

    autoTable(doc, {
      head: [["Issue Title", "Amount (৳)", "Date"]],
      body: contributions.map((c) => [
        c.issueTitle || "Unknown Issue",
        `৳${c.amount || 0}`,
        new Date(c.date).toLocaleDateString(),
      ]),
      startY: 60,
      theme: "grid",
      headStyles: { fillColor: [34, 139, 34], textColor: 255, fontStyle: "bold" },
      styles: { fontSize: 12, cellPadding: 8 },
      alternateRowStyles: { fillColor: [240, 255, 240] },
    });

    doc.save("My_Contributions_CleanCity.pdf");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl text-gray-600">
        Please login to view your contributions
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6">
          <h2 className="text-5xl font-bold text-green-600 dark:text-green-400">
            My Contributions
          </h2>
          {contributions.length > 0 && (
            <button
              onClick={downloadPDF}
              className="btn btn-success btn-lg shadow-xl hover:shadow-2xl transition transform hover:scale-105"
            >
              Download PDF Report
            </button>
          )}
        </div>

        {contributions.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl">
            <p className="text-4xl text-gray-500 mb-8">No contributions yet</p>
            <p className="text-2xl text-gray-600 mb-10">
              Be the first to make a difference!
            </p>
            <a href="/all-issues" className="btn btn-primary btn-lg text-xl px-10 py-5">
              Explore Issues & Contribute
            </a>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-green-600 text-white text-lg">
                  <tr>
                    <th className="p-6">Issue Title</th>
                    <th className="p-6 text-center">Amount (৳)</th>
                    <th className="p-6 text-center">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((c) => (
                    <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="p-6 font-medium text-lg">{c.issueTitle || "Unknown Issue"}</td>
                      <td className="p-6 text-center text-2xl font-bold text-green-600">
                        ৳{c.amount || 0}
                      </td>
                      <td className="p-6 text-center text-gray-600 dark:text-gray-400">
                        {new Date(c.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-green-100 dark:bg-green-900 font-bold text-xl">
                    <td className="p-6">Total</td>
                    <td className="p-6 text-center text-green-700 dark:text-green-300">
                      ৳{contributions.reduce((sum, c) => sum + (c.amount || 0), 0)}
                    </td>
                    <td className="p-6 text-center">{contributions.length} contribution(s)</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}