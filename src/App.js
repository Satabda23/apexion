import React from "react";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contactus from "./pages/Contact/Contactus";
// import TermsOfUse from "./pages/TermsOfUse";
// import TeamDetails from "./pages/TeamDetails/TeamDetails";
import AdminPanel from "./admin/AdminPanel";
import AdminLogin from "./admin/pages/AdminLogin";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy.jsx";
import TermsOfUse from "./pages/TermsUse/TermsUse.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./admin/styles/admin.scss";
import "./admin/styles/components.scss";
import "./admin/styles/pages.scss";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes - Your existing website */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        {/* <Route path="/team" element={<TeamDetails />} /> */}
        {/* <Route path="/TermsOfUse" element={<TermsOfUse />} /> */}

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Redirect /admin to /admin/login if not authenticated */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
