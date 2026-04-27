import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import MagicCursor from './components/MagicCursor'
import Home from './pages/Home'
import DisplayBooks from './pages/DisplayBooks'
import BookDetail from './pages/BookDetail'
import Comments from './pages/Comments'
import DisplayComm from './pages/DisplayComm'
import CommDetails from './pages/CommDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Advanced from './pages/Advanced'
import Admin from './pages/Admin'
import ScrollToTop from './pages/ScrollToTop'
import AllGames from './pages/AllGames'
import GameDetails from './pages/GameDetails'
import RoadMap from './pages/RoadMap'

/* ── 404 Page ── */
const NotFound = () => (
  <div className="page-not-found bg-[#0F0A20] text-[#F3EEF8] min-h-screen">
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-[80px] bg-[#8B5CF6]/10"/>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[80px] bg-[#EC4899]/08"/>
    </div>
    <div className="relative z-10 text-center">
      <div className="text-8xl font-black text-shimmer mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>404</div>
      <h2 className="text-2xl font-bold text-[#C4B5FD] mb-2">Page not found</h2>
      <p className="text-[#A78BFA] mb-8">This page seems to have wandered off the shelf...</p>
      <a href="/" className="px-8 py-3 rounded-2xl font-bold text-white btn-magic shadow-xl hover:-translate-y-0.5 transition-all">
        Back to Library ✦
      </a>
    </div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      {/* Magic quill cursor — shown on all pages */}
      <MagicCursor />
      <ScrollToTop/>
      <Routes>
        <Route path="/"                    element={<Home         darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/search"              element={<DisplayBooks darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/book/:id"            element={<BookDetail   darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/comments/book/:id"   element={<Comments     darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/groups"              element={<DisplayComm  darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/groups/:id"          element={<CommDetails  darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/comments/groups/:id" element={<Comments     darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/login"               element={<Login        darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/register"            element={<Register     darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/profile"             element={<Profile      darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/settings"            element={<Settings     darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/advanced"            element={<Advanced     darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/admin"               element={<Admin/>}/>
        <Route path="/all-games"           element={<AllGames     darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/games/:id"           element={<GameDetails  darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="/roadmap/:id"         element={<RoadMap      darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        <Route path="*"                    element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
