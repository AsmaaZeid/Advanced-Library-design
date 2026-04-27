import { useState } from "react";
import { Link } from "react-router-dom";
import defaultimage from "../assets/default-book-cover.jpg";
import { OwlyCharacter, WormyCharacter } from "../components/Characters";

const Profile = ({ darkMode }) => {
  const isDark = darkMode;
  const pageStyle = isDark ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';
  const panelStyle = isDark ? 'bg-[#1E1540] border-[#2A1F55]' : 'bg-white border-[#E9DEFF] shadow-sm';
  const dimText = isDark ? 'text-[#A78BFA]' : 'text-[#8B5CF6]';
  const labelText = `text-[10px] uppercase tracking-widest font-bold ${dimText}`;

  const user = {
    name: "Alex Johnson",
    initials: "AJ",
    joined: "Mar 2025",
    booksRead: 25,
    rank: "Book Lover",
    monthly: 3,
    pages: "1,240",
    favGenre: "Fantasy"
  };

  const [borrowed, setBorrowed] = useState([
    { id: 9, title: "The Martian", dueDate: "2026-03-15", rating: 4.5 },
    { id: 10, title: "Educated", dueDate: "2026-03-19", rating: 4.8 }
  ]);

  const handleReturn = (bookId) => {
    setBorrowed(prev => prev.filter(b => b.id !== bookId));
  };

  return (
    <div className={`min-h-screen pb-16 ${pageStyle}`}>
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${isDark?'bg-[#0F0A20]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF] shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-lg italic ${isDark?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
          <span className={`text-sm font-bold ${dimText}`}>My Profile</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto pt-24 px-6 space-y-8">
        <div className={`p-8 rounded-3xl border ${panelStyle}`} style={{ boxShadow:isDark?'0 0 50px rgba(109,40,217,.1)':'0 8px 40px rgba(109,40,217,.08)' }}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
              style={{ background:'linear-gradient(135deg,#8B5CF6,#EC4899)' }}>{user.initials}</div>
            <div className="text-center md:text-left flex-1">
              <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-3xl font-black mb-2">{user.name}</h2>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start text-xs">
                <span className={dimText}>✦ Joined {user.joined}</span>
                <span className={dimText}>✦ {user.booksRead} Books Read</span>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase text-white" style={{ background:'linear-gradient(135deg,#6D28D9,#EC4899)' }}>★ {user.rank}</span>
              </div>
            </div>
            <div className="hidden md:block" style={{ animation:'float 5s ease-in-out infinite' }}><OwlyCharacter size={80}/></div>
          </div>
        </div>

        <div>
          <p className={`${labelText} mb-4`}>✦ Reading Stats</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { l:'This Month', v:user.monthly, sub:'books read', icon:'📖' },
              { l:'Pages This Year', v:user.pages, sub:'pages devoured', icon:'✦' },
              { l:'Favourite Genre', v:user.favGenre, sub:'most read', icon:'♥' },
            ].map((s,i) => (
              <div key={i} className={`p-7 rounded-2xl border transition-all hover:scale-[1.02] ${panelStyle}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl" style={{ animation:`float ${3+i*.5}s ${i*.5}s ease-in-out infinite` }}>{s.icon}</span>
                  <span className={`text-xs ${dimText}`}>{s.l}</span>
                </div>
                <div className="text-4xl font-black text-shimmer">{s.v}</div>
                <div className={`text-xs mt-1 ${dimText}`}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className={`${labelText} mb-4`}>✦ Currently Borrowed</p>
          {borrowed.length === 0 ? (
            <div className={`p-8 rounded-2xl text-center border ${panelStyle}`}>
              <p className="text-sm text-[#A78BFA]">No books currently borrowed.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {borrowed.map(b => (
                <div key={b.id} className={`p-5 rounded-2xl border flex items-center gap-4 ${panelStyle}`}>
                  <img src={defaultimage} alt={b.title} className="w-12 h-18 object-cover rounded-xl shadow-md"/>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate mb-1">{b.title}</h4>
                    <p className={`text-xs mb-1 ${dimText}`}>Due: {b.dueDate}</p>
                    <div className="flex text-yellow-400 text-xs">{Array(5).fill(0).map((_,i)=><span key={i}>{i<Math.floor(b.rating)?'★':'☆'}</span>)}</div>
                  </div>
                  <button onClick={() => handleReturn(b.id)} className="px-3 py-2 rounded-xl text-xs font-bold text-white btn-magic hover:-translate-y-0.5 transition-all">Return</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className={`${labelText} mb-4`}>✦ Achievements</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon:'🏆', l:'First Book', earned:true },
              { icon:'✦', l:'10 Books Read', earned:true },
              { icon:'★', l:'Top Reviewer', earned:false },
              { icon:'♥', l:'Community Leader', earned:false },
            ].map((a,i) => (
              <div key={i} className={`p-5 rounded-2xl border text-center transition-all ${
                a.earned
                  ? (isDark ? 'bg-[#1E1540] border-[#A78BFA]/30' : 'bg-white border-[#C4B5FD]/50 shadow-md')
                  : (isDark ? 'bg-[#150E2B] border-[#2A1F55] opacity-40' : 'bg-[#F3EEF9] border-[#E9DEFF] opacity-40')
              }`}>
                <div className={`text-3xl mb-2 ${a.earned?'animate-float':''}`} style={a.earned ? { animationDelay:`${i*.4}s` } : {}}>{a.icon}</div>
                <p className="text-xs font-bold">{a.l}</p>
                {a.earned && <span className={`text-[10px] font-bold ${dimText}`}>✓ Earned</span>}
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-3xl border text-center ${panelStyle}`}>
          <div className="flex items-end justify-center gap-8 mb-4">
            <div style={{ animation:'float 4.5s ease-in-out infinite' }}><OwlyCharacter size={90}/></div>
            <div style={{ animation:'float 4.5s 1.5s ease-in-out infinite' }}><WormyCharacter size={105}/></div>
          </div>
          <p className={`text-sm italic ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`} style={{ fontFamily:"'Lora',serif" }}>"Keep reading — Owly and Wormy are cheering for you! ✨"</p>
        </div>
      </main>
    </div>
  );
};
export default Profile;
