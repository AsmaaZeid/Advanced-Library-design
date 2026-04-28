import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { OwlyCharacter, WormyCharacter } from "../components/Characters";

const categorySymbols = {
  Fantasy: '✦', Academic: '◆', Mystery: '✧', Romance: '♥',
  'Science Fiction': '★', Children: '✿', default: '✦'
};

const categoryGradients = {
  Fantasy: 'from-[#6D28D9] to-[#8B5CF6]',
  Academic: 'from-[#1D4ED8] to-[#3B82F6]',
  Mystery: 'from-[#374151] to-[#6B7280]',
  Romance: 'from-[#BE185D] to-[#EC4899]',
  'Science Fiction': 'from-[#0E7490] to-[#06B6D4]',
  Children: 'from-[#D97706] to-[#F59E0B]',
  default: 'from-[#6D28D9] to-[#EC4899]'
};

const DisplayComm = ({ darkMode }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newComm, setNewComm] = useState({ name: "", description: "", category: "" });
  const [error, setError] = useState("");
  const currentUser = "Ali";

  const [communities, setCommunities] = useState([
    { id:1, name:"Fantasy Lovers", description:"A place to discuss magical worlds and epic adventures.", category:"Fantasy", admin:"Sarah", members:["Sarah","John","Emma"] },
    { id:2, name:"Academic Researchers", description:"Share research papers and academic resources.", category:"Academic", admin:"Michael", members:["Michael","David"] },
    { id:3, name:"Mystery Club", description:"Whodunit? Let's find out together.", category:"Mystery", admin:"Lara", members:["Lara","Tom","Nadia","James"] },
    { id:4, name:"Sci-Fi Universe", description:"Exploring galaxies, futures, and alternate worlds.", category:"Science Fiction", admin:"Alex", members:["Alex","Yara"] },
    { id:5, name:"Romance Readers", description:"From slow burns to whirlwind romances — we love them all.", category:"Romance", admin:"Mia", members:["Mia","Sara"] },
    { id:6, name:"Children's Corner", description:"Picture books, bedtime stories, and young adult picks.", category:"Children", admin:"Raya", members:["Raya","Ali","Nour"] },
  ]);

  const isDark = darkMode;
  const pageStyle = isDark ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';
  const panelStyle = isDark ? 'bg-[#1E1540] border-[#2A1F55]' : 'bg-white border-[#E9DEFF]';
  const dimText = isDark ? 'text-[#A78BFA]' : 'text-[#8B5CF6]';
  const fieldCls = `w-full px-4 py-3 rounded-xl border outline-none text-sm focus:ring-2 transition-all ${isDark?'bg-[#0F0A20] border-[#2A1F55] text-white focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 placeholder-[#4C1D95]':'bg-[#F3EEF9] border-[#E9DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/10 placeholder-[#A78BFA]'}`;

  const filtered = communities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    setError("");

    const exists = communities.some(c => c.name.toLowerCase() === newComm.name.toLowerCase());
    if (exists) {
      setError("A community with this name already exists!");
      return;
    }

    const created = { id: communities.length + 1, ...newComm, admin: currentUser, members: [currentUser] };
    setCommunities([created, ...communities]);
    setShowModal(false);
    setNewComm({ name: "", description: "", category: "" });
    navigate(`/groups/${created.id}`, { state: created });
  };

  return (
    <div className={`min-h-screen pb-16 ${pageStyle} relative overflow-x-hidden`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-80 h-80 rounded-full blur-[80px] bg-[#8B5CF6]/08"/>
        <div className="absolute top-1/2 -right-20 w-72 h-72 rounded-full blur-[80px] bg-[#EC4899]/06"/>
      </div>

      <nav className={`sticky top-0 z-50 border-b backdrop-blur-xl ${isDark?'bg-[#0F0A20]/92 border-[#2A1F55]':'bg-[#FAF7FF]/92 border-[#E9DEFF]'}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-3">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
              <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-xl italic ${isDark?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>

          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3 top-2.5 text-[#A78BFA]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search communities..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl border text-sm outline-none focus:ring-2 transition-all ${isDark?'bg-[#1E1540] border-[#2A1F55] text-white placeholder-[#6D28D9] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20':'bg-white border-[#E9DEFF] placeholder-[#A78BFA] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/10'}`}/>
          </div>

          <button onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 btn-magic flex-shrink-0">
            + New Community
          </button>
          <button onClick={() => navigate(-1)} className={`text-sm font-medium flex-shrink-0 transition-all hover:opacity-70 nav-link ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>← Back</button>
        </div>
      </nav>

      <main className="relative max-w-6xl mx-auto px-6 pt-12">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className={`text-xs uppercase tracking-[.3em] font-bold mb-2 ${dimText}`}>✦ Connect with readers</p>
            <h1 style={{ fontFamily:"'Playfair Display',serif" }} className="text-4xl font-black mb-1">Reader Communities</h1>
            <p className={`text-sm ${dimText}`}>{filtered.length} communities waiting for you</p>
          </div>
          <div className="hidden md:flex items-end gap-4">
            <div style={{ animation:'float 4.5s ease-in-out infinite' }}><OwlyCharacter size={68}/></div>
            <div style={{ animation:'float 4.5s 1.5s ease-in-out infinite' }}><WormyCharacter size={80}/></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(comm => {
            const sym = categorySymbols[comm.category] || categorySymbols.default;
            const grad = categoryGradients[comm.category] || categoryGradients.default;
            const isMember = comm.members.includes(currentUser);

            return (
              <div key={comm.id}
                className={`group p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-2 cursor-pointer ${isDark ? `${panelStyle} hover:border-[#A78BFA]` : `${panelStyle} hover:border-[#8B5CF6] shadow-sm hover:shadow-xl`}`}
                onClick={() => navigate(`/groups/${comm.id}`, { state: comm })}>

                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black text-white bg-gradient-to-br ${grad}`}>
                    {sym}
                  </div>
                  {isMember && (
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${isDark?'bg-[#8B5CF6]/20 text-[#A78BFA]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>✓ Joined</span>
                  )}
                </div>

                <h3 style={{ fontFamily:"'Playfair Display',serif" }} className="font-bold text-xl mb-2 leading-tight">{comm.name}</h3>
                <p className={`text-sm leading-relaxed mb-5 ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>{comm.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {comm.members.slice(0,3).map((m,i)=>(
                        <div key={i} className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 bg-gradient-to-br ${grad} ${isDark?'border-[#1E1540]':'border-white'}`}>{m[0]}</div>
                      ))}
                    </div>
                    <span className={`text-xs font-medium ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>{comm.members.length} members</span>
                  </div>
                  <span className={`text-xs font-bold group-hover:translate-x-1 transition-transform ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>Enter ›</span>
                </div>

                <div className="mt-4">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${isDark?'bg-[#2A1F55] text-[#C4B5FD]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>{comm.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div style={{ animation:'float 3s ease-in-out infinite', display:'inline-block', marginBottom:16 }}><OwlyCharacter size={90}/></div>
            <p className="text-xl font-bold mb-2">No communities found</p>
            <p className={`text-sm ${dimText}`}>Try a different search or create one!</p>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl animate-zoom-in ${isDark?'bg-[#1E1540] border-[#2A1F55]':'bg-white border-[#E9DEFF]'}`}
            style={{ boxShadow:isDark?'0 0 60px rgba(109,40,217,.3)':'0 20px 60px rgba(109,40,217,.12)' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-2xl font-bold">Create Community ✦</h2>
              <button onClick={() => setShowModal(false)} className={`w-9 h-9 rounded-xl flex items-center justify-center hover:rotate-90 transition-all ${isDark?'bg-[#2A1F55] text-[#C4B5FD]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>✕</button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              {[
                { label:'Community Name', name:'name', ph:'Fantasy Readers...' },
                { label:'Description', name:'description', ph:'What is this community about?' },
                { label:'Category', name:'category', ph:'Fantasy, Academic, Mystery...' },
              ].map(f => (
                <div key={f.name}>
                  <label className={`block text-[10px] uppercase tracking-widest font-bold mb-1.5 ${dimText}`}>{f.label}</label>
                  <input type="text" placeholder={f.ph} value={newComm[f.name]}
                    onChange={e => setNewComm(p => ({ ...p, [f.name]: e.target.value }))} required className={fieldCls}/>
                </div>
              ))}
              {error && <p className="text-[#EC4899] text-xs font-bold">✦ {error}</p>}
              <button type="submit" className="w-full py-3.5 rounded-2xl font-bold text-white btn-magic transition-all hover:-translate-y-0.5 active:scale-95">
                Create Community ✦
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayComm;
