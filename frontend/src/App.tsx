import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Page as SettingsPage } from "@/pages/Settings";
import ProfileSettingsPage from "@/pages/ProfilePage";
import Feed from "@/pages/Feed";
import { SidebarProvider } from "@/components/ui/sidebar";
import GitTalk from "@/pages/gittalk";
import DocSense from "@/pages/docsense";
import LandingPage from "@/pages/newLanding";
import CreatePostPage from "./pages/CreatePost";
import AnalyticsPage from "./pages/AnalyticsPage";
import TrendingFeed from "./pages/TrendingFeed";
import ContributePage from "./pages/ContributePage";
import QueryPage from "./pages/QueryPage";
import { AuthProvider } from "@/components/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoginSignUp from "./pages/signin";

function App() {
  return (
    <SidebarProvider>
      /*<AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginSignUp />} />

          {/* Protected Routes */}
          <Route
            path="/Landing"
            element={<ProtectedRoute><LandingPage/></ProtectedRoute>}/>
            <Route path="/" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/docsense" element={<ProtectedRoute><DocSense /></ProtectedRoute>} />
            <Route path="/gittalk" element={<ProtectedRoute><GitTalk /></ProtectedRoute>} />
            <Route path="/Feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />

            <Route path="/Feed/trending" element={<ProtectedRoute><TrendingFeed /></ProtectedRoute>} />
            <Route path="/CreatPost" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
            <Route path="/Contribute" element={<ProtectedRoute><ContributePage /></ProtectedRoute>} />
            <Route path='/Analytics' element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
            <Route path="/Landing" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
            <Route path="/Settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="Settings/profilepage" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
          {/* Default Home Route */}
          <Route path="/" element={<Feed />} />
        </Routes>
      </Router>
    </AuthProvider>*/
    <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginSignUp />} />

          {/* Protected Routes */}
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/docsense" element={<DocSense />} />
          <Route path="/gittalk" element={<GitTalk />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Feed/trending" element={<TrendingFeed />} />
          <Route path="/CreatPost" element={<CreatePostPage />} />
          <Route path="/Contribute" element={<ContributePage />} />
          <Route path='/Analytics' element={<AnalyticsPage />} />
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/Settings" element={<SettingsPage />} />
          <Route path="Settings/profilepage" element={<ProfileSettingsPage />} />
          {/* Default Home Route */}
          <Route path="/" element={<Feed />} />

        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
