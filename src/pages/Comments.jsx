import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const CommentCard = ({ comment, currentUser, darkMode, onDelete, onDeleteReply, onReply }) => {
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const dm = darkMode;
  const card = dm?'bg-[#1E1540] border-[#2A1F55]':'bg-white border-[#E9DEFF]';
  const muted = dm?'text-[#A78BFA]':'text-[#8B5CF6]';

  return (
    <div className="group">
      <div className={`p-8 rounded-[2.5rem] border transition-all hover:shadow-xl ${card}`}
        style={{boxShadow:dm?'0 0 30px rgba(109,40,217,.06)':'0 4px 20px rgba(109,40,217,.05)'}}>
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs text-white"
              style={{background:'linear-gradient(135deg,#6D28D9,#EC4899)'}}>
              {comment.author[0]}
            </div>
            <span className="font-black text-sm uppercase tracking-wider">{comment.author}</span>
          </div>
          {comment.author===currentUser&&(
            <button onClick={()=>onDelete(comment.id)} className={`text-[10px] font-black uppercase tracking-widest text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:underline`}>
              Remove Thread
            </button>
          )}
        </div>

        <p className="text-lg leading-relaxed mb-6 font-medium opacity-90">{comment.text}</p>

        <button onClick={()=>setIsReplying(!isReplying)}
          className={`text-xs font-black uppercase tracking-widest opacity-50 hover:opacity-100 transition-all ${isReplying?'text-red-400':muted}`}>
          {isReplying?"Cancel":"↩ Reply"}
        </button>

        {isReplying&&(
          <div className="mt-6 flex gap-3">
            <input autoFocus value={replyText} onChange={e=>setReplyText(e.target.value)}
              placeholder="Write a reply..."
              className={`flex-1 p-4 rounded-2xl text-sm border outline-none transition-all focus:ring-2 ${dm?'bg-[#0F0A20] border-[#2A1F55] text-white focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/20 placeholder-[#4C1D95]':'bg-[#F3EEF9] border-[#E9DEFF] focus:border-[#8B5CF6] focus:ring-[#8B5CF6]/10'}`}/>
            <button onClick={()=>{ onReply(comment.id,replyText); setReplyText(""); setIsReplying(false); }}
              className="px-6 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white btn-magic">
              Send
            </button>
          </div>
        )}

        {/* Replies */}
        {comment.replies.length>0&&(
          <div className={`mt-8 space-y-6 pl-6 border-l-2 ${dm?'border-[#2A1F55]':'border-[#E9DEFF]'}`}>
            {comment.replies.map(reply=>(
              <div key={reply.id} className="group/reply relative pl-4">
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-black text-[11px] uppercase tracking-tighter opacity-60 ${muted}`}>{reply.author}</span>
                  {reply.author===currentUser&&(
                    <button onClick={()=>onDeleteReply(comment.id,reply.id)} className="text-[9px] font-black text-red-400 opacity-0 group-hover/reply:opacity-100 transition-opacity hover:text-red-600">Delete</button>
                  )}
                </div>
                <p className={`text-sm font-medium leading-relaxed opacity-80 ${dm?'text-[#C4B5FD]':'text-[#6D28D9]'}`}>{reply.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Comments = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = "Ali";
  const { type, data } = location.state || {};

  const [comments, setComments] = useState([
    { id:1, author:"Sara", text:"This discussion is exactly what I was looking for. The depth of analysis here is incredible!", replies:[{id:11,author:"Ali",text:"Totally agree! Especially the point about the narrative structure."}] },
    { id:2, author:"John", text:"Does anyone have recommendations for similar topics?", replies:[] }
  ]);
  const [newComment, setNewComment] = useState("");

  const dm = darkMode;
  const bg = dm?'bg-[#0F0A20] text-[#F3EEF8]':'bg-[#FAF7FF] text-[#2E1065]';
  const muted = dm?'text-[#A78BFA]':'text-[#8B5CF6]';

  if (!data) return (
    <div className={`min-h-screen flex items-center justify-center ${bg}`}>
      <h2 className="text-2xl font-bold italic">No discussion data found.</h2>
    </div>
  );

  const handleAddComment    = () => { if(!newComment.trim()) return; setComments([{id:Date.now(),author:currentUser,text:newComment,replies:[]},...comments]); setNewComment(""); };
  const handleDeleteComment = id => setComments(comments.filter(c=>c.id!==id));
  const handleDeleteReply   = (cid,rid) => setComments(comments.map(c=>c.id===cid?{...c,replies:c.replies.filter(r=>r.id!==rid)}:c));
  const handleReply         = (cid,txt) => { if(!txt.trim()) return; setComments(comments.map(c=>c.id===cid?{...c,replies:[...c.replies,{id:Date.now(),author:currentUser,text:txt}]}:c)); };

  return (
    <div className={`min-h-screen transition-all duration-500 ${bg}`}>
      {/* Soft glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-32 left-1/3 w-80 h-80 rounded-full blur-[80px] ${dm?'bg-[#8B5CF6]/07':'bg-[#8B5CF6]/04'}`}/>
      </div>

      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b ${dm?'bg-[#0F0A20]/90 border-[#2A1F55]':'bg-white/90 border-[#E9DEFF] shadow-sm'}`}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={() => sessionStorage.setItem('showBookIntro', 'true')} className="flex items-center gap-2 group">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" className="group-hover:animate-book-bounce">
              <rect x="3" y="4" width="22" height="20" rx="3" fill="#2A1F55" stroke="#A78BFA" strokeWidth="1"/>
              <rect x="5" y="4" width="4" height="20" rx="1" fill="#150E2B"/>
              <polygon points="14,1 15.2,4.5 19,4.5 16.1,6.8 17.1,10.2 14,8 10.9,10.2 11.9,6.8 9,4.5 12.8,4.5" fill="#EC4899" opacity=".9"/>
            </svg>
            <span style={{fontFamily:"'Playfair Display',serif"}} className={`font-black text-lg italic ${dm?'text-[#C4B5FD]':'text-[#4C1D95]'}`}>BiblioTech</span>
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <div className="max-w-4xl mx-auto pt-28 pb-10 px-6">
        <button onClick={()=>navigate(-1)} className={`group flex items-center gap-2 mb-6 text-sm font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all ${muted}`}>
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
        </button>
        <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-5xl font-black tracking-tighter mb-4 leading-tight">
          {type==="book"?`Reviews: ${data.title}`:data.name}
        </h1>
        <div className="h-1 w-20 rounded-full" style={{background:'linear-gradient(90deg,#6D28D9,#EC4899)'}}/>
      </div>

      {/* INPUT BOX */}
      <div className="max-w-4xl mx-auto px-6 mb-16">
        <div className={`p-2 rounded-[2rem] border shadow-2xl transition-all ${dm?'bg-[#1E1540] border-[#2A1F55]':'bg-white border-[#E9DEFF]'}`}
          style={{boxShadow:dm?'0 0 40px rgba(109,40,217,.1)':'0 8px 40px rgba(109,40,217,.08)'}}>
          <textarea rows="2" value={newComment} onChange={e=>setNewComment(e.target.value)}
            placeholder="Join the conversation..."
            className={`w-full p-6 rounded-[1.5rem] outline-none resize-none font-medium transition-colors ${dm?'bg-[#0F0A20] text-white placeholder-[#4C1D95] focus:bg-[#150E2B]':'bg-[#F3EEF9] text-[#2E1065] placeholder-[#A78BFA] focus:bg-white'}`}/>
          <div className="flex justify-end p-2">
            <button onClick={handleAddComment}
              className="px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all hover:-translate-y-0.5 active:scale-95 btn-magic">
              Post Comment ✦
            </button>
          </div>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="max-w-4xl mx-auto px-6 pb-32 space-y-10">
        {comments.map(comment=>(
          <CommentCard key={comment.id} comment={comment} currentUser={currentUser} darkMode={dm}
            onDelete={handleDeleteComment} onDeleteReply={handleDeleteReply} onReply={handleReply}/>
        ))}
      </div>
    </div>
  );
};

export default Comments;
