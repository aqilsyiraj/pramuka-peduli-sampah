import React, { useState } from 'react';
import { Award, Printer, Download, Share2, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { StudentProfile } from '../types';
import { playClickSound } from '../utils/audio';

interface CertificateGeneratorProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  profile,
  onUpdateProfile,
}) => {
  const [studentName, setStudentName] = useState(profile.name || 'Adik Siaga Teladan');
  const [schoolName, setSchoolName] = useState(profile.school || 'SD Negeri 01 Teladan');
  const [troopName, setTroopName] = useState(profile.scoutTroop || 'Barung Merah');
  const [pembinaName, setPembinaName] = useState('Kakak Pembina KMD Pramuka');
  const [scoutLevel, setScoutLevel] = useState<'Pramuka Siaga' | 'Pramuka Penggalang'>('Pramuka Siaga');

  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleSaveData = () => {
    playClickSound();
    onUpdateProfile({
      name: studentName,
      school: schoolName,
      scoutTroop: troopName,
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 shadow-sm no-print">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Apresiasi Kecakapan Lingkungan</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-amber-950">
              Piagam & Lencana TKK Pemilah Sampah
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Isi data adik pramuka di bawah ini untuk mencetak Piagam Penghargaan Resmi dari Ujian KMD Pramuka.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Printer className="w-4 h-4 text-amber-300" />
            <span>Cetak / Simpan Piagam</span>
          </button>
        </div>

        {/* Input Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-6 border-t border-amber-100">
          <div>
            <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">
              Nama Lengkap Siswa
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
                handleSaveData();
              }}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Contoh: Muhammad Rizky"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">
              Nama Pangkalan / Sekolah
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => {
                setSchoolName(e.target.value);
                handleSaveData();
              }}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Contoh: SDN 04 Merdeka"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">
              Nama Barung / Regu
            </label>
            <input
              type="text"
              value={troopName}
              onChange={(e) => {
                setTroopName(e.target.value);
                handleSaveData();
              }}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Contoh: Barung Hijau"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-900 uppercase mb-1">
              Pembina Penguji KMD
            </label>
            <input
              type="text"
              value={pembinaName}
              onChange={(e) => setPembinaName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-amber-50/50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Nama Pembina / Peserta KMD"
            />
          </div>
        </div>

        {/* Scout Category Selector */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs font-bold text-amber-900">Tingkat Satuan:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScoutLevel('Pramuka Siaga')}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                scoutLevel === 'Pramuka Siaga'
                  ? 'bg-amber-800 text-white border-amber-900'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              Pramuka Siaga (SD Kelas 1-4)
            </button>
            <button
              onClick={() => setScoutLevel('Pramuka Penggalang')}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                scoutLevel === 'Pramuka Penggalang'
                  ? 'bg-amber-800 text-white border-amber-900'
                  : 'bg-white text-slate-700 border-slate-200'
              }`}
            >
              Pramuka Penggalang (SD Kelas 5-6)
            </button>
          </div>
        </div>
      </div>

      {/* PRINTABLE CERTIFICATE VIEW */}
      <div className="print-area bg-amber-50/80 p-4 sm:p-10 rounded-3xl border-8 border-double border-amber-800 shadow-xl relative overflow-hidden select-none">
        {/* Certificate Inner Border */}
        <div className="border-2 border-amber-600/60 p-6 sm:p-10 rounded-2xl bg-white/95 relative text-center space-y-6">
          {/* Header Logos & Title */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-4xl">⚜️</span>
              <div className="text-center">
                <span className="font-heading font-black text-xs sm:text-sm tracking-widest text-amber-900 uppercase block">
                  GERAKAN PRAMUKA INDONESIA
                </span>
                <span className="text-[11px] text-amber-800 font-semibold block">
                  Kwartir Ranting · Ujian Kursus Mahir Dasar (KMD)
                </span>
              </div>
              <span className="text-4xl">🌿</span>
            </div>

            <div className="h-0.5 w-48 mx-auto bg-gradient-to-r from-transparent via-amber-600 to-transparent my-2"></div>

            <h1 className="font-heading text-2xl sm:text-4xl font-black text-amber-950 tracking-tight uppercase">
              PIAGAM PENGHARGAAN
            </h1>
            <p className="text-xs sm:text-sm font-bold text-emerald-800 tracking-wider uppercase">
              Tanda Kecakapan Khusus (TKK) Peduli Lingkungan & Pemilah Sampah
            </p>
          </div>

          {/* Recipient Text */}
          <div className="space-y-2 py-2">
            <p className="text-xs sm:text-sm text-slate-600">
              Dengan bangga diberikan kepada anggota Gerakan Pramuka:
            </p>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-950 underline decoration-amber-500 underline-offset-8">
              {studentName || 'Adik Pramuka'}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-amber-900">
              {scoutLevel} · {troopName} · {schoolName}
            </p>
          </div>

          {/* Merits description */}
          <div className="max-w-xl mx-auto text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2 bg-amber-50/60 p-4 rounded-xl border border-amber-200">
            <p>
              Telah berhasil menyelesaikan pembelajaran interaktif dan lulus uji kecakapan dalam 
              <strong> Memilah 5 Jenis Sampah (Organik, Anorganik, Kertas, B3, dan Residu)</strong> serta mengamalkan prinsip 3R demi menjaga kelestarian bumi sesuai amanat <strong>Dasa Darma Pramuka ke-2: Cinta alam dan kasih sayang sesama manusia</strong>.
            </p>
          </div>

          {/* Badges Earned Graphic */}
          <div className="flex items-center justify-center gap-6 py-2">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-3xl shadow-md border-2 border-amber-700">
                ♻️
              </div>
              <span className="text-[10px] font-black uppercase text-amber-900 mt-1">
                TKK Sampah
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-3xl shadow-md border-2 border-emerald-700">
                🌿
              </div>
              <span className="text-[10px] font-black uppercase text-emerald-900 mt-1">
                Lestari Alam
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-3xl shadow-md border-2 border-sky-700">
                ⚜️
              </div>
              <span className="text-[10px] font-black uppercase text-sky-900 mt-1">
                Siaga Teladan
              </span>
            </div>
          </div>

          {/* Signatures & Date */}
          <div className="pt-6 grid grid-cols-2 gap-8 text-xs sm:text-sm border-t border-amber-200/80">
            <div>
              <span className="text-slate-500 block">Ditetapkan pada:</span>
              <span className="font-semibold text-slate-800">{todayStr}</span>
              <div className="h-14 flex items-end justify-center">
                <span className="text-xs text-emerald-800 font-bold italic">
                  [ Terverifikasi Digital KMD ]
                </span>
              </div>
              <div className="w-36 mx-auto border-b border-slate-400"></div>
              <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                Pangkalan {schoolName}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block">Pembina Penguji KMD:</span>
              <span className="font-semibold text-slate-800">Gugus Depan Siaga</span>
              <div className="h-14 flex items-end justify-center">
                <span className="font-heading font-bold text-amber-900 text-sm italic">
                  {pembinaName}
                </span>
              </div>
              <div className="w-36 mx-auto border-b border-slate-400"></div>
              <span className="text-[11px] text-slate-600 font-medium mt-1 block">
                NTA / Pembina Mahir KMD
              </span>
            </div>
          </div>

          {/* Watermark Emblem */}
          <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none text-9xl">
            ⚜️
          </div>
        </div>
      </div>
    </div>
  );
};
