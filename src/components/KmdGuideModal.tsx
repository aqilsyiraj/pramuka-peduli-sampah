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
                Dokumen Portofolio Ujian KMD Pramuka Penggalang
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
            <span>1. Latar Belakang & Landasan Teori Kepramukaan Penggalang</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70">
            Pendidikan kepramukaan golongan Penggalang (usia 11-15 tahun) menanamkan jiwa kepemimpinan regu, kemandirian, dan kepedulian lingkungan. 
            Berdasarkan <strong>Trisatya dan Dasa Darma Pramuka ke-2: "Cinta alam dan kasih sayang sesama manusia"</strong>, 
            anggota Penggalang dituntut memiliki kecakapan hidup praktis (life skills) dalam memilah dan mengelola sampah di pangkalan serta bumi perkemahan. 
            Media interaktif ini dirancang dengan metode kepramukaan <strong>Belajar Sambil Melakukan (Learning by Doing)</strong> dan sistem beregu agar penggalang dapat mempraktikkan pemilahan 5 jenis sampah.
          </p>
        </div>

        {/* Section 2: Pemetaan Kurikulum & Syarat Kecakapan (SKU / SKK) Penggalang */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-700" />
            <span>2. Keterkaitan dengan Syarat Kecakapan Penggalang (SKU & SKK)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-amber-900 block font-heading font-bold">SKU Penggalang Ramu & Rakit:</strong>
              <p className="text-slate-600">
                • SKU Ramu: Dapat menjaga kebersihan lingkungan pangkalan dan memilah sampah basah/kering.<br />
                • SKU Rakit: Memahami bahaya pencemaran lingkungan akibat plastik dan zat B3 bagi tanah dan air.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-amber-900 block font-heading font-bold">SKU Penggalang Terap & SKK/TKK:</strong>
              <p className="text-slate-600">
                • SKU Terap: Mampu memimpin regu dalam kerja bakti pelestarian alam dan daur ulang 3R.<br />
                • TKK Pengatur Kebersihan Lingkungan, TKK Juru Daur Ulang, dan TKK Berkemah.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Rencana Pelaksanaan Kegiatan (RPK/RPP Singkat) */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-700" />
            <span>3. Rencana Pelaksanaan Kegiatan (RPK) Pasukan Penggalang</span>
          </h3>
          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tahap 1 (10 Menit):</span>
              <p>Pembukaan latihan pasukan dengan <em>Tepuk Pramuka</em> dan orientasi 5 Karakter Tong Sampah (Jelajah Tong Sampah).</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tahap 2 (20 Menit):</span>
              <p>Simulasi ketangkasan beregu melalui <em>Game Pilah Kilat Penggalang</em> (Level 1 Ramu, Level 2 Rakit, Level 3 Terap).</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tahap 3 (20 Menit):</span>
              <p>Praktik nyata keterampilan regu membuat karya daur ulang 3R di <em>Bengkel Kreasi Daur Ulang</em> (Pot botol, celengan regu, ecobrick).</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/50 flex items-start gap-2">
              <span className="font-bold text-amber-800 shrink-0">Tahap 4 (20 Menit):</span>
              <p>Evaluasi mandiri dengan <em>Kuis Uji Kecakapan Penggalang</em> dan penerbitan <em>Piagam TKK Digital</em>.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Ice Breaking Kepramukaan (Lirik Lagu & Tepuk) */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <Music className="w-4 h-4 text-rose-700" />
            <span>4. Ice Breaking: Yel-Yel & Tepuk Sampah Sehat Penggalang</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-amber-50 p-4 rounded-2xl border border-amber-200">
            <div>
              <strong className="text-amber-900 block font-heading mb-1">👏 Tepuk Sampah Sehat Penggalang:</strong>
              <p className="text-slate-700 italic leading-relaxed">
                (Prok prok prok) Sampah Hijau... Organik!<br />
                (Prok prok prok) Sampah Kuning... Anorganik!<br />
                (Prok prok prok) Sampah Biru... Kertas Bersih!<br />
                (Prok prok prok) Sampah Merah... B3 Waspada!<br />
                (Prok prok prok) Penggalang Tangguh... BUMI LESTARI!
              </p>
            </div>
            <div>
              <strong className="text-amber-900 block font-heading mb-1">🎵 Yel-Yel Semangat Regu Penggalang:</strong>
              <p className="text-slate-700 italic leading-relaxed">
                Siapa kita? Pasukan Penggalang!<br />
                Apa tugas kita? Cinta Alam dan Kasih Sayang!<br />
                Pilah sampah sekarang, jaga bumi lestari!<br />
                Salam Pramuka! JAYA! JAYA! JAYA!
              </p>
            </div>
          </div>
        </div>

        {/* Section 5: Rubrik Penilaian Penguji KMD */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-700" />
            <span>5. Rubrik Penilaian Kelulusan KMD Penggalang</span>
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
                <td className="p-2.5 text-slate-600">Nilai kuis kecakapan pemilahan &ge; 70 poin</td>
                <td className="p-2.5 font-bold text-amber-900">30%</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">Psikomotorik (Keterampilan)</td>
                <td className="p-2.5 text-slate-600">Ketepatan menyortir pada Game Pilah Kilat (Ramu, Rakit, Terap)</td>
                <td className="p-2.5 font-bold text-amber-900">40%</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-slate-800">Afektif (Sikap Pramuka)</td>
                <td className="p-2.5 text-slate-600">Kepemimpinan regu, kepedulian lingkungan perkemahan, dan amalan Dasa Darma</td>
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
