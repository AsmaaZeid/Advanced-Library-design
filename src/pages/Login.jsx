import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login({ darkMode }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email:"", password:"" });
  const [error, setError] = useState(""); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false);
  const handleChange = e => setFormData(p=>({...p,[e.target.name]:e.target.value}));
  const handleSubmit = async e => {
    e.preventDefault(); setError(""); setMessage(""); setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      if(res.data.success){ localStorage.setItem("token",res.data.token); localStorage.setItem("user",JSON.stringify(res.data.user)); setMessage("Welcome back! ✨"); setTimeout(()=>navigate("/"),700); }
    } catch(err){ setError(err.response?.data?.message||"Something went wrong"); } finally{ setLoading(false); }
  };
  const inputCls = `w-full px-5 py-4 rounded-2xl outline-none border transition-all text-sm focus:ring-2 ${darkMode?'bg-[#0D0618] border-[#2D1B5E] text-[#F3EEF8] focus:border-[#7C3AED] focus:ring-[#7C3AED]/20 placeholder-[#4C1D95]':'bg-[#F3EEF8] border-[#E9D5FF] focus:border-[#7C3AED] focus:ring-[#7C3AED]/10 placeholder-[#9333EA]'}`;
  const labelCls = `block text-[10px] uppercase tracking-widest font-bold mb-1.5 ${darkMode?'text-[#A78BFA]':'text-[#9333EA]'}`;

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 relative overflow-hidden transition-all ${darkMode?'bg-[#0D0618] text-[#F3EEF8]':'bg-[#FDF8FF]'}`}>
      {/* BG decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[80px] bg-[#7C3AED]/20"/>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[80px] bg-[#EC4899]/15"/>
        {/* Twinkling stars */}
        {[...Array(20)].map((_,i)=>(
          <div key={i} className="absolute rounded-full" style={{ left:`${(i*17+5)%100}%`, top:`${(i*11+8)%100}%`, width:i%4===0?'3px':'2px', height:i%4===0?'3px':'2px', background:i%2===0?'#A78BFA':'#F472B6', animation:`star-twinkle ${1.5+i%4*0.5}s ${i*0.2}s ease-in-out infinite`, opacity:0.5 }}/>
        ))}
      </div>
      <button onClick={()=>navigate(-1)} className={`fixed top-6 left-6 group flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-all ${darkMode?'text-[#A78BFA]':'text-[#7C3AED]'}`}>
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
      </button>
      <div className={`relative w-full max-w-md p-10 rounded-[2.5rem] border shadow-2xl animate-zoom-in ${darkMode?'bg-[#140D24] border-[#2D1B5E]':'bg-white border-[#E9D5FF]'}`}
        style={{ boxShadow: darkMode?'0 0 60px rgba(124,58,237,0.2)':'0 20px 60px rgba(124,58,237,0.1)' }}>
        <div className="text-center mb-10">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="inline-flex items-center gap-2 mb-3 group">
            <svg width="30" height="30" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2D1B5E" stroke="#A78BFA" strokeWidth="1"/><rect x="5" y="4" width="4" height="20" rx="1" fill="#1E1035"/><polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#F472B6" opacity="0.9"/>
            </svg>
            <span style={{ fontFamily:"'Playfair Display',serif" }} className={`font-black text-3xl italic ${darkMode?'text-[#A78BFA]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
          <p className={`text-xs uppercase tracking-[0.25em] font-bold ${darkMode?'text-[#A78BFA]':'text-[#9333EA]'}`}>✦ Sign in to continue ✦</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div><label className={labelCls}>Email Address</label><input type="email" name="email" placeholder="name@example.com" value={formData.email} onChange={handleChange} required className={inputCls}/></div>
          <div><label className={labelCls}>Password</label><input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required className={inputCls}/></div>
          {message && <p className="text-emerald-400 text-xs font-bold text-center">✓ {message}</p>}
          {error && <p className="text-[#F472B6] text-xs font-bold text-center">✦ {error}</p>}
          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl transition-all hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 btn-magic">
            {loading?"Signing in...":"Sign In ✦"}
          </button>
        </form>
        <p className={`mt-6 text-center text-sm ${darkMode?'text-[#C4B5FD]':'text-[#6B21A8]'}`}>
          No account?{" "}<Link to="/register" className={`font-black hover:underline ${darkMode?'text-[#F472B6]':'text-[#EC4899]'}`}>Register ✧</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
