import { useRef } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

const BookSection = ({ title, books, darkMode }) => {
  const scrollRef = useRef(null);
  const scroll = dir => scrollRef.current?.scrollBy({ left: dir==='left'?-280:280, behavior:'smooth' });
  const filterValue = title.toLowerCase().replace(/ /g,'-');
  return (
    <section className={`py-12 px-4 md:px-10 ${darkMode?'bg-[#0D0618]':'bg-[#FDF8FF]'}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <svg width="26" height="26" viewBox="0 0 28 28" fill="none"><rect x="3" y="4" width="22" height="20" rx="3" fill="#2D1B5E" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#1E1035"/><polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#F472B6" opacity="0.9"/></svg>
          <h2 style={{ fontFamily:"'Playfair Display',serif" }} className={`text-3xl font-bold ${darkMode?'text-[#F3EEF8]':'text-[#1a0533]'}`}>{title}</h2>
        </div>
        <Link to={`/search?type=collection&q=${filterValue}`} className={`text-sm font-semibold nav-link ${darkMode?'text-[#A78BFA] hover:text-[#C4B5FD]':'text-[#7C3AED] hover:text-[#6D28D9]'}`}>See all ›</Link>
      </div>
      <div className="relative group/scroll">
        <button onClick={()=>scroll('left')} className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover/scroll:opacity-100 transition-all hover:scale-110 -translate-x-4 ${darkMode?'bg-[#2D1B5E] text-[#C4B5FD]':'bg-white text-[#7C3AED] border border-[#E9D5FF]'}`}>‹</button>
        <div ref={scrollRef} className="books-scroll flex gap-5 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth:'thin' }}>
          {books.map(book => <BookCard key={book.id} book={book} darkMode={darkMode}/>)}
        </div>
        <button onClick={()=>scroll('right')} className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover/scroll:opacity-100 transition-all hover:scale-110 translate-x-4 ${darkMode?'bg-[#2D1B5E] text-[#C4B5FD]':'bg-white text-[#7C3AED] border border-[#E9D5FF]'}`}>›</button>
      </div>
    </section>
  );
};
export default BookSection;
