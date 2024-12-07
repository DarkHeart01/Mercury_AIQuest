import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Use HashRouter for Electron
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
import DataBloom from "./pages/databloom";

function App() {
  // Set the basename for routing based on the environment
  const isElectron = process.env.ENV_TYPE === 'electron';
  const basename = isElectron ? '/mercury-ai.vercel.app' : '';
  
  return (
    <SidebarProvider>
      {/* Use HashRouter with dynamic basename */}
      <Router basename={basename}>
        <Routes>
          {/* Protected Routes */}
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/docsense" element={<DocSense />} />
          <Route path="/gittalk" element={<GitTalk />} />
          <Route path="/databloom" element={<DataBloom />} />
          <Route path="/Feed" element={<Feed />} />
          <Route path="/Feed/Trending" element={<TrendingFeed />} />
          <Route path="/CreatePost" element={<CreatePostPage />} />
          <Route path="/Query/:queryId" element={<QueryPage />} />
          <Route path="/Contribute" element={<ContributePage />} />
          <Route path='/Analytics' element={<AnalyticsPage />} />
          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/Settings" element={<SettingsPage />} />
          <Route path="Settings/profilepage" element={<ProfileSettingsPage />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
