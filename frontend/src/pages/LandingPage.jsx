import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Hexagon, Network, Eye, ArrowRight, Zap } from 'lucide-react';

function FloatingNode({ icon: Icon, title, value, x, y, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      className={`absolute flex items-center gap-3 glass px-4 py-2 rounded-full`}
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
        className="bg-white/10 p-2 rounded-full"
      >
        <Icon className="w-4 h-4 text-white" />
      </motion.div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white/90">{title}</span>
        <span className="text-[10px] text-white/50">{value}</span>
      </div>
    </motion.div>
  );
}

function FallingRays() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden pointer-events-none flex justify-center gap-12 opacity-50">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 300, opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "linear"
          }}
          className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_10px_rgba(255,255,255,0.8)] blur-[0.5px]"
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center text-foreground font-sans"
    >
      {/* Ambient Glowing Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-white/5 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[150px] pointer-events-none"
      />

      {/* Floating Constellation Nodes */}
      <FloatingNode icon={Hexagon} title="Categorization" value="Automated Engine" x="15%" y="25%" delay={0.2} />
      <FloatingNode icon={Network} title="Metadata" value="Real-time Extraction" x="70%" y="30%" delay={0.4} />
      <FloatingNode icon={Sparkles} title="Aesthetics" value="Visual Curation" x="20%" y="75%" delay={0.6} />
      <FloatingNode icon={Eye} title="Discovery" value="Cross-Platform" x="75%" y="65%" delay={0.8} />

      {/* SVG Connecting Lines (Decorative) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0">
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          d="M 20vw 28vh Q 30vw 50vh, 48vw 72vh" 
          fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" 
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
          d="M 75vw 33vh Q 65vw 50vh, 52vw 72vh" 
          fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" 
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.6 }}
          d="M 25vw 78vh Q 35vw 75vh, 48vw 72vh" 
          fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" 
        />
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.9 }}
          d="M 75vw 68vh Q 65vw 70vh, 52vw 72vh" 
          fill="none" stroke="white" strokeWidth="1" strokeDasharray="5 5" 
        />
      </svg>

      {/* Main Hero Content */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass px-4 py-1.5 rounded-full flex items-center gap-2 mb-8 text-xs font-medium cursor-pointer hover:bg-white/10 transition-colors"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span>Unlock Your Inspiration Spark!</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-50" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          The Ultimate Curation Engine
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
        >
          Dive into your digital assets, where innovative aesthetic ingestion meets seamless organization.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 relative"
        >
          <div className="relative">
            {/* Animated pointer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: [0, -10, 0] }}
              transition={{ 
                opacity: { delay: 1.5, duration: 0.8 }, 
                x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } 
              }}
              className="absolute top-1/2 -translate-y-1/2 -right-12 flex items-center text-primary opacity-90"
            >
              <ArrowRight className="w-6 h-6 transform rotate-180" />
            </motion.div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="glass hover:bg-white/10 text-white px-10 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-3 relative z-10"
            >
              Enter App <ArrowRight className="w-5 h-5" />
            </button>
            
            {/* Pulsing ring effect */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full border border-white z-0 pointer-events-none"
            />
          </div>
        </motion.div>
      </div>

      <FallingRays />

      {/* Made by text */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 right-8 text-xs font-medium text-white/40 tracking-wider"
      >
        MADE BY ANURAG MITTI FOR ANURAG MITTI
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-8 flex items-center gap-3 opacity-60"
      >
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center"
        >
          <ArrowRight className="w-3 h-3 transform rotate-90" />
        </motion.div>
        <span className="text-xs font-medium tracking-widest uppercase">Scroll Down</span>
      </motion.div>
    </motion.div>
  );
}
