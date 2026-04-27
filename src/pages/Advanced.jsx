import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSearch, FaUndo, FaLightbulb, FaArrowLeft } from "react-icons/fa";

const Advanced = ({ darkMode }) => {
  const navigate = useNavigate();
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    placeOfPublishing: '',
    minPages: '',
    maxPages: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const wrapClass = darkMode ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';
  const formCard = darkMode ? 'bg-[#1E1540] border-[#2A1F55]' : 'bg-white border-[#E9DEFF] shadow-xl';
  const helperText = darkMode ? 'text-[#A78BFA]' : 'text-[#8B5CF6]';

  const fieldStyle = `w-full px-4 py-3 rounded-xl border transition-all outline-none focus:ring-2 ${darkMode?'bg-[#0F0A20] border-[#2A1F55] text-white focus:ring-[#8B5CF6]/30 focus:border-[#8B5CF6] placeholder-[#4C1D95]':'bg-[#F3EEF9] border-[#E9DEFF] text-[#2E1065] focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6]'}`;
  const fieldLabel = `block text-xs font-black uppercase tracking-widest mb-2 ${helperText}`;

  const handleInputChange = (e) => {
    const field = e.target.name;
    setSearchCriteria(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    if (searchCriteria.minPages && searchCriteria.maxPages) {
      if (parseInt(searchCriteria.minPages) > parseInt(searchCriteria.maxPages)) {
        setError("Minimum pages cannot be greater than maximum pages.");
        return;
      }
    }

    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(searchCriteria).forEach(([k, v]) => {
      if (v.trim() !== '') params.append(k, v.trim());
    });
    setTimeout(() => {
      setLoading(false);
      navigate(`/search?${params.toString()}`);
    }, 800);
  };

  const handleReset = () => {
    setSearchCriteria({ title:'', author:'', genre:'', isbn:'', placeOfPublishing:'', minPages:'', maxPages:'' });
    setError('');
  };

  const isFormEmpty = Object.values(searchCriteria).every(v => String(v).trim() === '');

  return (
    <div className={`min-h-screen transition-colors duration-500 pb-12 ${wrapClass}`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-[90px] ${darkMode?'bg-[#8B5CF6]/08':'bg-[#8B5CF6]/05'}`}/>
        <div className={`absolute -bottom-40 right-1/4 w-80 h-80 rounded-full blur-[80px] ${darkMode?'bg-[#EC4899]/06':'bg-[#EC4899]/04'}`}/>
      </div>

      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${darkMode?'bg-[#0F0A20]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF] shadow-sm'}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
              <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{fontFamily:"'Playfair Display',serif"}} className={`font-black text-lg italic ${darkMode?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
          <span className={`text-sm font-bold ${helperText}`}>✦ Advanced Search</span>
        </div>
      </nav>

      <div className="relative max-w-4xl mx-auto pt-28 px-6">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Link to="/" className={`flex items-center gap-2 text-sm font-bold opacity-60 hover:opacity-100 mb-4 transition-opacity nav-link ${helperText}`}>
              <FaArrowLeft/> Back to Home
            </Link>
            <p className={`text-xs uppercase tracking-[.3em] font-bold mb-2 ${helperText}`}>✦ Fine-tune your search</p>
            <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-5xl font-black tracking-tighter mb-2">Advanced Search</h1>
            <p className={`text-lg opacity-60 font-medium ${helperText}`}>Refine your hunt for the perfect read.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className={`p-8 md:p-12 rounded-[2.5rem] border shadow-2xl transition-all ${formCard}`}
          style={{boxShadow:darkMode?'0 0 60px rgba(109,40,217,.12)':'0 20px 60px rgba(109,40,217,.08)'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label className={fieldLabel}>Book Title</label>
              <input type="text" name="title" className={fieldStyle} placeholder="e.g. The Shadow of the Wind"
                value={searchCriteria.title} onChange={handleInputChange}/>
            </div>
            <div>
              <label className={fieldLabel}>Author</label>
              <input type="text" name="author" className={fieldStyle} placeholder="e.g. Carlos Ruiz Zafón"
                value={searchCriteria.author} onChange={handleInputChange}/>
            </div>
            <div>
              <label className={fieldLabel}>Genre</label>
              <select name="genre" className={`${fieldStyle} cursor-pointer`} value={searchCriteria.genre} onChange={handleInputChange}>
                <option value="">All Genres</option>
                {['Fiction','Science Fiction','Fantasy','Mystery','History','Business','Romance','Biography'].map(g=>(
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={fieldLabel}>ISBN</label>
              <input type="text" name="isbn" className={fieldStyle} placeholder="10 or 13 digit code"
                value={searchCriteria.isbn} onChange={handleInputChange}/>
            </div>
            <div>
              <label className={fieldLabel}>Place of Publishing</label>
              <input type="text" name="placeOfPublishing" className={fieldStyle} placeholder="City or Country"
                value={searchCriteria.placeOfPublishing} onChange={handleInputChange}/>
            </div>
            <div className="md:col-span-2">
              <label className={fieldLabel}>Page Count Range</label>
              <div className="flex items-center gap-4">
                <input type="number" name="minPages" className={fieldStyle} placeholder="Min"
                  value={searchCriteria.minPages} onChange={handleInputChange}/>
                <span className={`font-bold opacity-40 ${helperText}`}>TO</span>
                <input type="number" name="maxPages" className={fieldStyle} placeholder="Max"
                  value={searchCriteria.maxPages} onChange={handleInputChange}/>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center gap-2">
              ✦ {error}
            </div>
          )}

          <div className="mt-12 flex flex-col md:flex-row gap-4">
            <button type="button" onClick={handleReset} disabled={isFormEmpty}
              className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all border-2 ${
                isFormEmpty ? 'opacity-20 cursor-not-allowed border-transparent' :
                darkMode ? 'border-[#2A1F55] text-[#C4B5FD] hover:bg-[#1E1540]' : 'border-[#E9DEFF] text-[#6D28D9] hover:bg-[#F3EEF9]'
              }`}>
              <FaUndo className="text-xs"/> Reset
            </button>
            <button type="submit" disabled={loading || isFormEmpty}
              className={`flex-[2] py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl hover:-translate-y-0.5 active:scale-95 ${
                loading || isFormEmpty ? 'bg-gray-400 cursor-not-allowed text-white opacity-50' : 'btn-magic text-white'
              }`}>
              {loading ? 'Processing...' : <><FaSearch className="text-xs"/> Search Books ✦</>}
            </button>
          </div>
        </form>

        <div className={`mt-10 p-8 rounded-[2rem] border transition-all ${darkMode?'bg-[#1E1540]/40 border-[#2A1F55]':'bg-[#F3EEF9]/60 border-[#E9DEFF]'}`}>
          <h3 className={`flex items-center gap-2 font-black uppercase tracking-wider text-sm mb-4 ${helperText}`}>
            <FaLightbulb className="text-yellow-400"/> Search Tips
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm font-medium">
            {['Combine multiple filters for pinpoint accuracy.','Partial titles like "Hobbit" will find "The Hobbit".','Leave fields blank to exclude them from filters.','ISBN works best with exact 10 or 13 digits.'].map((tip,i)=>(
              <li key={i} className={`flex items-start gap-2 opacity-70 ${darkMode?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>
                <span className={helperText}>✦</span>{tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Advanced;
