import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AddIssue from "./pages/AddIssue.jsx";
import AllIssues from "./pages/AllIssues.jsx";
import IssueDetails from "./pages/IssueDetails.jsx";
import MyIssues from "./pages/MyIssues.jsx";
import MyContributions from "./pages/MyContributions.jsx";
import Footer from "./layout/Footer.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Functional Pages */}
          <Route path="/add-issue" element={<AddIssue />} />
          <Route path="/all-issues" element={<AllIssues />} />
          <Route path="/issue/:id" element={<IssueDetails />} />
          <Route path="/my-issues" element={<MyIssues />} />
          <Route path="/my-contribution" element={<MyContributions />} />

          {/* 404 Not Found */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen text-center">
                <div>
                  <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                  <p className="text-3xl text-gray-700 dark:text-gray-300">Page Not Found!</p>
                  <a href="/" className="mt-6 inline-block btn-primary text-xl">
                    Go Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;