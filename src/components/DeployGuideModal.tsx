import React, { useState } from 'react';
import { X, Github, Download, ExternalLink, Check, Copy, Terminal, Rocket, CheckCircle2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = `git init
git add .
git commit -m "feat: Media Pembelajaran Pemilahan Sampah KMD Pramuka"
git branch -M main
git remote add origin https://github.com/USERNAME/pramuka-peduli-sampah.git
git push -u origin main`;

  const [downloading, setDownloading] = useState(false);

  const handleDownloadZip = async () => {
    playClickSound();
    setDownloading(true);
    try {
      const res = await fetch('/pramuka-peduli-sampah-source.zip');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pramuka-peduli-sampah-source.zip';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 200);
    } catch {
      window.location.href = '/pramuka-peduli-sampah-source.zip';
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl border border-amber-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-sm">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Panduan Upload & Hosting
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-black text-slate-900">
                Upload ke GitHub & Akses lewat Vercel
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

        {/* Option 1: 1-Click Download ZIP (Paling Mudah) */}
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-amber-950 flex items-center gap-2">
              <Download className="w-5 h-5 text-amber-700" />
              <span>Cara 1: Unduh Source Code (ZIP Langsung)</span>
            </h3>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              Paling Cepat
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kamu bisa langsung mengunduh seluruh source code website ini dalam 1 file ZIP lengkap yang sudah siap pakai dan terkonfigurasi untuk Vercel:
          </p>

          <button
            onClick={handleDownloadZip}
            disabled={downloading}
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-101 active:scale-99 disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-amber-300" />
            <span>{downloading ? 'Mengunduh File...' : 'Unduh File Source Code (.ZIP)'}</span>
          </button>
        </div>

        {/* Option 2: Push via Git Terminal */}
        <div className="space-y-3">
          <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-slate-700" />
            <span>Cara 2: Upload via Git Terminal ke GitHub</span>
          </h3>

          <ol className="text-xs sm:text-sm text-slate-700 space-y-2 list-decimal list-inside leading-relaxed">
            <li>
              Buka <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-amber-800 font-bold underline inline-flex items-center gap-1">GitHub New Repository <ExternalLink className="w-3 h-3" /></a> dan buat repo baru bernama <code>pramuka-peduli-sampah</code>.
            </li>
            <li>
              Buka terminal di folder proyek yang sudah kamu ekstrak, lalu jalankan perintah berikut:
            </li>
          </ol>

          <div className="relative rounded-2xl bg-slate-950 text-slate-100 p-4 font-mono text-xs overflow-x-auto">
            <button
              onClick={() => copyToClipboard(gitCommands, 1)}
              className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition-colors"
              title="Salin Perintah Git"
            >
              {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedIndex === 1 ? 'Tersalin!' : 'Salin'}</span>
            </button>
            <pre className="text-emerald-400">
{gitCommands}
            </pre>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            *Ganti <code>USERNAME</code> dengan username akun GitHub kamu.
          </p>
        </div>

        {/* Step 3: Deploy to Vercel */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 className="font-heading font-bold text-base text-slate-900 flex items-center gap-2">
            <Rocket className="w-5 h-5 text-indigo-600" />
            <span>Langkah Menghubungkan ke Vercel</span>
          </h3>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center shrink-0">1</span>
              <p>Buka <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-indigo-700 font-bold underline inline-flex items-center gap-0.5">vercel.com <ExternalLink className="w-3 h-3" /></a> dan klik <strong>"Sign In with GitHub"</strong>.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center shrink-0">2</span>
              <p>Klik tombol <strong>"Add New..." ➜ "Project"</strong>.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center shrink-0">3</span>
              <p>Pilih repository <strong>pramuka-peduli-sampah</strong> dari daftar repository GitHub kamu.</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center shrink-0">4</span>
              <p>Klik tombol <strong>"Deploy"</strong>! File <code>vercel.json</code> sudah otomatis disertakan sehingga website langsung aktif tanpa perlu konfigurasi tambahan.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 flex items-center justify-between border-t border-amber-100">
          <span className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>File vercel.json & README.md sudah siap di dalam proyek</span>
          </span>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
