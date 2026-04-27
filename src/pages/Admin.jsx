import React, { useState } from "react";
import { Link } from "react-router-dom";

const stats = [
  { label:"Total Books", value:"1,248", icon:<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/><rect x="11" y="9" width="11" height="1.5" rx=".75" fill="#C4B5FD" opacity=".8"/><rect x="11" y="12.5" width="8" height="1.5" rx=".75" fill="#C4B5FD" opacity=".6"/></svg>, color:"from-[#6D28D9] to-[#8B5CF6]" },
  { label:"Total Users", value:"356", icon:<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="11" cy="10" r="5" fill="#2A1F55" stroke="#EC4899" strokeWidth="1"/><path d="M 3 24 Q 3 17 11 17 Q 19 17 19 24" stroke="#EC4899" strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="21" cy="9" r="3.5" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/></svg>, color:"from-[#BE185D] to-[#EC4899]" },
  { label:"Borrowed", value:"142", icon:<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M 5 7 L 5 23 Q 5 24 6 24 L 22 24 Q 23 24 23 23 L 23 10 L 17 3 L 6 3 Q 5 3 5 7 Z" fill="#2A1F55" stroke="#FDE68A" strokeWidth="1"/><rect x="9" y="13" width="10" height="1.5" rx=".75" fill="#FDE68A" opacity=".7"/><rect x="9" y="17" width="7" height="1.5" rx=".75" fill="#EC4899" opacity=".6"/></svg>, color:"from-[#D97706] to-[#F59E0B]" },
  { label:"Overdue", value:"18", icon:<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="11" fill="#2A1F55" stroke="#F87171" strokeWidth="1"/><line x1="14" y1="8" x2="14" y2="15" stroke="#F87171" strokeWidth="2" strokeLinecap="round"/><circle cx="14" cy="19" r="1.5" fill="#F87171"/></svg>, color:"from-[#DC2626] to-[#F87171]" },
];

const books = [
  { id:1, title:"The Great Gatsby", author:"F. Scott Fitzgerald", status:"Available" },
  { id:2, title:"1984", author:"George Orwell", status:"Borrowed" },
  { id:3, title:"Pride and Prejudice", author:"Jane Austen", status:"Available" },
  { id:4, title:"Moby Dick", author:"Herman Melville", status:"Borrowed" },
  { id:5, title:"To Kill a Mockingbird", author:"Harper Lee", status:"Available" },
  { id:6, title:"The Catcher in the Rye", author:"J.D. Salinger", status:"Overdue" },
];

const users = [
  { name:"Sara Ahmed", email:"sara@email.com", role:"Student", books:3 },
  { name:"John Doe", email:"john@email.com", role:"Librarian", books:0 },
  { name:"Nadia K.", email:"nadia@email.com", role:"Student", books:1 },
  { name:"Michael B.", email:"michael@email.com", role:"Admin", books:0 },
];

const Admin = () => {
  const [tab, setTab] = useState("books");
  const [search, setSearch] = useState("");

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const statusStyle = {
    Available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Borrowed:  "bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/30",
    Overdue:   "bg-red-500/15 text-red-400 border-red-500/30",
  };

  const roleStyle = {
    Admin:     "bg-[#EC4899]/15 text-[#F9A8D4] border-[#EC4899]/30",
    Librarian: "bg-[#8B5CF6]/15 text-[#C4B5FD] border-[#8B5CF6]/30",
    Student:   "bg-[#FDE68A]/15 text-[#FDE68A] border-[#FDE68A]/30",
  };

  return (
    <div className="min-h-screen bg-[#0F0A20] text-[#F3EEF8]">
      {/* Soft bg glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full blur-[80px] bg-[#8B5CF6]/08"/>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[80px] bg-[#EC4899]/05"/>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b bg-[#0F0A20]/92 border-[#2A1F55]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
              <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className="font-black text-xl italic text-[#C4B5FD]">BiblioTech</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EC4899]/20 text-[#F9A8D4] border border-[#EC4899]/30">Admin Panel</span>
            <Link to="/" className="text-sm text-[#A78BFA] hover:text-white transition-colors nav-link">← Back to Site</Link>
          </div>
        </div>
      </nav>

      <main className="relative max-w-7xl mx-auto pt-24 pb-16 px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[.3em] font-bold mb-2 text-[#A78BFA]">✦ Dashboard</p>
          <h1 style={{ fontFamily:"'Playfair Display',serif" }} className="text-4xl font-black">Administration</h1>
          <p className="text-[#C4B5FD] text-sm mt-1">Manage books, users, and borrowing activity.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((s,i)=>(
            <div key={i} className="relative overflow-hidden p-6 rounded-3xl border bg-[#1E1540] border-[#2A1F55] transition-all hover:-translate-y-1"
              style={{ boxShadow:'0 0 30px rgba(109,40,217,.07)' }}>
              <div className="flex items-center justify-between mb-3">
                <div style={{ animation:`float-gentle ${3+i*.4}s ${i*.3}s ease-in-out infinite` }}>{s.icon}</div>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${s.color}`}/>
              </div>
              <div className="text-3xl font-black text-transparent bg-clip-text" style={{ backgroundImage:`linear-gradient(135deg,${i===0?'#A78BFA,#C4B5FD':i===1?'#F9A8D4,#EC4899':i===2?'#FDE68A,#F59E0B':'#FCA5A5,#F87171'})`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                {s.value}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#A78BFA] mt-1">{s.label}</p>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br opacity-10" style={{ backgroundImage:`linear-gradient(135deg,${s.color.replace('from-','').replace(' to-',',')})` }}/>
            </div>
          ))}
        </div>

        {/* Search + Tabs */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <div className="flex gap-2">
            {["books","users"].map(t=>(
              <button key={t} onClick={()=>{ setTab(t); setSearch(""); }}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${tab===t?'btn-magic text-white shadow-lg':'bg-[#1E1540] border border-[#2A1F55] text-[#C4B5FD] hover:border-[#A78BFA]'}`}>
                {t==='books'?'📚 Books':'👥 Users'}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <svg className="absolute left-3 top-2.5 text-[#A78BFA]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder={tab==="books"?"Search books...":"Search users..."}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border outline-none text-sm bg-[#1E1540] border-[#2A1F55] text-white focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/20 placeholder-[#4C1D95] transition-all"/>
          </div>
        </div>

        {/* BOOKS TABLE */}
        {tab==="books"&&(
          <div className="rounded-3xl border bg-[#1E1540] border-[#2A1F55] overflow-hidden" style={{ boxShadow:'0 0 40px rgba(109,40,217,.08)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A1F55]">
                    {["#","Title","Author","Status","Actions"].map(h=>(
                      <th key={h} className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-black text-[#A78BFA]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((b,i)=>(
                    <tr key={b.id} className="border-b border-[#2A1F55]/50 hover:bg-[#2A1F55]/30 transition-colors group">
                      <td className="px-6 py-4 text-sm text-[#A78BFA] font-bold">{String(b.id).padStart(2,'0')}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm">{b.title}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#C4B5FD]">{b.author}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border uppercase tracking-wider ${statusStyle[b.status]}`}>{b.status}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8B5CF6]/20 text-[#A78BFA] hover:bg-[#8B5CF6] hover:text-white transition-all">Edit</button>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredBooks.length===0&&(
              <div className="text-center py-12 text-[#A78BFA]">No books found.</div>
            )}
          </div>
        )}

        {/* USERS TABLE */}
        {tab==="users"&&(
          <div className="rounded-3xl border bg-[#1E1540] border-[#2A1F55] overflow-hidden" style={{ boxShadow:'0 0 40px rgba(109,40,217,.08)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#2A1F55]">
                    {["User","Email","Role","Books","Actions"].map(h=>(
                      <th key={h} className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-black text-[#A78BFA]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u,i)=>(
                    <tr key={i} className="border-b border-[#2A1F55]/50 hover:bg-[#2A1F55]/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white" style={{ background:'linear-gradient(135deg,#6D28D9,#EC4899)' }}>{u.name[0]}</div>
                          <span className="font-bold text-sm">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-[#C4B5FD]">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border uppercase tracking-wider ${roleStyle[u.role]}`}>{u.role}</span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#A78BFA]">{u.books}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#8B5CF6]/20 text-[#A78BFA] hover:bg-[#8B5CF6] hover:text-white transition-all">View</button>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all">Remove</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredUsers.length===0&&(
              <div className="text-center py-12 text-[#A78BFA]">No users found.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
