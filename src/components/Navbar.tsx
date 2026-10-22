import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Gamepad2, Award, FileText, Palette, Info } from 'lucide-react';
import { playTepukPramuka, setMuteState, getMuteState, playClickSound } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openKmdGuide: () => void;
  openDeployGuide: () => void;
  studentName: string;
  score: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openKmdGuide,
  openDeployGuide,
  studentName,
  score,
}) => {
  const [isMuted, setIsMuted] = useState(getMuteState());
  const [clappingBeat, setClappingBeat] = useState<number>(-1);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setMuteState(nextMuted);
  };

  const handleTepukPramuka = () => {
    playClickSound();
    playTepukPramuka((beatIndex) => {
      setClappingBeat(beatIndex);
    });
  };

  const navItems = [
    { id: 'explore', label: 'Jelajah Tong Sampah', icon: BookOpen },
    { id: 'game', label: 'Game Pilah Sampah', icon: Gamepad2, badge: 'Main Yuk!' },
    { id: 'craft', label: 'Bengkel Kreasi 3R', icon: Palette },
    { id: 'quiz', label: 'Kuis Uji Kecakapan', icon: Award },
    { id: 'certificate', label: 'Piagam & Lencana TKK', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top Banner - Pramuka Theme Accent */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 text-amber-100 text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-200">⚜️ Gerakan Pramuka Indonesia</span>
            <span aria-hidden="true" className="text-amber-400">·</span>
            <span>Ujian Kursus Mahir Dasar (KMD)</span>
            <span aria-hidden="true" className="text-amber-400">·</span>
            <span className="hidden sm:inline">Dasa Darma 2: Cinta Alam & Kasih Sayang Sesama Manusia</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openDeployGuide}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white text-[11px] font-bold transition-colors border border-emerald-400/50"
              title="Unduh Source Code & Cara Upload ke GitHub / Vercel"
            >
              <span>🚀 Deploy Vercel / GitHub</span>
            </button>

            <button
              onClick={openKmdGuide}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-600/60 hover:bg-amber-600 text-amber-100 text-[11px] font-medium transition-colors border border-amber-500/50"
              title="Lihat Modul Ajar & Rencana Pembelajaran KMD"
            >
              <Info className="w-3.5 h-3.5 text-amber-300" />
              <span>Modul Penguji KMD</span>
            </button>

            {studentName && (
              <span className="hidden md:inline-block text-amber-200 font-medium">
                Pramuka: <strong className="text-white">{studentName}</strong> (Skor: {score})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => setActiveTab('explore')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-2xl shadow-md shadow-amber-900/10 group-hover:scale-105 transition-transform">
            ⚜️
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-heading text-lg sm:text-xl font-bold text-amber-950 tracking-tight leading-tight">
                Pramuka Peduli Sampah
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-md bg-amber-700 text-white font-bold border border-amber-800">
                Pramuka Penggalang
              </span>
            </div>
            <p className="text-xs text-amber-800/80">
              Media Belajar & Game Pemilahan Sampah Pasukan Penggalang
            </p>
          </div>
        </div>

        {/* Action Buttons: Sound & Tepuk Pramuka */}
        <div className="flex items-center gap-2">
          {/* Tepuk Pramuka Button */}
          <button
            onClick={handleTepukPramuka}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-xs ${
              clappingBeat >= 0
                ? 'bg-amber-500 text-white border-amber-600 scale-105'
                : 'bg-amber-100/70 hover:bg-amber-200 text-amber-900 border-amber-300'
            }`}
            title="Klik untuk mendengarkan dan melihat ritme Tepuk Pramuka!"
          >
            <span className="text-sm">👏</span>
            <span className="hidden sm:inline">
              {clappingBeat >= 0 ? `Tepuk! (${clappingBeat + 1})` : 'Tepuk Pramuka'}
            </span>
            {clappingBeat >= 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
            )}
          </button>

          {/* Audio toggle button */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="p-2 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-amber-900 transition-colors"
            title={isMuted ? 'Nyalakan Audio' : 'Matikan Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
          </button>
        </div>
      </div>

      {/* Nav Tabs Bar */}
      <nav aria-label="Navigasi Menu Belajar" className="max-w-6xl mx-auto px-4 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(item.id);
                }}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-700 text-white shadow-sm shadow-amber-900/20'
                    : 'text-amber-950/80 hover:text-amber-900 hover:bg-amber-100/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-200' : 'text-amber-700'}`} />
                <span>{item.label}</span>
                {item.badge && !isActive && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-bold animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
