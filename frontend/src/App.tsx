import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/pages/Landing';
import Feed from '@/pages/Feed';
import Post from '@/pages/Post';
import { Page } from '@/pages/Settings';
import ProfileSettingsPage from '@/pages/ProfilePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Root Route */}
        <Route path="/" element={<Layout />} />

        {/* Feed Pages */}
        <Route path="/feed" element={<Feed />} />
        <Route path="/feed/:postId" element={<Post />} /> {/* Dynamic Route */}

        {/* Settings Pages */}
        <Route path="/settings" element={<Page />} />
        <Route path="/settings/profile" element={<ProfileSettingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
