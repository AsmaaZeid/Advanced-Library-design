import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import default_image from "../assets/default-book-cover.jpg";

const GENRES = ['All','Fiction','Science Fiction','Fantasy','Mystery','History','Romance','Business','Biography','Children','Academic'];

const GENRES_LIST = ['Fiction','Science Fiction','Fantasy','Mystery','History','Romance','Business','Biography','Children','Academic'];

const MOCK_BOOKS = Array.from({ length:48 }, (_,i) => ({
  id: i + 1,
  title: [`The Midnight Library`,`Dune`,`1984`,`Pride and Prejudice`,`The Alchemist`,`Sapiens`,`Atomic Habits`,`The Great Gatsby`,`To Kill a Mockingbird`,`Harry Potter`][i%10] + (i>=10 ? ` Vol. ${Math.floor(i/10)+1}` : ''),
  author: [`Matt Haig`,`Frank Herbert`,`George Orwell`,`Jane Austen`,`Paulo Coelho`,`Yuval Noah Harari`,`James Clear`,`F. Scott Fitzgerald`,`Harper Lee`,`J.K. Rowling`][i%10],
  year: 2005 + (i%19),
  genre: GENRES_LIST[i%10],
  tags: i%3===0 ? ['best-sellers'] : i%4===0 ? ['new-releases'] : ['popular-books'],
  copies: i%7===0 ? 0 : Math.floor(Math.random()*8)+1,
  rating: 3 + Math.random()*2,
  price: 9.99 + (i%20)*1.5,
}));

const BookCard = ({ book, darkMode }) => (
  <Link to={`/book/${book.id}`} state={{ book }}>
    <div className={`group flex flex-col rounded-2xl transition-all duration-300 book-card-hover border p-3 overflow-hidden ${
      darkMode ? 'bg-[#1E1540] border-[#2A1F55] hover:border-[#A78BFA]' : 'bg-white border-[#E9DEFF] hover:border-[#8B5CF6] shadow-sm hover:shadow-lg'
    }`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-3">
        <img src={book.coverUrl || default_image} alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => e.target.src = default_image}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#4C1D95]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
        <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300">
          <span className="text-xs bg-white/90 text-[#4C1D95] font-bold px-3 py-1 rounded-full">View Book</span>
        </div>
        {book.copies === 0 && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black bg-red-500 text-white uppercase tracking-wider">Out</div>
        )}
      </div>
      <h3 className={`font-bold truncate text-sm mb-1 ${darkMode?'text-[#F3EEF8]':'text-[#2E1065]'}`}>{book.title}</h3>
      <p className="text-xs italic mb-1 text-[#A78BFA]">by {book.author}</p>
      <div className="flex items-center text-yellow-400 text-xs mb-1">
        {Array.from({length:5},(_,i)=><span key={i}>{i<Math.floor(book.rating||0)?'★':'☆'}</span>)}
        <span className="ml-1 text-[#A78BFA] text-xs">({(book.rating||0).toFixed(1)})</span>
      </div>
      <p className="text-[#A78BFA] font-black text-xs">${(book.price||0).toFixed(2)}</p>
    </div>
  </Link>
);

const DisplayBooks = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get("q") || "";
  const filterType = queryParams.get("type");

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [activeSearch, setActiveSearch] = useState(initialSearch.toLowerCase());
  const [activeGenre, setActiveGenre] = useState('All');
  const [sortBy, setSortBy] = useState("year");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const booksPerPage = 12;

  const dark = darkMode;
  const pageClass = dark ? 'bg-[#0F0A20] text-[#F3EEF8]' : 'bg-[#FAF7FF] text-[#2E1065]';
  const cardCls = dark ? 'bg-[#1E1540] border-[#2A1F55]' : 'bg-white border-[#E9DEFF] shadow-sm';
  const accentText = dark ? 'text-[#A78BFA]' : 'text-[#8B5CF6]';

  const filtered = MOCK_BOOKS.filter(book => {
    const matchesSearch = !activeSearch ||
      book.title.toLowerCase().includes(activeSearch) ||
      book.author.toLowerCase().includes(activeSearch);
    const matchesGenre = activeGenre === 'All' || book.genre === activeGenre;
    const matchesType = !filterType ||
      (filterType === 'collection' && book.tags.some(t => t.includes(initialSearch.toLowerCase()))) ||
      (filterType === 'genre' && book.genre.toLowerCase().includes(initialSearch.toLowerCase()));
    const matchesAvail = !availableOnly || book.copies > 0;
    return matchesSearch && matchesGenre && (filterType ? matchesType : true) && matchesAvail;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'year')   return b.year - a.year;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price')  return a.price - b.price;
    if (sortBy === 'copies') return b.copies - a.copies;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / booksPerPage);
  const current = sorted.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveSearch(searchInput.toLowerCase());
    setCurrentPage(1);
  };

  const handleGenre = (g) => {
    setActiveGenre(g);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveSearch('');
    setSearchInput('');
    setActiveGenre('All');
    setAvailableOnly(false);
    setSortBy('year');
    setCurrentPage(1);
  };

  const fieldCls = `w-full px-4 py-2.5 rounded-xl border outline-none text-sm focus:ring-2 transition-all ${dark?'bg-[#1E1540] border-[#2A1F55] text-white focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 placeholder-[#6D28D9]':'bg-white border-[#E9DEFF] text-[#2E1065] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/10 placeholder-[#A78BFA]'}`;

  const hasActiveFilters = activeSearch || activeGenre !== 'All' || availableOnly || sortBy !== 'year';

  return (
    <div className={`min-h-screen pb-16 transition-colors ${pageClass}`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-32 -left-32 w-80 h-80 rounded-full blur-[80px] ${dark?'bg-[#8B5CF6]/08':'bg-[#8B5CF6]/05'}`}/>
        <div className={`absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-[80px] ${dark?'bg-[#EC4899]/06':'bg-[#EC4899]/04'}`}/>
      </div>

      <nav className={`sticky top-0 z-50 border-b backdrop-blur-xl ${dark?'bg-[#0F0A20]/92 border-[#2A1F55]':'bg-[#FAF7FF]/92 border-[#E9DEFF]'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-3">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
              <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{fontFamily:"'Playfair Display',serif"}} className={`font-black text-xl italic hidden sm:block ${dark?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl flex gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-3 text-[#A78BFA]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" value={searchInput} onChange={e => setSearchInput(e.target.value)}
                placeholder="Search books, authors..."
                className={`${fieldCls} pl-9`}/>
            </div>
            <button type="submit" className="px-4 py-2.5 rounded-xl font-bold text-sm text-white btn-magic flex-shrink-0">
              Search
            </button>
          </form>

          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`md:hidden flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${dark?'bg-[#1E1540] border-[#2A1F55] text-[#C4B5FD]':'bg-white border-[#E9DEFF] text-[#6D28D9]'}`}>
            ⚙
          </button>

          <span className={`text-xs font-medium flex-shrink-0 hidden md:block ${accentText}`}>{filtered.length} books</span>
          <button onClick={() => navigate(-1)} className={`text-sm font-medium flex-shrink-0 transition-all hover:opacity-70 nav-link ${accentText}`}>← Back</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 flex gap-8">
        <aside className="hidden md:flex flex-col w-56 flex-shrink-0 space-y-6">
          <div className={`p-5 rounded-2xl border ${cardCls}`}>
            <p className={`text-[10px] uppercase tracking-widest font-black mb-4 ${accentText}`}>✦ Genre</p>
            <div className="space-y-1">
              {GENRES.map(g => (
                <button key={g} onClick={() => handleGenre(g)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    activeGenre === g
                      ? 'btn-magic text-white font-bold'
                      : dark ? 'text-[#C4B5FD] hover:bg-[#2A1F55]' : 'text-[#6D28D9] hover:bg-[#F3EEF9]'
                  }`}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className={`p-5 rounded-2xl border ${cardCls}`}>
            <p className={`text-[10px] uppercase tracking-widest font-black mb-3 ${accentText}`}>✦ Sort By</p>
            {[{v:'year',l:'Newest First'},{v:'rating',l:'Top Rated'},{v:'price',l:'Price: Low'},{v:'copies',l:'Most Available'}].map(s => (
              <button key={s.v} onClick={() => setSortBy(s.v)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all mb-1 ${
                  sortBy === s.v
                    ? dark ? 'bg-[#2A1F55] text-[#A78BFA] font-bold' : 'bg-[#F3EEF9] text-[#6D28D9] font-bold'
                    : dark ? 'text-[#C4B5FD] hover:bg-[#2A1F55]' : 'text-[#6D28D9] hover:bg-[#F3EEF9]'
                }`}>
                {s.l}
              </button>
            ))}
          </div>

          <div className={`p-5 rounded-2xl border ${cardCls}`}>
            <p className={`text-[10px] uppercase tracking-widest font-black mb-3 ${accentText}`}>✦ Availability</p>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div onClick={() => setAvailableOnly(!availableOnly)}
                className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${availableOnly?'bg-gradient-to-r from-[#6D28D9] to-[#EC4899]':dark?'bg-[#2A1F55]':'bg-[#E9DEFF]'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${availableOnly?'left-6':'left-1'}`}/>
              </div>
              <span className={`text-sm font-medium ${dark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>Available only</span>
            </label>
          </div>

          {hasActiveFilters && (
            <button onClick={handleReset}
              className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-all hover:-translate-y-0.5 ${dark?'border-[#2A1F55] text-[#A78BFA] hover:bg-[#1E1540]':'border-[#E9DEFF] text-[#6D28D9] hover:bg-[#F3EEF9]'}`}>
              Reset Filters
            </button>
          )}
        </aside>

        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-[80] flex">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}/>
            <div className={`relative ml-auto w-72 h-full overflow-y-auto p-6 space-y-5 ${dark?'bg-[#0F0A20]':'bg-[#FAF7FF]'}`}>
              <div className="flex justify-between items-center mb-2">
                <p className={`font-black text-lg ${accentText}`}>Filters</p>
                <button onClick={() => setSidebarOpen(false)} className="text-2xl opacity-50">✕</button>
              </div>
              <div className={`p-4 rounded-2xl border ${cardCls}`}>
                <p className={`text-[10px] uppercase tracking-widest font-black mb-3 ${accentText}`}>Genre</p>
                <div className="flex flex-wrap gap-2">
                  {GENRES.map(g => (
                    <button key={g} onClick={() => { handleGenre(g); setSidebarOpen(false); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeGenre===g?'btn-magic text-white':dark?'bg-[#2A1F55] text-[#C4B5FD]':'bg-[#F3EEF9] text-[#6D28D9]'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`p-4 rounded-2xl border ${cardCls}`}>
                <p className={`text-[10px] uppercase tracking-widest font-black mb-3 ${accentText}`}>Sort By</p>
                {[{v:'year',l:'Newest'},{v:'rating',l:'Top Rated'},{v:'price',l:'Price'},{v:'copies',l:'Available'}].map(s => (
                  <button key={s.v} onClick={() => { setSortBy(s.v); setSidebarOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm mb-1 transition-all ${sortBy===s.v?(dark?'bg-[#2A1F55] text-[#A78BFA] font-bold':'bg-[#F3EEF9] text-[#6D28D9] font-bold'):dark?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>
                    {s.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl font-black leading-tight">
                {activeGenre !== 'All' ? activeGenre : activeSearch ? `"${activeSearch}"` : filterType === 'collection' ? initialSearch.replace(/-/g,' ') : 'All Books'}
              </h1>
              <p className={`text-sm mt-1 ${accentText}`}>{filtered.length} books found</p>
            </div>
          </div>

          {current.length === 0 ? (
            <div className={`flex flex-col items-center justify-center py-20 rounded-3xl border ${cardCls}`}>
              <div className="text-5xl mb-4" style={{animation:'float 3s ease-in-out infinite'}}>📚</div>
              <p className="text-xl font-bold mb-2">No books found</p>
              <p className={`text-sm ${accentText}`}>Try different search terms or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {current.map(book => <BookCard key={book.id} book={book} darkMode={dark}/>)}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-3">
              <button onClick={() => setCurrentPage(p => Math.max(p-1, 1))} disabled={currentPage === 1}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm border transition-all disabled:opacity-30 hover:-translate-y-0.5 ${dark?'bg-[#1E1540] border-[#2A1F55] text-white':'bg-white border-[#E9DEFF] text-[#2E1065]'}`}>
                ← Prev
              </button>
              <div className="flex gap-2">
                {[...Array(Math.min(totalPages, 5))].map((_,i) => {
                  const page = i + 1;
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage===page?'btn-magic text-white':dark?'bg-[#1E1540] border border-[#2A1F55] text-[#C4B5FD]':'bg-white border border-[#E9DEFF] text-[#6D28D9]'}`}>
                      {page}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(p+1, totalPages))} disabled={currentPage === totalPages}
                className={`px-4 py-2.5 rounded-xl font-bold text-sm border transition-all disabled:opacity-30 hover:-translate-y-0.5 ${dark?'bg-[#1E1540] border-[#2A1F55] text-white':'bg-white border-[#E9DEFF] text-[#2E1065]'}`}>
                Next →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DisplayBooks;
