// src/pages/MyContribution.jsx (এটা ঠিক আছে, শুধু নিচেরটা কপি করো)
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

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
    doc.setFontSize(20);
    doc.text("My Contributions - CleanCity", 14, 20);
    doc.text(`Contributor: ${user.displayName || user.email}`, 14, 32);

    autoTable(doc, {
      head: [["Issue", "Amount (৳)", "Date"]],
      body: contributions.map((c) => [
        c.issueTitle,
        c.amount,
        new Date(c.date).toLocaleDateString(),
      ]),
      startY: 50,
    });

    doc.save("my-contributions.pdf");
  };

  if (!user) return <div className="text-center py-20 text-3xl">Login required</div>;
  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-10 text-green-600">My Contributions</h2>

        {contributions.length === 0 ? (
          <p className="text-center text-2xl text-gray-600">No contributions yet</p>
        ) : (
          <>
            <button onClick={downloadPDF} className="btn btn-success mb-6">Download PDF</button>
            <div className="space-y-6">
              {contributions.map((c) => (
                <div key={c._id} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="text-xl font-bold">{c.issueTitle}</h3>
                  <p>Amount: ৳{c.amount} | Date: {new Date(c.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}