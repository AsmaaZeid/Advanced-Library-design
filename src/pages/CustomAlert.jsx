import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const CustomAlert = ({ show, onClose, title, message, type = "success" }) => {
  const config = {
    success: { bar:"bg-gradient-to-r from-emerald-500 to-teal-500", icon:<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#10B981" opacity=".15"/><circle cx="24" cy="24" r="18" fill="#10B981" opacity=".25"/><polyline points="14,24 21,31 34,17" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, btn:"bg-gradient-to-r from-emerald-500 to-teal-500" },
    error:   { bar:"bg-gradient-to-r from-red-500 to-pink-500", icon:<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#EF4444" opacity=".15"/><circle cx="24" cy="24" r="18" fill="#EF4444" opacity=".25"/><line x1="16" y1="16" x2="32" y2="32" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round"/><line x1="32" y1="16" x2="16" y2="32" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round"/></svg>, btn:"bg-gradient-to-r from-red-500 to-pink-500" },
    info:    { bar:"bg-gradient-to-r from-[#6D28D9] to-[#EC4899]", icon:<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="22" fill="#8B5CF6" opacity=".15"/><circle cx="24" cy="24" r="18" fill="#8B5CF6" opacity=".25"/><circle cx="24" cy="16" r="2.5" fill="#A78BFA"/><line x1="24" y1="22" x2="24" y2="34" stroke="#A78BFA" strokeWidth="3.5" strokeLinecap="round"/></svg>, btn:"bg-gradient-to-r from-[#6D28D9] to-[#EC4899]" },
  };
  const c = config[type] || config.success;

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose}/>
          <motion.div className="fixed inset-0 z-[201] flex items-center justify-center px-4"
            initial={{opacity:0,scale:.88,y:30}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.88,y:30}} transition={{duration:.3,ease:[.34,1.56,.64,1]}}>
            <div className="w-full max-w-sm rounded-3xl overflow-hidden bg-[#1E1540] border border-[#2A1F55]"
              style={{ boxShadow:'0 0 60px rgba(109,40,217,.35)' }}>
              {/* Top accent bar */}
              <div className={`h-1.5 w-full ${c.bar}`}/>
              <div className="p-8 text-center">
                <div className="flex justify-center mb-4"
                  style={{ animation:'float-gentle 2s ease-in-out infinite' }}>{c.icon}</div>
                <h2 style={{ fontFamily:"'Playfair Display',serif" }} className="text-2xl font-black mb-2 text-[#F3EEF8]">{title}</h2>
                <p className="text-[#C4B5FD] text-sm mb-7 leading-relaxed">{message}</p>
                <button onClick={onClose}
                  className={`px-8 py-3 rounded-2xl font-bold text-sm text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 ${c.btn}`}>
                  Continue ✦
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert;
