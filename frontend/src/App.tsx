import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Page as SettingsPage } from "@/pages/Settings";
import ProfileSettingsPage from "@/pages/ProfilePage";
import Feed from "@/pages/Feed";
import Landing from "@/pages/Landing";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar-feed";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/Settings" element={<SettingsPage />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
