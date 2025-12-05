import { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const dummyData = [
  { issue: "Garbage on Road 21", amount: 500, date: "2025-12-04" },
  { issue: "Broken Footpath", amount: 300, date: "2025-12-02" },
];

export default function MyContributions() {
  const [contributions] = useState(dummyData);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("My Contribution Report", 14, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    autoTable(doc, {
      head: [["Issue Title", "Amount (BDT)", "Date"]],
      body: contributions.map(c => [c.issue, c.amount, c.date]),
      startY: 40,
    });

    doc.save("my-contributions.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">My Contributions</h2>

        <table className="w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg mb-8">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4">Issue Title</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c, i) => (
              <tr key={i} className="border-b text-center">
                <td className="p-4">{c.issue}</td>
                <td className="p-4">৳{c.amount}</td>
                <td className="p-4">{c.date}</td>
                <td className="p-4">
                  <button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}