import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Page as SettingsPage } from "@/Settings";
import ProfileSettingsPage from "@/ProfilePage";
import Layout from "./Feed";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/settings" />} />

        {/* Settings Page */}
        <Route path="/settings" element={<SettingsPage />} />

        {/* Profile Settings Page */}
        <Route path="/settings/profile" element={<ProfileSettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
