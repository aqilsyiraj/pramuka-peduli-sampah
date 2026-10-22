/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ExploreBins } from './components/ExploreBins';
import { WasteGame } from './components/WasteGame';
import { CraftWorkshop } from './components/CraftWorkshop';
import { ScoutQuiz } from './components/ScoutQuiz';
import { CertificateGenerator } from './components/CertificateGenerator';
import { KmdGuideModal } from './components/KmdGuideModal';
import { DeployGuideModal } from './components/DeployGuideModal';
import { StudentProfile } from './types';
import { Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSuccessSound } from './utils/audio';

const STORAGE_KEY = 'pramuka_peduli_sampah_profile_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [isKmdModalOpen, setIsKmdModalOpen] = useState<boolean>(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);
  const [newBadgeToast, setNewBadgeToast] = useState<string | null>(null);

  // Student Profile state
  const [profile, setProfile] = useState<StudentProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return {
      name: 'Adik Penggalang Teladan',
      school: 'Gudep Pangkalan SMP/SD',
      scoutTroop: 'Regu Rajawali',
      score: 0,
      quizScore: 0,
      unlockedBadges: ['⚜️ Anggota Penggalang Ramu'],
    };
  });

  // Save profile to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  }, [profile]);

  const handleUpdateProfile = (updated: Partial<StudentProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  const handleScoreUpdate = (points: number) => {
    setProfile((prev) => ({
      ...prev,
      score: prev.score + points,
    }));
  };

  const handleBadgeUnlocked = (badgeName: string) => {
    setProfile((prev) => {
      if (prev.unlockedBadges.includes(badgeName)) {
        return prev;
      }
      playSuccessSound();
      setNewBadgeToast(badgeName);
      setTimeout(() => setNewBadgeToast(null), 4500);
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeName],
      };
    });
  };

  const handleQuizCompleted = (scorePct: number) => {
    setProfile((prev) => ({
      ...prev,
      quizScore: scorePct,
    }));
    if (scorePct >= 70) {
      handleBadgeUnlocked('🏆 TKK Resmi: Sahabat Pemilah Sampah');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 selection:bg-amber-200">
      {/* Scout Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openKmdGuide={() => setIsKmdModalOpen(true)}
        openDeployGuide={() => setIsDeployModalOpen(true)}
        studentName={profile.name}
        score={profile.score}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6 sm:pt-8">
        {/* Unlocked Badges Mini Ribbon (if kid has earned badges) */}
        {profile.unlockedBadges.length > 0 && activeTab !== 'certificate' && (
          <div className="mb-6 p-3 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 shrink-0">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Koleksi Lencana ({profile.unlockedBadges.length}):</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap">
              {profile.unlockedBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100/70 text-amber-950 text-[11px] font-semibold border border-amber-300/80 whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'explore' && (
          <ExploreBins
            onStartGame={() => setActiveTab('game')}
            onTakeQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'game' && (
          <WasteGame
            onScoreUpdate={handleScoreUpdate}
            onBadgeUnlocked={handleBadgeUnlocked}
            currentTotalScore={profile.score}
            onGoToQuiz={() => setActiveTab('quiz')}
          />
        )}

        {activeTab === 'craft' && (
          <CraftWorkshop onBadgeUnlocked={handleBadgeUnlocked} />
        )}

        {activeTab === 'quiz' && (
          <ScoutQuiz
            onQuizCompleted={handleQuizCompleted}
            onGoToCertificate={() => setActiveTab('certificate')}
          />
        )}

        {activeTab === 'certificate' && (
          <CertificateGenerator
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
          />
        )}
      </main>

      {/* Toast Notification when a new Badge is won */}
      {newBadgeToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-emerald-300">
          <span className="text-2xl">🎖️</span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider block text-emerald-200">
              Lencana Baru Terbuka!
            </span>
            <span className="font-heading font-bold text-sm">
              {newBadgeToast}
            </span>
          </div>
        </div>
      )}

      {/* KMD Examiner Guide Modal */}
      <KmdGuideModal
        isOpen={isKmdModalOpen}
        onClose={() => setIsKmdModalOpen(false)}
      />

      {/* Deploy & GitHub Guide Modal */}
      <DeployGuideModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Printable CSS overrides */}
      <style>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          header, nav, .no-print, footer, .fixed {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
          }
          .print-area {
            border: 4px double #78350f !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px !important;
          }
        }
      `}</style>

      {/* Scout Footer */}
      <footer className="mt-auto border-t border-amber-200 bg-white/80 py-8 px-4 text-center text-xs text-slate-600 space-y-3 no-print">
        <div className="flex items-center justify-center gap-2 text-amber-900 font-bold text-sm">
          <span>⚜️ Gerakan Pramuka Indonesia</span>
          <span aria-hidden="true">·</span>
          <span>Satyaku Kudarmakan, Darmaku Kubaktikan</span>
        </div>
        <p className="max-w-xl mx-auto text-slate-500 leading-relaxed">
          Media Pembelajaran Interaktif Pemilahan Sampah untuk Pasukan Penggalang (Tingkat Ramu, Rakit, Terap) — 
          Karya Inovasi Media Pembelajaran Ujian Kursus Mahir Dasar (KMD) Pramuka.
        </p>
        <div className="pt-2 text-slate-400">
          Dasa Darma ke-2: Cinta alam dan kasih sayang sesama manusia · Bersih Lingkunganku, Bangga Pramukaku!
        </div>
      </footer>
    </div>
  );
}
