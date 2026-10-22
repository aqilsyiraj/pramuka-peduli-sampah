import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Trophy, Zap, RotateCcw, ArrowRight, Volume2, CheckCircle2, XCircle, Award, Star, Flame } from 'lucide-react';
import { WASTE_ITEMS, TRASH_BINS } from '../data/wasteData';
import { WasteItem, TrashBinCategory } from '../types';
import { playCorrectSound, playWrongSound, playSuccessSound, speakIndonesian, playClickSound } from '../utils/audio';

interface WasteGameProps {
  onScoreUpdate: (newScore: number) => void;
  onBadgeUnlocked: (badgeName: string) => void;
  currentTotalScore: number;
  onGoToQuiz: () => void;
}

export const WasteGame: React.FC<WasteGameProps> = ({
  onScoreUpdate,
  onBadgeUnlocked,
  currentTotalScore,
  onGoToQuiz,
}) => {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [gameItems, setGameItems] = useState<WasteItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'wrong' | null;
    message: string;
    fact: string;
    targetBinName: string;
  }>({
    status: null,
    message: '',
    fact: '',
    targetBinName: '',
  });
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isLevelCleared, setIsLevelCleared] = useState<boolean>(false);

  // Initialize or reset game for level
  const initGame = (selectedLevel: 1 | 2 | 3) => {
    let pool = WASTE_ITEMS.filter((item) => item.level <= selectedLevel);
    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const count = selectedLevel === 1 ? 8 : selectedLevel === 2 ? 12 : 16;
    const items = shuffled.slice(0, count);

    setGameItems(items);
    setCurrentIndex(0);
    setLives(3);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    setIsLevelCleared(false);
    setFeedback({ status: null, message: '', fact: '', targetBinName: '' });
  };

  useEffect(() => {
    initGame(level);
  }, [level]);

  // Active bins available for current level
  const getAvailableBins = (): TrashBinCategory[] => {
    if (level === 1) {
      return TRASH_BINS.filter((b) => b.id === 'organik' || b.id === 'anorganik');
    }
    if (level === 2) {
      return TRASH_BINS.filter((b) => b.id === 'organik' || b.id === 'anorganik' || b.id === 'kertas' || b.id === 'b3');
    }
    return TRASH_BINS; // all 5 bins
  };

  const currentItem = gameItems[currentIndex];

  const handleThrowToBin = (binId: string) => {
    if (!currentItem || feedback.status !== null || isGameOver || isLevelCleared) return;

    const isCorrect = currentItem.category === binId;
    const targetBin = TRASH_BINS.find((b) => b.id === currentItem.category);
    const targetBinName = targetBin ? `${targetBin.name} (${targetBin.colorName})` : '';

    if (isCorrect) {
      playCorrectSound();
      const points = 10 + streak * 2;
      const nextScore = score + points;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (nextStreak > highestStreak) {
        setHighestStreak(nextStreak);
      }
      onScoreUpdate(points);

      // Check badge milestones
      if (nextStreak === 5) {
        onBadgeUnlocked('🔥 Ahli Pemilah Cepat (Streak 5)');
      }

      setFeedback({
        status: 'correct',
        message: `Hore Benar! ${currentItem.name} masuk ke ${targetBinName}!`,
        fact: currentItem.funFact,
        targetBinName,
      });
    } else {
      playWrongSound();
      const nextLives = lives - 1;
      setLives(nextLives);
      setStreak(0);

      setFeedback({
        status: 'wrong',
        message: `Oops, Kurang Tepat! ${currentItem.name} seharusnya masuk ke ${targetBinName}.`,
        fact: currentItem.hint,
        targetBinName,
      });

      if (nextLives <= 0) {
        setIsGameOver(true);
      }
    }
  };

  const handleNextItem = () => {
    setFeedback({ status: null, message: '', fact: '', targetBinName: '' });

    if (currentIndex + 1 >= gameItems.length) {
      // Level Cleared!
      setIsLevelCleared(true);
      playSuccessSound();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      if (level === 1) {
        onBadgeUnlocked('🎖️ Lencana Penggalang Ramu Pemilah Sampah');
      } else if (level === 2) {
        onBadgeUnlocked('🎖️ Lencana Penggalang Rakit Peduli Lingkungan');
      } else if (level === 3) {
        onBadgeUnlocked('👑 Lencana TKK Penggalang Terap Teladan');
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Game Header with Level selector & Status */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-heading font-black text-xs uppercase tracking-wider text-amber-800">
                Pramuka Learning Game
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Interaktif
              </span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-black text-amber-950">
              Game Pilah Kilat Penggalang
            </h2>
          </div>

          {/* Level Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-amber-100/80 rounded-2xl border border-amber-300">
            <button
              onClick={() => {
                playClickSound();
                setLevel(1);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                level === 1
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              Lvl 1: Ramu
            </button>
            <button
              onClick={() => {
                playClickSound();
                setLevel(2);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                level === 2
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              Lvl 2: Rakit
            </button>
            <button
              onClick={() => {
                playClickSound();
                setLevel(3);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                level === 3
                  ? 'bg-amber-800 text-white shadow-xs'
                  : 'text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              Lvl 3: Terap
            </button>
          </div>
        </div>

        {/* Status Dashboard: Lives, Score, Streak, Progress */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-amber-100">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Nyawa</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < lives ? 'text-rose-500' : 'text-slate-300'}`}
                  >
                    ❤️
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
            <Trophy className="w-5 h-5 text-amber-600" />
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Skor Level</span>
              <span className="font-heading font-black text-amber-950 text-base">{score} Poin</span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
            <Flame className={`w-5 h-5 ${streak >= 3 ? 'text-orange-500 animate-bounce' : 'text-slate-400'}`} />
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Streak Kombo</span>
              <span className="font-heading font-black text-orange-950 text-base">
                {streak > 0 ? `${streak}x 🔥` : '0x'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
            <Star className="w-5 h-5 text-emerald-600" />
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Progres</span>
              <span className="font-heading font-black text-emerald-950 text-base">
                {currentIndex + 1} / {gameItems.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* GAME PLAY AREA */}
      {!isGameOver && !isLevelCleared && currentItem && (
        <div className="space-y-6">
          {/* Target Item Card to Sort */}
          <div className="relative bg-white rounded-3xl border-2 border-amber-300 p-6 sm:p-8 text-center shadow-md space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
              <span>Tempat Ditemukan: {currentItem.origin}</span>
            </div>

            {/* Waste Emoji & Name */}
            <div className="flex flex-col items-center justify-center space-y-2 py-4">
              <div className="text-7xl sm:text-8xl select-none animate-float drop-shadow-md">
                {currentItem.emoji}
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-950 mt-2">
                {currentItem.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md italic">
                "{currentItem.hint}"
              </p>
            </div>

            <p className="text-xs font-bold text-amber-800 tracking-wide uppercase">
              👇 Klik Tong Sampah yang Tepat di Bawah Ini:
            </p>
          </div>

          {/* Feedback Popup Modal / Banner */}
          {feedback.status && (
            <div
              className={`p-5 rounded-2xl border-2 transition-all shadow-md ${
                feedback.status === 'correct'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-rose-50 border-rose-400 text-rose-950'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {feedback.status === 'correct' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-heading font-bold text-base">
                      {feedback.message}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                      <strong>Tahukah Kamu?</strong> {feedback.fact}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Waktu terurai di alam: <strong>{currentItem.decompositionTime}</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNextItem}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-sm text-white transition-transform hover:scale-105 ${
                    feedback.status === 'correct' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  <span>Lanjut</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TRASH BINS CHOICES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {getAvailableBins().map((bin) => (
              <button
                key={bin.id}
                disabled={feedback.status !== null}
                onClick={() => handleThrowToBin(bin.id)}
                className={`group relative flex flex-col items-center justify-between p-4 rounded-2xl border-2 transition-all text-center ${bin.borderClass} ${
                  feedback.status !== null ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:shadow-md'
                } bg-white`}
              >
                {/* Trash Can Visual */}
                <div className={`w-16 h-20 rounded-2xl ${bin.bgClass} flex flex-col items-center justify-center text-white shadow-md relative overflow-hidden mb-2 group-hover:rotate-2 transition-transform`}>
                  <span className="text-2xl">{bin.emoji}</span>
                  <span className="font-heading text-[10px] uppercase font-black tracking-widest mt-1">
                    {bin.id}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-2 bg-black/20"></div>
                </div>

                <span className="font-heading font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                  {bin.name}
                </span>

                <span className={`text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full ${bin.badgeClass}`}>
                  {bin.colorName}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GAME OVER STATE */}
      {isGameOver && (
        <div className="bg-white rounded-3xl border-2 border-rose-300 p-8 text-center space-y-4 shadow-lg">
          <div className="text-6xl animate-bounce">💔</div>
          <h3 className="font-heading text-2xl font-black text-rose-950">
            Nyawa Habis, Tetap Semangat Penggalang Tangguh!
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Dasa Darma Pramuka mengajarkan kita untuk <strong>"Rela menolong dan tabah!"</strong> serta pantang berputus asa. Ayo bangkit lagi dan raih lencana regumu!
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => initGame(level)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Coba Lagi Level Ini</span>
            </button>
          </div>
        </div>
      )}

      {/* LEVEL CLEARED CELEBRATION */}
      {isLevelCleared && (
        <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-3xl border-2 border-emerald-400 p-8 sm:p-10 text-center space-y-5 shadow-lg">
          <div className="text-7xl animate-bounce">🎖️</div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Misi Terselesaikan!
            </span>
            <h3 className="font-heading text-3xl font-extrabold text-emerald-950">
              Selamat! Kamu Lulus Level {level}!
            </h3>
            <p className="text-sm text-slate-700 max-w-lg mx-auto">
              Luar biasa! Kamu berhasil memilah seluruh sampah dengan cermat dan teliti sesuai prinsip kepramukaan.
            </p>
          </div>

          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-emerald-300 shadow-xs">
            <Trophy className="w-6 h-6 text-amber-500" />
            <div className="text-left">
              <span className="text-xs text-slate-500 block font-bold">Skor Diperoleh:</span>
              <span className="font-heading text-lg font-black text-amber-900">{score} Poin</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {level < 3 ? (
              <button
                onClick={() => setLevel((prev) => (prev + 1) as 1 | 2 | 3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
              >
                <span>Lanjut ke Level {level + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onGoToQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Ikuti Kuis Uji Kecakapan Pramuka</span>
              </button>
            )}

            <button
              onClick={() => initGame(level)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>Main Ulang Level Ini</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
