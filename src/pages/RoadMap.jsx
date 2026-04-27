import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import defaultimage from "../assets/default-book-cover.jpg";

/* ── tiny book card inside roadmap ── */
const RoadmapBook = ({ book, darkMode }) => {
  const navigate = useNavigate();
  const dm = darkMode;
  return (
    <div onClick={()=>navigate(`/book/${book.id}`,{state:{book}})}
      className={`group flex-shrink-0 w-36 cursor-pointer transition-all duration-400 book-card-hover`}>
      <div className={`relative h-52 rounded-2xl overflow-hidden mb-2 shadow-md`}>
        <img src={book.coverUrl||defaultimage} alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e=>e.target.src=defaultimage}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
          <span className="text-[10px] bg-white/90 text-[#4C1D95] font-bold px-2 py-0.5 rounded-full">View</span>
        </div>
      </div>
      <p className={`font-bold text-xs truncate px-1 ${dm?'text-[#F3EEF8]':'text-[#2E1065]'}`}>{book.title}</p>
      <p className={`text-[10px] italic truncate px-1 mt-0.5 ${dm?'text-[#A78BFA]':'text-[#8B5CF6]'}`}>{book.author}</p>
    </div>
  );
};

/* ── single roadmap step ── */
const RoadmapStep = ({ step, index, darkMode, isCompleted, isUnlocked, isLast, onToggle }) => {
  const scrollRef = useRef(null);
  const scroll = dir => scrollRef.current?.scrollBy({left:dir==='left'?-240:240,behavior:'smooth'});
  const dm = darkMode;
  const isEven = index % 2 === 0;

  const levelColors = {
    Beginner: { bg:'from-[#6D28D9] to-[#8B5CF6]', text:'text-[#C4B5FD]', border:'border-[#8B5CF6]/40' },
    Intermediate: { bg:'from-[#BE185D] to-[#EC4899]', text:'text-[#F9A8D4]', border:'border-[#EC4899]/40' },
    Advanced: { bg:'from-[#D97706] to-[#F59E0B]', text:'text-[#FDE68A]', border:'border-[#F59E0B]/40' },
  };
  const lc = levelColors[step.level] || levelColors.Beginner;

  return (
    <div className="relative flex flex-col items-center">
      <div className={`relative w-full flex flex-col md:flex-row transition-all duration-700 ${!isUnlocked?'opacity-35 grayscale':''}`}>

        {/* Step node */}
        <div className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10 w-14 h-14 rounded-2xl flex items-center justify-center border-2 shadow-xl transition-all ${
          isCompleted
            ? 'bg-gradient-to-br from-emerald-500 to-teal-500 border-emerald-300/50 shadow-emerald-500/30'
            : isUnlocked
            ? `bg-gradient-to-br ${lc.bg} border-white/20 shadow-purple-500/30`
            : `${dm?'bg-[#1E1540] border-[#2A1F55]':'bg-[#F3EEF9] border-[#E9DEFF]'}`
        }`}>
          {isCompleted
            ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
            : !isUnlocked
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dm?'#A78BFA':'#8B5CF6'} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            : <span className="text-white font-black text-lg">{index+1}</span>
          }
        </div>

        {/* Card */}
        <div className={`w-full md:w-[46%] pl-24 md:pl-0 p-7 rounded-3xl border transition-all ${
          isCompleted
            ? dm?'bg-emerald-500/8 border-emerald-500/25':'bg-emerald-50 border-emerald-200/60'
            : dm?'bg-[#1E1540] border-[#2A1F55]':'bg-white border-[#E9DEFF] shadow-md'
        } ${isEven?'md:mr-auto':'md:ml-auto'}`}
          style={{ boxShadow: isUnlocked&&!isCompleted ? (dm?'0 0 30px rgba(109,40,217,.1)':'0 8px 30px rgba(109,40,217,.07)'):'none' }}>

          {/* Card header */}
          <div className="flex justify-between items-start mb-5">
            <div>
              <span className={`text-[10px] uppercase font-black tracking-widest ${lc.text}`}>{step.level}</span>
              <h3 style={{ fontFamily:"'Playfair Display',serif" }} className="text-2xl font-black mt-0.5">{step.title}</h3>
              {step.description&&<p className={`text-sm mt-1 ${dm?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>{step.description}</p>}
            </div>
            <button onClick={()=>onToggle(step.id)} disabled={!isUnlocked}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ${
                !isUnlocked?'cursor-not-allowed opacity-40 bg-gray-400/10':
                isCompleted?'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30':
                'btn-magic text-white'
              }`}>
              {isCompleted
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              }
            </button>
          </div>

          {/* Books scroll */}
          <div className="relative group/books">
            {step.books.length>2&&(
              <>
                <button onClick={()=>scroll('left')} className={`absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/books:opacity-100 transition-all btn-magic text-white text-sm`}>‹</button>
                <button onClick={()=>scroll('right')} className={`absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/books:opacity-100 transition-all btn-magic text-white text-sm`}>›</button>
              </>
            )}
            <div ref={scrollRef} className="flex gap-3 overflow-x-auto pb-3 books-scroll">
              {step.books.map(book=><RoadmapBook key={book.id} book={book} darkMode={dm}/>)}
            </div>
          </div>
        </div>
      </div>

      {/* Connector line */}
      {!isLast&&(
        <div className={`w-0.5 h-10 rounded-full my-2 transition-all duration-700 ${
          isCompleted?'bg-gradient-to-b from-emerald-500 to-[#8B5CF6]':dm?'bg-[#2A1F55]':'bg-[#E9DEFF]'
        }`}/>
      )}
    </div>
  );
};

/* ════════════════════ ROADMAP PAGE ════════════════════ */
const RoadMap = ({ darkMode }) => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState([]);
  const dm = darkMode;
  const bg = dm?'bg-[#0F0A20] text-[#F3EEF8]':'bg-[#FAF7FF] text-[#2E1065]';
  const muted = dm?'text-[#A78BFA]':'text-[#8B5CF6]';
  const card = dm?'bg-[#1E1540] border-[#2A1F55]':'bg-white border-[#E9DEFF] shadow-sm';

  const roadmapSteps = [
    { id:1, level:"Beginner", title:"Foundations", description:"Start with the building blocks every developer needs.", books:[
      {id:1,title:"HTML & CSS Basics",author:"Jon Duckett"},{id:2,title:"JavaScript Intro",author:"Marijn Haverbeke"},{id:3,title:"Web Design 101",author:"Jason Beaird"},
    ]},
    { id:2, level:"Intermediate", title:"JavaScript Mastery", description:"Dive deep into modern JavaScript patterns and frameworks.", books:[
      {id:4,title:"Eloquent JavaScript",author:"Marijn Haverbeke"},{id:5,title:"You Don't Know JS",author:"Kyle Simpson"},{id:6,title:"Clean Code",author:"Robert C. Martin"},
    ]},
    { id:3, level:"Intermediate", title:"React & State", description:"Build dynamic UIs with the world's most popular UI library.", books:[
      {id:7,title:"Learning React",author:"Alex Banks"},{id:8,title:"React Design Patterns",author:"Michele Bertoli"},
    ]},
    { id:4, level:"Advanced", title:"Full Stack & Beyond", description:"Connect frontend to backend and ship real applications.", books:[
      {id:9,title:"Node.js in Action",author:"Mike Cantelon"},{id:10,title:"Designing Data Apps",author:"Martin Kleppmann"},
    ]},
  ];

  const toggleComplete = id => setCompleted(p => p.includes(id)?p.filter(i=>i!==id):[...p,id]);
  const progress = Math.round((completed.length/roadmapSteps.length)*100);

  return (
    <div className={`min-h-screen ${bg}`}>
      {/* Soft glow bg */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/3 w-96 h-96 rounded-full blur-[80px] bg-[#8B5CF6]/07"/>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[80px] bg-[#EC4899]/05"/>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${dm?'bg-[#0F0A20]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF] shadow-sm'}`}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-lg italic ${dm?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
          <button onClick={()=>navigate(-1)} className={`text-sm font-medium transition-all hover:opacity-70 nav-link ${muted}`}>← Back</button>
        </div>
      </nav>

      {/* HERO BANNER */}
      <div className="relative pt-16">
        <div className="relative h-52 md:h-64 overflow-hidden">
          <div className="absolute inset-0" style={{ background:dm?'linear-gradient(135deg,#150E2B 0%,#1E1540 40%,#2A1F55 100%)':'linear-gradient(135deg,#4C1D95 0%,#6D28D9 40%,#8B5CF6 100%)' }}/>
          {/* Twinkling stars in banner */}
          {[...Array(20)].map((_,i)=>(
            <div key={i} className="absolute rounded-full" style={{ left:`${(i*14.3+4)%100}%`, top:`${(i*7.7+2)%100}%`, width:i%4===0?'3px':'2px', height:i%4===0?'3px':'2px', background:i%2===0?'#A78BFA':'#F9A8D4', animation:`twinkle ${1.5+(i%5)*.6}s ${(i*.14)%3}s ease-in-out infinite`, opacity:.7 }}/>
          ))}
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
            <p className="text-[#C4B5FD] text-xs uppercase tracking-[.3em] font-bold mb-2">✦ Level up your knowledge</p>
            <h1 style={{ fontFamily:"'Playfair Display',serif" }} className="text-4xl md:text-5xl font-black text-white mb-2">Learning Roadmap</h1>
            <p className="text-[#C4B5FD] text-sm" style={{ fontFamily:"'Lora',serif" }}>Complete each step to unlock the next chapter of your journey</p>
          </div>
        </div>
      </div>

      <main className="relative max-w-5xl mx-auto px-6 py-10">
        {/* Progress bar */}
        <div className={`p-6 rounded-2xl border mb-12 ${card}`}>
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className={`text-[10px] uppercase tracking-widest font-black mb-0.5 ${muted}`}>✦ Your Progress</p>
              <p className="font-bold text-sm">{completed.length} of {roadmapSteps.length} steps completed</p>
            </div>
            <span className="text-2xl font-black text-shimmer">{progress}%</span>
          </div>
          <div className={`h-3 rounded-full overflow-hidden ${dm?'bg-[#2A1F55]':'bg-[#F3EEF9]'}`}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width:`${progress}%`, background:'linear-gradient(90deg,#6D28D9,#8B5CF6,#EC4899)' }}/>
          </div>
          {progress===100&&(
            <div className="mt-4 text-center">
              <p className="text-emerald-400 font-black text-sm animate-pulse">🏆 Roadmap Complete! You're a champion!</p>
            </div>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-0 relative">
          {/* Center line on desktop */}
          <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 top-7 bottom-7 w-0.5 ${dm?'bg-[#2A1F55]':'bg-[#E9DEFF]'}`}/>
          {roadmapSteps.map((step,i)=>(
            <RoadmapStep key={step.id} step={step} index={i} darkMode={dm}
              isCompleted={completed.includes(step.id)}
              isUnlocked={i===0||completed.includes(roadmapSteps[i-1]?.id)}
              isLast={i===roadmapSteps.length-1}
              onToggle={toggleComplete}/>
          ))}
        </div>
      </main>
    </div>
  );
};
export default RoadMap;
