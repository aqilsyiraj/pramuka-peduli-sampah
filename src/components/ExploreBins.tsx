import React, { useState } from 'react';
import { Volume2, Sparkles, CheckCircle2, Clock, ArrowRight, ShieldCheck, HelpCircle, Layers } from 'lucide-react';
import { TRASH_BINS, WASTE_ITEMS, DECOMPOSITION_STATS, SCOUT_RULES_CONNECTION } from '../data/wasteData';
import { TrashBinCategory, WasteItem } from '../types';
import { speakIndonesian, stopSpeaking, playClickSound } from '../utils/audio';

interface ExploreBinsProps {
  onStartGame: () => void;
  onTakeQuiz: () => void;
}

export const ExploreBins: React.FC<ExploreBinsProps> = ({ onStartGame, onTakeQuiz }) => {
  const [selectedBinId, setSelectedBinId] = useState<string>('organik');
  const [activeItemFilter, setActiveItemFilter] = useState<string>('all');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const selectedBin = TRASH_BINS.find((b) => b.id === selectedBinId) || TRASH_BINS[0];

  const handleSpeak = (text: string) => {
    stopSpeaking();
    setIsSpeaking(true);
    speakIndonesian(text);
    // Rough estimate or speech fallback
    setTimeout(() => setIsSpeaking(false), 8000);
  };

  const filteredItems = activeItemFilter === 'all'
    ? WASTE_ITEMS
    : WASTE_ITEMS.filter((item) => item.category === activeItemFilter);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-700 via-amber-800 to-emerald-900 text-white p-6 sm:p-10 shadow-lg shadow-amber-950/20">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 text-xs font-semibold">
            <span>⚜️ Media Pembelajaran Interaktif Ujian KMD Pramuka</span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Salam Pramuka! 🌿 <br />
            Ayo Belajar Memilah Sampah, Lindungi Bumi Kita!
          </h1>

          <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
            Sebagai anggota Pramuka Penggalang (Ramu, Rakit, Terap), kita mengamalkan <strong>Dasa Darma ke-2: Cinta alam dan kasih sayang sesama manusia</strong>. 
            Langkah nyata kepemimpinan regu dimulai dari memilah sampah ke dalam 5 tong sampah ramah lingkungan!
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartGame}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>🎮 Main Game Pilah Sampah</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTakeQuiz}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-600/60 hover:bg-amber-600 text-white font-semibold text-sm border border-amber-400/40 transition-all"
            >
              <span>📝 Ikuti Kuis Kecakapan</span>
            </button>
          </div>
        </div>

        {/* Decorative Badge Background */}
        <div className="absolute -right-8 -bottom-8 opacity-15 pointer-events-none select-none text-[180px]">
          ⚜️
        </div>
      </section>

      {/* 5 COLORFUL TRASH BINS EXPLORER */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-amber-800">
            Kenali Rumah Sampahmu
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-950">
            5 Tong Sampah Ramah Lingkungan
          </h2>
          <p className="text-sm text-slate-600">
            Klik salah satu tong sampah di bawah ini untuk berkenalan dengan karakternya, mendengarkan suaranya, dan melihat apa saja isinya!
          </p>
        </div>

        {/* Tong Selectors (Buttons) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {TRASH_BINS.map((bin) => {
            const isSelected = bin.id === selectedBinId;
            return (
              <button
                key={bin.id}
                onClick={() => {
                  playClickSound();
                  setSelectedBinId(bin.id);
                  handleSpeak(bin.kidsExplanation);
                }}
                className={`relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? `${bin.bgClass} text-white shadow-lg scale-105 ${bin.borderClass}`
                    : 'bg-white hover:bg-amber-50/70 border-slate-200 text-slate-700 shadow-xs'
                }`}
              >
                <div className="text-4xl mb-2 filter drop-shadow-sm animate-float">
                  {bin.emoji}
                </div>
                <span className="font-heading font-bold text-sm sm:text-base text-center leading-tight">
                  {bin.name}
                </span>
                <span className={`text-[11px] font-semibold mt-1 px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {bin.colorName}
                </span>
                {isSelected && (
                  <span className="absolute -top-2 right-2 bg-white text-slate-900 text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs">
                    Aktif ✨
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Bin Interactive Detail Showcase */}
        <div className="bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Bin Avatar & Voice */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-amber-50/50 border border-amber-100">
              <div className={`w-32 h-36 rounded-3xl ${selectedBin.bgClass} flex flex-col items-center justify-center text-white shadow-md relative overflow-hidden`}>
                <span className="text-5xl">{selectedBin.emoji}</span>
                <span className="font-heading font-black text-sm uppercase tracking-wider mt-2">
                  {selectedBin.id}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-4 bg-black/15"></div>
              </div>

              <h3 className="font-heading text-xl font-bold text-amber-950 mt-4">
                {selectedBin.name}
              </h3>
              <p className="text-xs text-amber-800 font-semibold mb-4">
                Warna: {selectedBin.colorName}
              </p>

              {/* Text-to-Speech Button */}
              <button
                onClick={() => handleSpeak(selectedBin.kidsExplanation)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-all shadow-xs"
              >
                <Volume2 className="w-4 h-4 text-amber-300" />
                <span>{isSpeaking ? 'Mendengarkan...' : 'Dengarkan Suara Tong!'}</span>
              </button>

              <div className="mt-4 p-3 rounded-xl bg-amber-100/70 border border-amber-200 text-left w-full">
                <span className="text-[11px] font-bold text-amber-900 block mb-1">
                  💡 Tips untuk Rekan Penggalang:
                </span>
                <p className="text-xs text-amber-950 leading-relaxed">
                  {selectedBin.tips}
                </p>
              </div>
            </div>

            {/* Explanation & What happens to this waste */}
            <div className="lg:col-span-8 space-y-6">
              {/* Kids monologue bubble */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-r from-amber-100/80 to-amber-50 border border-amber-200 text-amber-950">
                <p className="text-sm sm:text-base font-medium leading-relaxed italic">
                  "{selectedBin.kidsExplanation}"
                </p>
              </div>

              {/* Description & Benefits */}
              <div className="space-y-3">
                <h4 className="font-heading text-base font-bold text-slate-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Pengertian & Manfaat Pemilahan</span>
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedBin.description}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong>Manfaat Lingkungan:</strong> {selectedBin.benefits}
                </p>
              </div>

              {/* What it turns into (Hasil Olahan) */}
              <div className="space-y-3">
                <h4 className="font-heading text-base font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Disulap Jadi Apa Setelah Diolah?</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {selectedBin.processedInto.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-center"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                      <span className="text-xs font-semibold text-emerald-950 leading-tight block">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples in this bin */}
              <div className="space-y-3">
                <h4 className="font-heading text-base font-bold text-slate-800 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>Contoh Benda yang Masuk ke Tong Ini:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {WASTE_ITEMS.filter((item) => item.category === selectedBin.id).map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                    >
                      <span className="text-base">{item.emoji}</span>
                      <span>{item.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DECOMPOSITION TIME CHART */}
      <section className="bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 mb-1">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Infografis Sains Interaktif</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-amber-950">
              Berapa Lama Sampah Hancur di Alam?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tahukah Rekan Penggalang? Sampah anorganik membutuhkan waktu ratusan tahun untuk terurai di dalam tanah!
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {DECOMPOSITION_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-slate-800 flex items-center gap-2">
                  <span className="text-lg">{stat.icon}</span>
                  <span>{stat.item}</span>
                </span>
                <span className="font-bold text-amber-900 bg-amber-100/70 px-2.5 py-0.5 rounded-lg border border-amber-200 text-xs">
                  {stat.time}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    stat.color === 'emerald'
                      ? 'bg-emerald-500'
                      : stat.color === 'sky'
                      ? 'bg-sky-500'
                      : stat.color === 'amber'
                      ? 'bg-amber-500'
                      : stat.color === 'rose'
                      ? 'bg-rose-500'
                      : 'bg-indigo-600'
                  }`}
                  style={{ width: `${stat.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <p>
            <strong>Pelajaran Penting Penggalang:</strong> Sampah organik seperti sisa sayur dan kulit buah hancur dalam hitungan minggu dan menjadi nutrisi bagi tanah. 
            Sebaliknya, 1 botol plastik yang kita buang sembarangan akan tetap mencemari bumi hingga ratusan tahun! 
            Mari selalu gunakan tumbler regu dan buang sampah plastik ke tong kuning.
          </p>
        </div>
      </section>

      {/* 3R + 1R CONCEPT FOR SCOUTS */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Kecakapan Hidup Pasukan Penggalang
          </span>
          <h2 className="font-heading text-2xl font-bold mt-1 text-white">
            Prinsip 3R + 1R: Senjata Rahasia Pramuka Ramah Lingkungan
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
            Empat pilar kebiasaan baik yang bisa kita lakukan setiap hari di rumah, sekolah, dan saat perkemahan:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
            <div className="text-3xl">🚫</div>
            <h3 className="font-heading font-bold text-base text-amber-200">1. REDUCE (Kurangi)</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Mengurangi penggunaan barang sekali pakai. Contoh: Bawa botol minum (tumbler) dan kotak bekal sendiri ke sekolah.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
            <div className="text-3xl">🔄</div>
            <h3 className="font-heading font-bold text-base text-amber-200">2. REUSE (Gunakan Lagi)</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Menggunakan kembali barang yang masih layak. Contoh: Memakai tas belanja kain berulang kali daripada meminta kresek baru.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
            <div className="text-3xl">♻️</div>
            <h3 className="font-heading font-bold text-base text-amber-200">3. RECYCLE (Daur Ulang)</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Mengolah sampah menjadi produk baru bermanfaat. Contoh: Menyetor botol ke Bank Sampah atau membuat celengan dari kaleng.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
            <div className="text-3xl">🌱</div>
            <h3 className="font-heading font-bold text-base text-amber-200">4. REPLACE (Ganti)</h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Mengganti barang berbahaya dengan bahan ramah lingkungan. Contoh: Memakai sapu tangan kain daripada berlembar-lembar tisu.
            </p>
          </div>
        </div>
      </section>

      {/* DASA DARMA & PRAMUKA VALUES */}
      <section className="bg-white rounded-3xl border border-amber-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Karakter Kepramukaan
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-amber-950">
            Nilai Pramuka dalam Pemilahan Sampah
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Setiap kali memilah sampah, kita mengamalkan janji suci Pramuka:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCOUT_RULES_CONNECTION.map((scout, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  {scout.number}
                </span>
                <h3 className="font-heading font-bold text-base text-amber-950 mt-2">
                  {scout.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed mt-1">
                  {scout.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-amber-200/60 text-xs font-bold text-emerald-800">
                {scout.badge}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BUTTON BAR */}
      <section className="text-center p-8 rounded-3xl bg-amber-100/70 border border-amber-300 space-y-3">
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-amber-950">
          Sudah Siap Membuktikan Kecakapanmu?
        </h3>
        <p className="text-sm text-amber-900 max-w-md mx-auto">
          Ayo latih ketangkasanmu memilah sampah di Mini Game Seru dan raih skor tertinggi untuk mendapatkan Lencana Pramuka!
        </p>
        <div className="pt-2">
          <button
            onClick={onStartGame}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
          >
            <span>Mulai Game Pilah Kilat Penggalang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
