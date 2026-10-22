import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { QuizQuestion } from '../types';
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, ShieldCheck, Star, HelpCircle } from 'lucide-react';
import { playCorrectSound, playWrongSound, playSuccessSound, playClickSound } from '../utils/audio';

interface ScoutQuizProps {
  onQuizCompleted: (scorePercentage: number) => void;
  onGoToCertificate: () => void;
}

export const ScoutQuiz: React.FC<ScoutQuizProps> = ({
  onQuizCompleted,
  onGoToCertificate,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const userPick = selectedAnswers[currentQ.id];

  const handlePickOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    playClickSound();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleConfirmAnswer = () => {
    if (!userPick) return;
    setIsAnswerSubmitted(true);

    if (userPick === currentQ.correctAnswer) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    setIsAnswerSubmitted(false);
    if (currentIdx + 1 >= QUIZ_QUESTIONS.length) {
      // Calculate final score
      let correctCount = 0;
      QUIZ_QUESTIONS.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
      const scorePct = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
      setQuizFinished(true);
      onQuizCompleted(scorePct);

      if (scorePct >= 70) {
        playSuccessSound();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleRestartQuiz = () => {
    playClickSound();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsAnswerSubmitted(false);
    setQuizFinished(false);
  };

  // Score calculation
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });
  const finalScore = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      {/* Quiz Banner */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Ujian Kecakapan Siaga & Penggalang
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              Kuis Pramuka Peduli Sampah
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90">
              10 Pertanyaan Skenario Nyata di Sekolah & Perkemahan Persami
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-700/60 border border-amber-500/40 text-xs font-bold">
            <Star className="w-4 h-4 text-amber-300" />
            <span>Target Lulus: ≥ 70 Poin</span>
          </div>
        </div>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Bar & Counter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>Pertanyaan ke-{currentIdx + 1} dari {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}% Selesai</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-amber-100 overflow-hidden">
              <div
                className="h-full bg-amber-700 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Scenario Tag */}
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Skenario:</strong> {currentQ.scenario}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="font-heading text-lg sm:text-xl font-bold text-amber-950 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected = userPick === option.id;
              const isCorrect = option.id === currentQ.correctAnswer;
              let styleClass = 'bg-white hover:bg-amber-50/50 border-slate-200 text-slate-800';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  styleClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrect) {
                  styleClass = 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-300';
                } else {
                  styleClass = 'opacity-50 border-slate-200 text-slate-500';
                }
              } else if (isSelected) {
                styleClass = 'bg-amber-100/80 border-amber-700 text-amber-950 ring-2 ring-amber-400';
              }

              return (
                <button
                  key={option.id}
                  disabled={isAnswerSubmitted}
                  onClick={() => handlePickOption(option.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-semibold transition-all ${styleClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-amber-200/70 text-amber-900 font-bold flex items-center justify-center shrink-0">
                      {option.id}
                    </span>
                    <span>{option.text}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Pramuka Value */}
          {isAnswerSubmitted && (
            <div
              className={`p-5 rounded-2xl border-2 text-xs sm:text-sm space-y-2 ${
                userPick === currentQ.correctAnswer
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold">
                {userPick === currentQ.correctAnswer ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800">Jawabanmu Tepat Sekali!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-amber-900">Pembahasan Kakak Pembina:</span>
                  </>
                )}
              </div>
              <p className="text-slate-700 leading-relaxed">
                {currentQ.explanation}
              </p>
              <div className="pt-2 text-[11px] font-bold text-amber-900 flex items-center gap-1.5 border-t border-amber-200/60">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Nilai Pramuka: {currentQ.pramukaValue}</span>
              </div>
            </div>
          )}

          {/* Action Button: Confirm or Next */}
          <div className="pt-4 flex items-center justify-between border-t border-amber-100">
            <span className="text-xs text-slate-500">
              {!isAnswerSubmitted
                ? userPick
                  ? 'Klik Periksa Jawaban untuk melihat pembahasan'
                  : 'Pilih salah satu jawaban di atas'
                : 'Lanjut ke pertanyaan berikutnya'}
            </span>

            {!isAnswerSubmitted ? (
              <button
                disabled={!userPick}
                onClick={handleConfirmAnswer}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-xs ${
                  userPick
                    ? 'bg-amber-800 hover:bg-amber-900 hover:scale-105 active:scale-95'
                    : 'bg-slate-300 cursor-not-allowed text-slate-500'
                }`}
              >
                Periksa Jawaban
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-xs hover:scale-105"
              >
                <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'Lihat Hasil Akhir' : 'Pertanyaan Berikutnya'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* QUIZ RESULT SCORE SCREEN */
        <div className="bg-white rounded-3xl border-2 border-amber-200/90 p-8 sm:p-10 text-center space-y-6 shadow-md">
          <div className="text-7xl animate-bounce">
            {finalScore >= 70 ? '🏆' : '📚'}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Hasil Uji Kecakapan
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-black text-amber-950">
              {finalScore >= 70
                ? 'Hebat! Kamu Lulus Uji Kecakapan Pemilah Sampah!'
                : 'Tetap Semangat! Belajar Lagi dan Coba Ulangi Ya!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              {finalScore >= 70
                ? 'Kamu telah memahami pemilahan 5 jenis sampah dan siap mengamalkan Dasa Darma Pramuka di gugus depan!'
                : 'Jangan berkecil hati, adik Pramuka pantang menyerah. Baca kembali materi di menu Jelajah Tong Sampah dan coba lagi!'}
            </p>
          </div>

          {/* Big Score Card */}
          <div className="inline-flex flex-col items-center p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-xs">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Skor Perolehanmu:
            </span>
            <span className="font-heading text-5xl font-black text-amber-900 my-1">
              {finalScore} <span className="text-2xl text-slate-500">/ 100</span>
            </span>
            <span className="text-xs font-semibold text-emerald-700">
              Benar {correctCount} dari {QUIZ_QUESTIONS.length} Soal
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            {finalScore >= 70 && (
              <button
                onClick={onGoToCertificate}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm shadow-md transition-transform hover:scale-105"
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>Buka & Cetak Piagam TKK Pramuka</span>
              </button>
            )}

            <button
              onClick={handleRestartQuiz}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-300 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-slate-600" />
              <span>Ulangi Kuis</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
