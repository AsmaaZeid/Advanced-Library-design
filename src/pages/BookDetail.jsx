import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import defaultimage from "../assets/default-book-cover.jpg";
import CustomAlert from "./CustomAlert";

const BookSplash = ({ darkMode, title, author, onDone }) => {
  const [phase, setPhase] = useState("closed");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("opening"), 350);
    const t2 = setTimeout(() => setPhase("open"), 1500);
    const t3 = setTimeout(() => setPhase("leaving"), 2200);
    const t4 = setTimeout(() => { setVisible(false); onDone(); }, 2750);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [onDone]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{opacity:1}} animate={{opacity:phase==="leaving"?0:1}} transition={{duration:.35}}
          className="fixed inset-0 z-[9999] overflow-hidden flex"
          style={{background: darkMode?'radial-gradient(ellipse at 40% 40%,#1E1540 0%,#0F0A20 70%)':'radial-gradient(ellipse at 40% 40%,#F3EEF9 0%,#FAF7FF 70%)'}}>
          <div className="w-1/2 h-full" style={{background:`linear-gradient(90deg,#f5eeff 0%,#ede5ff 100%)`,opacity:phase==="closed"?0:1,transition:"opacity .3s ease .25s"}}/>
          <div className="w-1/2 h-full relative">
            <div className="absolute left-0 top-0 h-full w-[6px]" style={{background:darkMode?'#0F0A20':'#2A1F55',boxShadow:"inset -2px 0 6px rgba(0,0,0,.4)",zIndex:5}}/>
            <div className="absolute inset-0" style={{transform:`rotateY(${phase==="closed"?0:-180}deg)`,transformOrigin:"left center",transformStyle:"preserve-3d",transition:"transform .85s cubic-bezier(.4,0,.2,1)"}}>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-12" style={{backfaceVisibility:"hidden",background:`linear-gradient(145deg,#2A1F55,#150E2B)`,borderLeft:"2px solid #A78BFA",boxShadow:"-12px 0 30px rgba(0,0,0,.5)"}}>
                <div className="text-2xl font-bold text-center text-white" style={{fontFamily:"'Playfair Display',serif"}}>{title}</div>
                <div className="text-sm uppercase tracking-[4px] text-[#C4B5FD]">by {author}</div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-12" style={{transform:"rotateY(180deg)",backfaceVisibility:"hidden",background:"linear-gradient(160deg,#f5eeff,#ede5ff)"}}>
                <p className="text-center italic text-[#4C1D95] max-w-md text-lg leading-relaxed">"Between every life and another, there is always a story waiting."</p>
              </div>
            </div>
            <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:phase==="opening"||phase==="open"||phase==="leaving"?1:0,scale:1}} transition={{duration:.8}}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className={`text-xl font-bold ${darkMode?'text-white':'text-[#2E1065]'}`}>{title}</p>
              <p className={`text-xs uppercase tracking-[3px] opacity-70 mt-1 ${darkMode?'text-[#C4B5FD]':'text-[#8B5CF6]'}`}>by {author}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StatCard = ({ label, value, icon, color, darkMode }) => (
  <div className={`p-4 rounded-2xl border transition-all ${darkMode?'bg-[#1E1540] border-[#2A1F55]':'bg-[#F3EEF9] border-[#E9DEFF]'}`}>
    <div className="flex items-center gap-2 mb-1">
      <span className="text-base">{icon}</span>
      <p className={`text-[10px] uppercase tracking-widest font-black opacity-50 ${darkMode?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>{label}</p>
    </div>
    <p className={`font-bold text-sm truncate ${color || (darkMode?'text-white':'text-[#2E1065]')}`}>{value}</p>
  </div>
);

const ShelfBtn = ({ icon, text, darkMode }) => (
  <button className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all hover:scale-105 active:scale-95 ${
    darkMode ? 'border-[#2A1F55] bg-[#1E1540] text-[#C4B5FD] hover:border-[#A78BFA]' : 'border-[#E9DEFF] bg-white text-[#6D28D9] hover:bg-[#F3EEF9]'
  }`}>
    <span>{icon}</span><span>{text}</span>
  </button>
);

const BookDetail = ({ darkMode }) => {
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();
  const book = location.state?.book;
  const isRandom = location.state?.isRandom || false;

  const [showSplash, setShowSplash] = useState(true);
  const [showDiceAnimation, setShowDiceAnimation] = useState(isRandom);
  const [showRateModal, setShowRateModal] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const navigate = useNavigate();
  const isDark = darkMode;
  const pageStyle = isDark ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';
  const cardStyle = isDark ? 'bg-[#1E1540] border-[#2A1F55]' : 'bg-white border-[#E9DEFF] shadow-lg';

  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, []);
  useEffect(() => {
    if (isRandom) {
      const t = setTimeout(() => setShowDiceAnimation(false), 1400);
      return () => clearTimeout(t);
    }
  }, [isRandom]);

  const data = book || {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    rating: 4.82,
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    copiesleft: 5,
    publisher: "Penguin Books",
    placeOfPublish: "London, UK",
    language: "English",
    ISBN: "978-0525559474",
    genre: "Fantasy",
    type: "Hardcover",
    pages: 304,
    publicationDate: "August 13, 2020",
  };

  const moreBooks = [
    { id:101, title:"How to Stop Time", year:2017 },
    { id:102, title:"The Humans", year:2013 },
    { id:103, title:"Notes on a Nervous Planet", year:2018 },
    { id:104, title:"The Comfort Book", year:2021 },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-500 ${pageStyle}`}>
      {showSplash && <BookSplash darkMode={isDark} title={data.title} author={data.author} onDone={() => setShowSplash(false)}/>}

      <nav className={`fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl border-b transition-all ${isDark?'bg-[#0F0A20]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF] shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
                <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
                <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
                <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
              </svg>
              <span style={{fontFamily:"'Playfair Display',serif"}} className={`hidden sm:block font-black text-lg italic ${isDark?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
            </Link>
            <span className={`hidden md:block px-3 py-1 rounded-full text-xs font-bold ${isDark?'bg-[#8B5CF6]/20 text-[#A78BFA]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>{data.genre}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to={`/comments/book/${data.id}`} state={{type:"book",data}}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all hover:-translate-y-0.5 ${isDark?'border-[#2A1F55] text-[#C4B5FD] hover:bg-[#1E1540]':'border-[#E9DEFF] text-[#6D28D9] hover:bg-[#F3EEF9]'}`}>
              💬 Discussion
            </Link>
            <button onClick={() => navigate(-1)} className={`text-sm font-medium transition-all hover:opacity-70 nav-link ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>← Back</button>
          </div>
        </div>
      </nav>

      <div className={`fixed top-0 left-0 w-full h-[500px] opacity-[0.07] pointer-events-none blur-[100px] ${isDark?'bg-[#8B5CF6]':'bg-[#6D28D9]'}`}/>

      <AnimatePresence>
        {showDiceAnimation && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div initial={{scale:.7,rotate:0}} animate={{scale:[.7,1.15,1],rotate:[0,180,360,540]}} exit={{scale:.8,opacity:0}} transition={{duration:1.1,ease:"easeInOut"}}
              className={`w-24 h-24 rounded-3xl shadow-2xl flex items-center justify-center text-4xl font-bold border-4 ${isDark?'bg-[#1E1540] border-[#A78BFA] text-white':'bg-white border-[#6D28D9] text-[#2E1065]'}`}>
              ✧
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.main initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.5}}
        className="relative pt-28 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-20">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-8">
            <div className={`group rounded-[2rem] overflow-hidden shadow-2xl border-8 transition-all hover:rotate-1 ${isDark?'border-[#1E1540]':'border-white'}`}
              style={{boxShadow:isDark?'0 20px 60px rgba(109,40,217,.25)':'0 20px 60px rgba(109,40,217,.12)'}}>
              <img src={data.coverUrl || defaultimage} alt={data.title} className="w-full h-auto object-cover"/>
            </div>
            <div className="flex flex-col gap-4">
              <button onClick={() => setShowAlert(true)}
                className="py-4 rounded-2xl font-black text-lg text-white shadow-xl transition-all active:scale-95 hover:-translate-y-0.5 btn-magic">
                ✦ Borrow Now
              </button>
              <button className="py-4 rounded-2xl font-black text-lg text-white shadow-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 transition-all active:scale-95 hover:-translate-y-0.5">
                ✧ Buy Now
              </button>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <ShelfBtn icon="✓"  text="Read"         darkMode={isDark}/>
                <ShelfBtn icon="📖" text="Reading"      darkMode={isDark}/>
                <ShelfBtn icon="🔖" text="Want to Read" darkMode={isDark}/>
                <ShelfBtn icon="♥"  text="Favorite"     darkMode={isDark}/>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-10">
            <section>
              <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-tight">{data.title}</h1>
              <div className="flex items-center gap-6">
                <p className="text-2xl opacity-80">by <span className="font-bold underline decoration-[#EC4899] underline-offset-4">{data.author}</span></p>
                <div className={`px-4 py-1.5 rounded-xl flex items-center font-black ${isDark?'bg-yellow-500/10 text-yellow-400':'bg-yellow-50 text-yellow-600'}`}>
                  <span className="mr-1">★</span>{Number(data.rating).toFixed(1)}
                </div>
              </div>
            </section>

            <div className={`p-8 rounded-[2rem] border transition-all ${cardStyle}`}>
              <p className={`text-xs uppercase tracking-widest font-black mb-4 ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>✦ Synopsis</p>
              <p className="text-lg leading-relaxed opacity-90">{data.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <StatCard label="Publisher"  value={data.publisher}       icon="🏢" darkMode={isDark}/>
              <StatCard label="Date"       value={data.publicationDate} icon="📅" darkMode={isDark}/>
              <StatCard label="Location"   value={data.placeOfPublish}  icon="📍" darkMode={isDark}/>
              <StatCard label="ISBN"       value={data.ISBN}            icon="🔢" darkMode={isDark}/>
              <StatCard label="Language"   value={data.language}        icon="🌐" darkMode={isDark}/>
              <StatCard label="Type"       value={data.type}            icon="📚" darkMode={isDark}/>
              <StatCard label="Pages"      value={data.pages}           icon="📄" darkMode={isDark}/>
              <StatCard label="Stock"      value={`${data.copiesleft} Left`} icon="📦" darkMode={isDark}
                color={data.copiesleft > 0 ? "text-emerald-500" : "text-red-400"}/>
            </div>

            <div className={`p-8 rounded-[2rem] border-2 border-dashed flex flex-col md:flex-row items-center justify-between gap-6 ${isDark?'border-[#A78BFA]/25 bg-[#8B5CF6]/5':'border-[#C4B5FD]/50 bg-[#F3EEF9]'}`}>
              <div>
                <h3 className="text-2xl font-black mb-1">Your Review</h3>
                <p className={`opacity-60 text-sm ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Help others discover this book</p>
              </div>
              <div className="flex flex-col items-center gap-3">
                <button onClick={() => setShowRateModal(true)}
                  className="px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 hover:-translate-y-0.5 btn-magic">
                  {userRating > 0 ? "Update Rating" : "Rate Book ★"}
                </button>
                {userRating > 0 && (
                  <div className="flex text-yellow-400 text-2xl">
                    {[...Array(5)].map((_,i) => <span key={i}>{i < userRating ? "★" : "☆"}</span>)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className={`pt-10 border-t ${isDark?'border-[#2A1F55]':'border-[#E9DEFF]'}`}>
          <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black mb-8">More Work by {data.author}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {moreBooks.map(b => (
              <div key={b.id} className={`p-6 rounded-3xl border transition-all hover:-translate-y-2 cursor-pointer ${cardStyle}`}>
                <div className={`aspect-[3/4] rounded-xl mb-4 flex items-center justify-center ${isDark?'bg-[#2A1F55]':'bg-[#F3EEF9]'}`}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/></svg>
                </div>
                <h3 className="font-bold truncate text-sm">{b.title}</h3>
                <p className={`text-xs mt-1 ${isDark?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>{b.year}</p>
              </div>
            ))}
          </div>
        </section>
      </motion.main>

      {showRateModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className={`w-full max-w-sm p-10 rounded-[2.5rem] text-center border animate-zoom-in ${isDark?'bg-[#1E1540] border-[#2A1F55]':'bg-white border-[#E9DEFF]'}`}
            style={{boxShadow:isDark?'0 0 60px rgba(109,40,217,.3)':'0 20px 60px rgba(109,40,217,.12)'}}>
            <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-2xl font-black mb-6">Rate this Book ★</h2>
            <div className="flex justify-center gap-2 mb-8">
              {[1,2,3,4,5].map(star => (
                <button key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => { setUserRating(star); setShowRateModal(false); }}
                  className="text-4xl transition-transform hover:scale-125">
                  <span className={(hoverRating || userRating) >= star ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowRateModal(false)} className={`text-sm font-bold opacity-50 ${isDark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Cancel</button>
          </div>
        </div>
      )}
      <CustomAlert show={showAlert} onClose={() => setShowAlert(false)} title="Book Borrowed!" message="You have successfully borrowed this book. Enjoy reading ✨" type="success"/>
    </div>
  );
};

export default BookDetail;
