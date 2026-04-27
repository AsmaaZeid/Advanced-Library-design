import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const CommunityDetail = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = "Ali";
  const [community, setCommunity] = useState(location.state || {
    id: 0,
    name: "General Readers",
    description: "Welcome to the central hub for all book lovers.",
    category: "General",
    admin: "System",
    members: ["Ali", "Sara", "John"]
  });

  if (!community) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode?'bg-[#0F0A20] text-white':'bg-[#FAF7FF]'}`}>
        <h2 className="text-2xl font-bold">Community not found.</h2>
      </div>
    );
  }

  const isDark = darkMode;
  const pageClass = isDark ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';
  const panelClass = isDark ? 'bg-[#1E1540] border-[#2A1F55]' : 'bg-white border-[#E9DEFF] shadow-lg';
  const accentText = isDark ? 'text-[#A78BFA]' : 'text-[#8B5CF6]';

  const isAdmin  = community.admin === currentUser;
  const isMember = community.members.includes(currentUser);

  const handleJoin = () => {
    if (!isMember) {
      setCommunity({ ...community, members: [...community.members, currentUser] });
    }
  };

  const handleLeave = () => {
    if (isMember) {
      setCommunity({ ...community, members: community.members.filter(m => m !== currentUser) });
    }
  };

  const removeMember = (m) => {
    setCommunity({ ...community, members: community.members.filter(x => x !== m) });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${pageClass}`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-32 left-1/3 w-80 h-80 rounded-full blur-[80px] ${isDark?'bg-[#8B5CF6]/08':'bg-[#8B5CF6]/05'}`}/>
        <div className={`absolute bottom-0 right-1/4 w-72 h-72 rounded-full blur-[80px] ${isDark?'bg-[#EC4899]/06':'bg-[#EC4899]/04'}`}/>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl border-b ${isDark?'bg-[#0F0A20]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF] shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
                <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
                <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
                <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
              </svg>
              <span style={{fontFamily:"'Playfair Display',serif"}} className={`font-black text-lg italic ${isDark?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
            </Link>
            <Link to="/groups" className={`text-sm font-medium opacity-60 hover:opacity-100 nav-link ${accentText}`}>All Communities</Link>
          </div>
        </div>
      </nav>

      <main className="relative max-w-6xl mx-auto pt-28 pb-20 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end mb-16">
          <div className="lg:col-span-2 space-y-5">
            <span className={`inline-block text-xs uppercase tracking-[.2em] font-black px-4 py-1.5 rounded-full ${isDark?'bg-[#8B5CF6]/20 text-[#A78BFA]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>
              {community.category}
            </span>
            <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-5xl md:text-7xl font-black tracking-tight leading-tight">{community.name}</h1>
            <p className={`text-xl leading-relaxed max-w-2xl font-medium ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>{community.description}</p>
            <div className="flex items-center gap-4 pt-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white"
                style={{background:'linear-gradient(135deg,#6D28D9,#EC4899)'}}>
                {community.admin[0]}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-black opacity-40">Founded by</p>
                <p className="font-bold">{community.admin} {isAdmin && "(You)"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {!isMember ? (
              <button onClick={handleJoin} className="w-full py-5 rounded-2xl font-black text-lg text-white shadow-2xl transition-all hover:-translate-y-1 active:scale-95 btn-magic">
                Join this Hub ✦
              </button>
            ) : (
              <button onClick={handleLeave}
                className={`w-full py-5 rounded-2xl font-black text-center border-2 border-dashed transition-all group hover:border-red-400 hover:text-red-400 hover:bg-red-500/5 ${isDark?'border-[#A78BFA]/40 text-[#A78BFA]':'border-[#8B5CF6]/40 text-[#6D28D9]'}`}>
                <span className="group-hover:hidden">✓ Joined</span>
                <span className="hidden group-hover:inline">Leave Community</span>
              </button>
            )}
            <button onClick={() => navigate(`/comments/groups/${community.id}`, { state:{ type:"community", data:community } })}
              className={`w-full py-5 rounded-2xl border-2 font-black text-lg transition-all hover:shadow-xl active:scale-95 hover:-translate-y-0.5 ${isDark?'border-[#A78BFA] text-[#A78BFA] hover:bg-[#A78BFA] hover:text-white':'border-[#6D28D9] text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white'}`}>
              Discussion Board ✦
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className={`lg:col-span-2 rounded-[2.5rem] p-10 border transition-all ${panelClass}`}
            style={{boxShadow:isDark?'0 0 40px rgba(109,40,217,.08)':'0 8px 40px rgba(109,40,217,.08)'}}>
            <div className="flex justify-between items-center mb-10">
              <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black">Members List</h2>
              <span className={`text-sm font-bold uppercase tracking-widest opacity-50 ${accentText}`}>{community.members.length} total</span>
            </div>
            <div className={`divide-y ${isDark?'divide-[#2A1F55]':'divide-[#F3EEF9]'}`}>
              {community.members.map((member, i) => (
                <div key={i} className="flex justify-between items-center py-5 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-transform group-hover:scale-110 ${isDark?'bg-[#2A1F55] text-[#A78BFA]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>
                      {member[0]}
                    </div>
                    <div>
                      <span className="font-bold text-lg">{member}</span>
                      {member === community.admin && (
                        <span className="ml-3 text-[10px] px-2 py-0.5 rounded-md bg-[#FDE68A] text-[#78350F] font-black uppercase tracking-tight">Host</span>
                      )}
                    </div>
                  </div>
                  {isAdmin && member !== community.admin && (
                    <button onClick={() => removeMember(member)} className="text-xs font-black uppercase tracking-widest text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:underline">Remove</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className={`p-8 rounded-[2.5rem] border ${panelClass}`}>
              <h3 className={`text-xs font-black uppercase tracking-widest mb-6 ${accentText}`}>✦ Hub Rules</h3>
              <ul className="space-y-4 text-sm font-medium">
                {['Be respectful to all members.', 'No spoilers without tags.', 'Stay on topic (Mostly).'].map((r, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className={`font-black text-xs ${accentText}`}>0{i+1}.</span>
                    <span className={isDark ? 'text-[#C4B5FD]' : 'text-[#6D28D9]'}>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`p-8 rounded-[2.5rem] border text-center transition-all hover:scale-[1.02] ${isDark?'bg-gradient-to-br from-[#1E1540] to-[#2A1F55]/50 border-[#2A1F55]':'bg-gradient-to-br from-[#F3EEF9] to-white border-[#E9DEFF]'}`}>
              <div className="text-3xl mb-3" style={{animation:'float-gentle 3s ease-in-out infinite'}}>✦</div>
              <h4 className="font-black mb-2">Want to lead?</h4>
              <p className={`text-xs leading-relaxed ${accentText}`}>Contact system admins to request additional moderator permissions.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityDetail;
