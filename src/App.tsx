import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import HomePage from './pages/HomePage';
import CanvasAndChillPage from './pages/CanvasAndChillPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="relative">
      {/* Grain overlay — sits above every route */}
      <div className="grain-overlay" />

      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/canvas-and-chill" element={<CanvasAndChillPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </div>
  );
}

export default App;
