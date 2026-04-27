import { Link } from 'react-router-dom';

const Footer = ({ darkMode }) => {
  const dm=darkMode;
  return (
    <footer className={`w-full border-t ${dm?'bg-[#0F0A20] border-[#2A1F55]':'bg-[#F3EEF9] border-[#E9DEFF]'}`}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 mb-4 group">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
                <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
                <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
              </svg>
              <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-xl italic ${dm?'text-[#F3EEF8]':'text-[#4C1D95]'}`}>BiblioTech</span>
            </Link>
            <p className={`text-sm leading-relaxed ${dm?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>A magical digital library experience. Discover, read, and connect.</p>
          </div>
          <div>
            <p className={`text-[10px] uppercase tracking-[.2em] font-bold mb-4 ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Explore</p>
            {[{l:'Browse Books',to:'/search'},{l:'Communities',to:'/groups'},{l:'Advanced Search',to:'/advanced'},{l:'Settings',to:'/settings'}].map(l=>(
              <Link key={l.l} to={l.to} className={`block text-sm mb-2 transition-all hover:translate-x-1 ${dm?'text-[#C4B5FD] hover:text-white':'text-[#6D28D9] hover:text-[#4C1D95]'}`}>{l.l}</Link>
            ))}
          </div>
          <div>
            <p className={`text-[10px] uppercase tracking-[.2em] font-bold mb-4 ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Contact</p>
            <div className={`flex items-center gap-2 text-sm ${dm?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>
              <svg width="14" height="14" viewBox="0 0 28 28" fill="none"><rect x="2" y="5" width="24" height="18" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><path d="M 2 8 L 14 16 L 26 8" stroke="#EC4899" strokeWidth="1.4" fill="none"/></svg>
              LibCore.lebanon@gmail.com
            </div>
          </div>
        </div>
        <div className={`pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs ${dm?'border-[#2A1F55] text-[#A78BFA]':'border-[#E9DEFF] text-[#8B5CF6]'}`}>
          <p>© 2026 BiblioTech ✦ All rights reserved</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-[#EC4899] transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-[#EC4899] transition-colors">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
