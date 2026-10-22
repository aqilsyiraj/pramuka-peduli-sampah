import React, { useState } from 'react';
import { CRAFT_IDEAS } from '../data/craftData';
import { CraftIdea } from '../types';
import { Sparkles, CheckSquare, Square, Clock, Award, Hammer, ArrowRight } from 'lucide-react';
import { playCorrectSound, playClickSound } from '../utils/audio';

interface CraftWorkshopProps {
  onBadgeUnlocked: (badgeName: string) => void;
}

export const CraftWorkshop: React.FC<CraftWorkshopProps> = ({ onBadgeUnlocked }) => {
  const [selectedCraft, setSelectedCraft] = useState<CraftIdea>(CRAFT_IDEAS[0]);
  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({});
  const [completedCrafts, setCompletedCrafts] = useState<string[]>([]);

  const toggleMaterial = (craftId: string, idx: number) => {
    playClickSound();
    const key = `${craftId}-${idx}`;
    setCheckedMaterials((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleFinishCraft = (craft: CraftIdea) => {
    if (!completedCrafts.includes(craft.id)) {
      playCorrectSound();
      setCompletedCrafts((prev) => [...prev, craft.id]);
      onBadgeUnlocked(craft.badge);
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 text-amber-200 text-xs font-bold border border-amber-400/30">
            <Hammer className="w-3.5 h-3.5 text-amber-300" />
            <span>Prakarya Siaga & Penggalang Ramah Lingkungan</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            Bengkel Kreasi Daur Ulang 3R
          </h2>
          <p className="text-sm text-amber-100/90 leading-relaxed">
            Sampah anorganik seperti botol plastik, kaleng susu, dan kardus bekas bisa kita ubah menjadi barang yang sangat berguna dan bernilai seni tinggi! 
            Pilih proyek prakarya di bawah ini dan ikuti panduan langkah demi langkahnya bersama Kakak Pembina atau orang tuamu.
          </p>
        </div>
      </div>

      {/* Craft Project Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CRAFT_IDEAS.map((craft) => {
          const isSelected = craft.id === selectedCraft.id;
          const isDone = completedCrafts.includes(craft.id);
          return (
            <button
              key={craft.id}
              onClick={() => {
                playClickSound();
                setSelectedCraft(craft);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-amber-50/90 border-amber-700 shadow-md scale-102 ring-2 ring-amber-400/50'
                  : 'bg-white border-amber-200/80 hover:bg-amber-50/40 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{craft.icon}</span>
                  {isDone && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                      Selesai ✓
                    </span>
                  )}
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base text-amber-950 leading-snug">
                  {craft.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {craft.material}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-amber-100 text-xs">
                <span className="text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{craft.duration}</span>
                </span>
                <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md text-[11px]">
                  {craft.difficulty}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Craft Detailed Guide */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{selectedCraft.icon}</span>
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-amber-950">
                {selectedCraft.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Bahan Utama: <strong>{selectedCraft.material}</strong> · Tingkat: {selectedCraft.difficulty}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
              Lencana Hadiah: {selectedCraft.badge}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Materials Checklist */}
          <div className="lg:col-span-5 space-y-4 bg-amber-50/50 p-5 rounded-2xl border border-amber-200/60">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
                <span>Alat & Bahan Siaga</span>
              </h4>
              <span className="text-xs text-amber-800">
                Centang yang sudah siap:
              </span>
            </div>

            <div className="space-y-2">
              {selectedCraft.materials.map((mat, idx) => {
                const key = `${selectedCraft.id}-${idx}`;
                const isChecked = !!checkedMaterials[key];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleMaterial(selectedCraft.id, idx)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className={isChecked ? 'line-through text-slate-500' : ''}>
                      {mat}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-white border border-amber-200 text-xs text-slate-600 space-y-1">
              <strong className="text-amber-900 block">🌱 Manfaat Lingkungan:</strong>
              <p>{selectedCraft.benefit}</p>
            </div>
          </div>

          {/* Right: Step-by-Step Instructions */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="font-heading font-bold text-base text-amber-950">
              Langkah-Langkah Pembuatan:
            </h4>

            <div className="space-y-3">
              {selectedCraft.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200/80"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-heading font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Complete Craft Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-100">
              <p className="text-xs text-slate-500">
                Sudah selesai mempraktikkan prakarya ini di pangkalan atau rumah?
              </p>
              <button
                onClick={() => handleFinishCraft(selectedCraft)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all ${
                  completedCrafts.includes(selectedCraft.id)
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-amber-800 hover:bg-amber-900 text-white hover:scale-105 active:scale-95'
                }`}
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>
                  {completedCrafts.includes(selectedCraft.id)
                    ? 'Lencana Terbuka! ✓'
                    : 'Klaim Lencana Prakarya Ini'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
