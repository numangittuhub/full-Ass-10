// src/pages/MyContribution.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function MyContribution() {
  const { user } = useAuth();
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    if (user) {
      axiosInstance.get(`/contributions/my/${user.email}`)
        .then(res => setContributions(res.data))
        .catch(() => setContributions([]));
    }
  }, [user]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("My Contributions Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${user.displayName || user.email}`, 14, 32);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 40);

    autoTable(doc, {
      head: [["Issue Title", "Amount (৳)", "Date"]],
      body: contributions.map(c => [
        c.issueTitle,
        c.amount,
        new Date(c.date).toLocaleDateString()
      ]),
      startY: 50,
    });

    doc.save("my-contributions.pdf");
  };

  if (!user) return <div className="text-center py-20 text-3xl">Please login</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-5xl font-bold text-green-600">My Contributions</h2>
          {contributions.length > 0 && (
            <button onClick={downloadPDF} className="btn btn-primary text-xl px-8">
              Download PDF
            </button>
          )}
        </div>

        {contributions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-3xl text-gray-500">You haven't contributed yet</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {contributions.map(c => (
              <div key={c._id} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold text-green-600">{c.issueTitle}</h3>
                <p className="text-xl mt-2">Amount: ৳{c.amount}</p>
                <p className="text-gray-600">Date: {new Date(c.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}