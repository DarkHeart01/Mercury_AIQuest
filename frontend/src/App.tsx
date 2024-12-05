import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          {/* Protected Routes */}
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/docsense" element={<DocSense />} />
          <Route path="/gittalk" element={<GitTalk />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Feed/trending" element={<TrendingFeed />} />
          <Route path="/CreatPost" element={<CreatePostPage />} />
          <Route path="/Query/:queryId" element={<QueryPage />} />
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
