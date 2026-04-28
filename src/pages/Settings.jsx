import { Link, useNavigate } from "react-router-dom";

const Settings = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const pageClass = darkMode ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';
  const sectionCard = darkMode ? 'bg-[#1E1540] border-[#2A1F55]' : 'bg-white border-[#E9DEFF] shadow-sm';
  const accentText = darkMode ? 'text-[#A78BFA]' : 'text-[#8B5CF6]';
  const sectionLabel = `text-[10px] uppercase tracking-widest font-bold ${accentText}`;
  const msgAreaClass = `w-full p-4 rounded-2xl border outline-none text-sm resize-none focus:ring-2 transition-all ${darkMode?'bg-[#0F0A20] border-[#2A1F55] text-white focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 placeholder-[#4C1D95]':'bg-[#F3EEF9] border-[#E9DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/10'}`;

  const faqItems = [
    { q: "How do I borrow a book?", a: "Browse the collection, find your book, and click 'Borrow Now'." },
    { q: "How many books can I borrow?", a: "Up to 5 books at a time. Return one to borrow another." },
    { q: "How do I join a community?", a: "Go to Groups and click on any community to join it instantly." },
  ];

  return (
    <div className={`min-h-screen pb-12 ${pageClass}`}>
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${darkMode?'bg-[#0F0A20]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF] shadow-sm'}`}>
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-lg italic ${darkMode?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
          <button onClick={() => navigate(-1)} className={`text-sm font-medium transition-all hover:opacity-70 nav-link ${accentText}`}>← Back</button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto pt-24 px-6 space-y-4">
        <div className="mb-8">
          <p className={`${sectionLabel} mb-2`}>✦ Preferences</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif" }} className="text-4xl font-black">Settings</h1>
        </div>

        <div className={`p-6 rounded-2xl border ${sectionCard}`}>
          <p className={`${sectionLabel} mb-4`}>✦ Appearance</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Dark Mode</p>
              <p className={`text-xs mt-0.5 ${accentText}`}>Toggle between light and dark themes</p>
            </div>
            {setDarkMode ? (
              <button onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${darkMode?'bg-gradient-to-r from-[#6D28D9] to-[#EC4899]':'bg-[#E9DEFF]'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${darkMode?'left-7':'left-1'}`}/>
              </button>
            ) : (
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${darkMode?'bg-[#8B5CF6]/20 text-[#A78BFA]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>{darkMode ? 'Dark' : 'Light'}</span>
            )}
          </div>
        </div>

        <div className={`p-6 rounded-2xl border ${sectionCard}`}>
          <p className={`${sectionLabel} mb-4`}>✦ FAQ</p>
          {faqItems.map(({ q, a }) => (
            <details key={q} className={`mb-2 p-4 rounded-xl cursor-pointer group transition-all ${darkMode?'bg-[#0F0A20] hover:bg-[#150E2B]':'bg-[#F3EEF9] hover:bg-[#EDE5FF]'}`}>
              <summary className="font-semibold text-sm list-none flex items-center justify-between">
                <span>{q}</span>
                <span className={`text-xs ${accentText} group-open:rotate-180 transition-transform`}>▼</span>
              </summary>
              <p className={`text-sm mt-2 ${accentText}`}>{a}</p>
            </details>
          ))}
        </div>

        <div className={`p-6 rounded-2xl border ${sectionCard}`}>
          <p className={`${sectionLabel} mb-4`}>✦ Contact Support</p>
          <textarea rows="4" placeholder="Your message..." className={msgAreaClass}/>
          <button className="mt-3 px-6 py-3 rounded-xl font-bold text-sm text-white btn-magic transition-all hover:-translate-y-0.5 active:scale-95">
            Send Message ✦
          </button>
        </div>

        <div className={`p-6 rounded-2xl border ${sectionCard}`}>
          <p className={`${sectionLabel} mb-3`}>✦ About BiblioTech</p>
          <p className={`text-sm leading-relaxed ${accentText}`}>A magical digital library platform. Discover, read, and connect with a community of book lovers. Version 2.0.0</p>
        </div>
      </main>
    </div>
  );
};
export default Settings;
