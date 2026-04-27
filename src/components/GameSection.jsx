import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameCard from './GameCard';
import hero from '../assets/hero.png';

const GameSection = ({ darkMode }) => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const games = [
    { id:1, title:"Master Web Development", description:"HTML → CSS → JavaScript → React", image:hero },
    { id:2, title:"Become a Data Scientist", description:"Python → Data Analysis → ML", image:hero },
    { id:3, title:"History Explorer", description:"Ancient → Medieval → Modern", image:hero },
    { id:4, title:"Fitness & Nutrition", description:"Training → Diet → Recovery", image:hero },
  ];
  const scroll = dir => scrollRef.current?.scrollBy({ left:dir==='left'?-300:300, behavior:'smooth' });
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{ threshold:0.2 });
    if(sectionRef.current) obs.observe(sectionRef.current);
    return ()=>obs.disconnect();
  },[]);

  return (
    <section ref={sectionRef} className={`py-16 px-6 md:px-10 overflow-hidden ${darkMode?'bg-[#140D24]':'bg-[#F3EEF8]'}`}>
      <div className="flex items-center justify-between mb-10">
        <div className={`transition-all duration-700 ${visible?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
          <p className={`text-xs uppercase tracking-[0.3em] font-bold mb-1 ${darkMode?'text-[#A78BFA]':'text-[#9333EA]'}`}>✦ Level up</p>
          <Link to="/all-games"><h2 style={{ fontFamily:"'Playfair Display',serif" }} className={`text-3xl font-bold hover:text-[#A78BFA] transition-colors ${darkMode?'text-[#F3EEF8]':'text-[#1a0533]'}`}>Reading Roadmaps ✦</h2></Link>
        </div>
        <Link to="/all-games" className={`text-sm font-bold nav-link ${darkMode?'text-[#A78BFA]':'text-[#7C3AED]'}`}>See all ›</Link>
      </div>
      <div className="relative group/scroll">
        <button onClick={()=>scroll('left')} className={`absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover/scroll:opacity-100 transition-all hover:scale-110 ${darkMode?'bg-[#2D1B5E] text-[#C4B5FD]':'bg-white text-[#7C3AED] border border-[#E9D5FF]'}`}>‹</button>
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 books-scroll">
          {games.map((game,i)=>(
            <div key={game.id} className={`flex-shrink-0 transition-all duration-700 ${visible?'translate-x-0 opacity-100':'translate-x-[-80px] opacity-0'}`} style={{ transitionDelay:`${i*120}ms` }}>
              <GameCard game={game} darkMode={darkMode}/>
            </div>
          ))}
        </div>
        <button onClick={()=>scroll('right')} className={`absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover/scroll:opacity-100 transition-all hover:scale-110 ${darkMode?'bg-[#2D1B5E] text-[#C4B5FD]':'bg-white text-[#7C3AED] border border-[#E9D5FF]'}`}>›</button>
      </div>
    </section>
  );
};
export default GameSection;
