import React from 'react';
import { X, BookOpen, Award, FileText, CheckCircle2, Shield, Users, Target, Music } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface KmdGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KmdGuideModal: React.FC<KmdGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-amber-200 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-800 text-amber-200 flex items-center justify-center text-2xl shadow-sm">
              ⚜️
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Dokumen Portofolio Ujian KMD Pramuka
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-amber-950">
                Panduan Modul Ajar & Rubrik Penilai KMD
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Latar Belakang & Landasan Kepramukaan */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-700" />
            <span>1. Latar Belakang & Landasan Teori Kepramukaan</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70">
            Pendidikan kepramukaan menanamkan karakter peduli lingkungan sejak dini. Dalam <strong>Dasa Darma Pramuka ke-2: "Cinta alam dan kasih sayang sesama manusia"</strong>, 
            peserta didik dituntut tidak hanya berteori, namun memiliki kecakapan praktis (life skills) dalam mengelola sampah. Media interaktif ini dirancang dengan pendekatan 
            <strong> Belajar Sambil Melakukan (Learning by Doing)</strong> agar anak usia Sekolah Dasar (Pramuka Siaga & Penggalang) dapat membedakan 5 jenis sampah secara visual, audio, dan kinestetik.
          </p>
        </div>

        {/* Section 2: Pemetaan Kurikulum & Syarat Kecakapan (SKU / SKK) */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>2. Keterkaitan dengan Syarat Kecakapan (SKU & SKK)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-amber-900 block font-heading font-bold">Pramuka Siaga (Usia 7-10 Th):</strong>
              <p className="text-slate-600">
                • SKU Siaga Bantu: Dapat memelihara kebersihan lingkungan sekolah dan perindukan.<br />
                • Tanda Kecakapan Khusus (TKK) Pengatur Rumah / Kebersihan Lingkungan tingkat Purwa.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-amber-900 block font-heading font-bold">Pramuka Penggalang (Usia 11-15 Th):</strong>
              <p className="text-slate-600">
                • SKU Penggalang Ramu: Memahami pengelolaan sampah mandiri dan bahaya polusi plastik.<br />
                • TKK Daur Ulang & Pengelola Sampah (Bank Sampah Gugus Depan).
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Rencana Pelaksanaan Kegiatan (RPK/RPP Singkat) */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-700" />
            <span>3. Rencana Pelaksanaan Kegiatan (RPK) / Skenario Pembelajaran</span>
          </h3>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tahap 1 (10 Menit):</span>
              <p>Pembukaan dengan <em>Tepuk Pramuka</em> dan pengenalan 5 Karakter Tong Sampah (Jelajah Tong Sampah).</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tahap 2 (20 Menit):</span>
              <p>Simulasi interaktif kelompok melalui <em>Game Pilah Kilat</em> (Level 1 Mula hingga Level 3 Tata).</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tahap 3 (20 Menit):</span>
              <p>Praktik nyata membuat karya 3R di menu <em>Bengkel Kreasi Daur Ulang</em> (Botol plastik jadi pot hias).</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tahap 4 (20 Menit):</span>
              <p>Evaluasi mandiri dengan <em>Kuis Uji Kecakapan</em> dan penerbitan <em>Piagam TKK Digital</em>.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Ice Breaking Kepramukaan (Lirik Lagu & Tepuk) */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <Music className="w-4 h-4 text-rose-700" />
            <span>4. Ice Breaking: Yel-Yel & Tepuk Sampah Sehat</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <div>
              <strong className="text-amber-900 block font-heading mb-1">👏 Tepuk Sampah Sehat:</strong>
              <p className="text-slate-700 italic leading-relaxed">
                (Prok prok prok) Sampah Hijau... Organik!<br />
                (Prok prok prok) Sampah Kuning... Anorganik!<br />
                (Prok prok prok) Sampah Merah... B3 Beracun!<br />
                (Prok prok prok) Jangan Buang Sembarangan... SEHAT BERSERI!
              </p>
            </div>
            <div>
              <strong className="text-amber-900 block font-heading mb-1">🎵 Nada Lagu: "Kalau Kau Suka Hati"</strong>
              <p className="text-slate-700 italic leading-relaxed">
                Kalau kau cinta alam pilah sampah (Bisa!)<br />
                Kalau kau pramuka sejati pilah sampah (Pasti!)<br />
                Tong hijau sisa makan, tong kuning plastik kaleng,<br />
                Bumi kita pun asri dan lestari!
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Rubrik Penilaian Penguji KMD */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-700" />
            <span>5. Rubrik Penilaian Kelulusan KMD</span>
          </h3>
          <table className="w-full text-xs text-left border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-amber-100 text-amber-950 font-bold">
              <tr>
                <th className="p-2.5">Aspek Penilaian</th>
                <th className="p-2.5">Indikator Ketercapaian</th>
                <th className="p-2.5">Bobot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">Kognitif (Pengetahuan)</td>
                <td className="p-2.5 text-slate-600">Nilai kuis pemahaman &gt;= 70 poin</td>
                <td className="p-2.5 font-bold text-amber-900">30%</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">Psikomotorik (Keterampilan)</td>
                <td className="p-2.5 text-slate-600">Ketepatan menyortir pada Game Pilah Kilat level 1-3</td>
                <td className="p-2.5 font-bold text-amber-900">40%</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">Afektif (Sikap Pramuka)</td>
                <td className="p-2.5 text-slate-600">Praktik nyata 3R dan gotong royong membersihkan tenda</td>
                <td className="p-2.5 font-bold text-amber-900">30%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Close Button */}
        <div className="pt-4 flex justify-end border-t border-amber-100">
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs shadow-md transition-all"
          >
            Tutup Panduan KMD
          </button>
        </div>
      </div>
    </div>
  );
};
