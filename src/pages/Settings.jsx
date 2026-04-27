import React from "react";
import { Link } from "react-router-dom";

const Settings = ({ darkMode, setDarkMode }) => {
  const dm=darkMode;
  const bg=dm?'bg-[#0F0A20] text-[#F3EEF8]':'bg-[#FAF7FF] text-[#2E1065]';
  const card=dm?'bg-[#1E1540] border-[#2A1F55]':'bg-white border-[#E9DEFF] shadow-sm';
  const muted=dm?'text-[#A78BFA]':'text-[#8B5CF6]';
  const lbl=`text-[10px] uppercase tracking-widest font-bold ${muted}`;
  const inp=`w-full p-4 rounded-2xl border outline-none text-sm resize-none focus:ring-2 transition-all ${dm?'bg-[#0F0A20] border-[#2A1F55] text-white focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 placeholder-[#4C1D95]':'bg-[#F3EEF9] border-[#E9DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/10'}`;

  return (
    <div className={`min-h-screen pb-12 ${bg}`}>
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${dm?'bg-[#0F0A20]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF] shadow-sm'}`}>
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-lg italic ${dm?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
          <span className={`text-sm font-bold ${muted}`}>⚙ Settings</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto pt-24 px-6 space-y-4">
        <div className="mb-8">
          <p className={`${lbl} mb-2`}>✦ Preferences</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif" }} className="text-4xl font-black">Settings</h1>
        </div>

        {/* Appearance */}
        <div className={`p-6 rounded-2xl border ${card}`}>
          <p className={`${lbl} mb-4`}>✦ Appearance</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Dark Mode</p>
              <p className={`text-xs mt-0.5 ${muted}`}>Toggle between light and dark themes</p>
            </div>
            {setDarkMode?(
              <button onClick={()=>setDarkMode(!dm)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${dm?'bg-gradient-to-r from-[#6D28D9] to-[#EC4899]':'bg-[#E9DEFF]'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${dm?'left-7':'left-1'}`}/>
              </button>
            ):(<span className={`px-3 py-1 rounded-full text-xs font-bold ${dm?'bg-[#8B5CF6]/20 text-[#A78BFA]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>{dm?'Dark':'Light'}</span>)}
          </div>
        </div>

        {/* FAQ */}
        <div className={`p-6 rounded-2xl border ${card}`}>
          <p className={`${lbl} mb-4`}>✦ FAQ</p>
          {[
            {q:"How do I borrow a book?",a:"Browse the collection, find your book, and click 'Borrow Now'."},
            {q:"How many books can I borrow?",a:"Up to 5 books at a time. Return one to borrow another."},
            {q:"How do I join a community?",a:"Go to Groups and click on any community to join it instantly."},
          ].map(({q,a})=>(
            <details key={q} className={`mb-2 p-4 rounded-xl cursor-pointer group transition-all ${dm?'bg-[#0F0A20] hover:bg-[#150E2B]':'bg-[#F3EEF9] hover:bg-[#EDE5FF]'}`}>
              <summary className={`font-semibold text-sm list-none flex items-center justify-between`}>
                <span>{q}</span>
                <span className={`text-xs ${muted} group-open:rotate-180 transition-transform`}>▼</span>
              </summary>
              <p className={`text-sm mt-2 ${muted}`}>{a}</p>
            </details>
          ))}
        </div>

        {/* Contact */}
        <div className={`p-6 rounded-2xl border ${card}`}>
          <p className={`${lbl} mb-4`}>✦ Contact Support</p>
          <textarea rows="4" placeholder="Your message..." className={inp}/>
          <button className="mt-3 px-6 py-3 rounded-xl font-bold text-sm text-white btn-magic transition-all hover:-translate-y-0.5 active:scale-95">
            Send Message ✦
          </button>
        </div>

        {/* About */}
        <div className={`p-6 rounded-2xl border ${card}`}>
          <p className={`${lbl} mb-3`}>✦ About BiblioTech</p>
          <p className={`text-sm leading-relaxed ${muted}`}>A magical digital library platform. Discover, read, and connect with a community of book lovers. Version 2.0.0</p>
        </div>
      </main>
    </div>
  );
};
export default Settings;
