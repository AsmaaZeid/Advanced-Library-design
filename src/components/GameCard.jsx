import { Link } from 'react-router-dom';
import hero from '../assets/hero.png';

const GameCard = ({ game, darkMode }) => (
  <Link to={`/games/${game.id||''}`}>
    <div className="group relative w-72 h-52 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-3"
      style={{ boxShadow:'0 8px 32px rgba(124,58,237,0.25)' }}>
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage:`url(${game.image||hero})` }}>
        <div className="absolute inset-0" style={{ background:'linear-gradient(135deg, rgba(76,29,149,0.9) 0%, rgba(124,58,237,0.7) 50%, rgba(236,72,153,0.5) 100%)' }}/>
      </div>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background:'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(244,114,182,0.2) 100%)' }}/>
      {/* Sparkles on hover */}
      {[0,1,2].map(i=>(
        <div key={i} className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ top:`${20+i*25}%`, left:`${75+i*5}%`, animationDelay:`${i*0.2}s` }}>
          <svg width="10" height="10" viewBox="0 0 20 20"><polygon points="10,0 12,7 19,7 13,11 16,18 10,14 4,18 7,11 1,7 8,7" fill="#FDE68A" opacity="0.9"/></svg>
        </div>
      ))}
      <div className="relative h-full flex flex-col justify-end p-5 text-white">
        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C4B5FD] mb-1">Roadmap</span>
        <h3 style={{ fontFamily:"'Playfair Display',serif" }} className="text-lg font-bold mb-1 leading-tight">{game.title}</h3>
        <p className="text-xs text-white/70 mb-3">{game.description}</p>
        <button className="self-start px-4 py-2 bg-white/10 backdrop-blur-sm border border-[#A78BFA]/40 text-white rounded-xl text-xs font-bold transition-all group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED]">
          View Roadmap ✦
        </button>
      </div>
    </div>
  </Link>
);
export default GameCard;
