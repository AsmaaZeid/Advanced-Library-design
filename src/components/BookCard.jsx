import { Link } from 'react-router-dom';
import defaultimage from '../assets/default-book-cover.jpg';

const BookCard = ({ book, darkMode }) => {
  const stars = Math.round(book.rating || 0);
  return (
    <Link to={`/book/${book.id}`} state={{ book }}>
      <div className={`group flex-shrink-0 w-52 cursor-pointer transition-all duration-400 book-card-hover`}>
        <div className={`relative h-72 rounded-2xl overflow-hidden mb-3 shadow-lg`} style={{ boxShadow: darkMode ? '0 8px 24px rgba(124,58,237,0.2)' : '0 8px 24px rgba(124,58,237,0.1)' }}>
          <img src={book.coverUrl || defaultimage} alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={e => e.target.src = defaultimage}/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <span className="px-3 py-1 bg-white/90 text-[#4C1D95] rounded-full text-xs font-bold backdrop-blur-sm">View Book</span>
          </div>
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent"/>
        </div>
        <h3 className={`font-bold text-sm truncate mb-1 px-1 ${darkMode?'text-[#F3EEF8]':'text-[#1a0533]'}`}>{book.title}</h3>
        <div className="flex items-center gap-1 px-1 mb-1">
          {Array.from({length:5},(_,i)=>(
            <span key={i} className={`text-xs ${i<stars?'text-[#F472B6]':darkMode?'text-[#2D1B5E]':'text-[#E9D5FF]'}`}>★</span>
          ))}
          <span className={`text-xs ml-1 ${darkMode?'text-[#A78BFA]':'text-[#9333EA]'}`}>({(book.rating||0).toFixed(1)})</span>
        </div>
        <p className="text-[#A78BFA] font-black text-sm px-1">${(book.price||0).toFixed(2)}</p>
      </div>
    </Link>
  );
};
export default BookCard;
