# ⚜️ Pramuka Penggalang Peduli Sampah — Media Pembelajaran Interaktif KMD

Media pembelajaran interaktif berbasis web yang menjelaskan tentang **Pemilahan Sampah** khusus untuk **Pasukan Pramuka Penggalang (Tingkat Ramu, Rakit, dan Terap)** dalam rangka **Tugas Ujian Kursus Mahir Dasar (KMD) Gerakan Pramuka Indonesia**.

---

## 🌟 Fitur Utama

1. **Jelajah 5 Tong Sampah Ramah Lingkungan**:
   - 🟢 **Tong Hijau (Organik)**: Sisa makanan, sayuran, daun gugur, diolah menjadi kompos & biopori pangkalan.
   - 🟡 **Tong Kuning (Anorganik)**: Botol plastik, kaleng soda, kresek untuk daur ulang 3R & Bank Sampah regu.
   - 🔵 **Tong Biru (Kertas)**: Kardus, koran, kertas HVS bersih untuk daur ulang bubur kertas.
   - 🔴 **Tong Merah (B3)**: Baterai bekas senter kemah, bohlam lampu, aerosol, obat basi beracun.
   - ⚪ **Tong Abu-Abu (Residu)**: Tisu kotor, popok, styrofoam berminyak langsung ke TPA.
   - 🔊 **Fitur Audio Narator Bahasa Indonesia**: Membantu penjelasan suara interaktif.
   - 📊 **Infografis Waktu Terurai**: Simulasi waktu hancur sampah di alam (1 minggu vs 450 tahun vs 1 juta tahun).

2. **Game Edukasi "Pilah Kilat Penggalang"**:
   - 3 Level berjenjang kepramukaan: **Level 1 (Penggalang Ramu)**, **Level 2 (Penggalang Rakit)**, dan **Level 3 (Penggalang Terap)**.
   - Efek suara synthesizer Web Audio API, sistem nyawa (3 hati), kombo streak api, dan konfeti perayaan kelulusan misi.

3. **Bengkel Kreasi Daur Ulang 3R (Prakarya Regu Penggalang)**:
   - Pot botol gantung pangkalan, celengan kas regu hemat kaleng biskuit, tempat alat tulis sekretariat regu dari kardus, dan ecobrick bivak penggalang.

4. **Kuis Uji Kecakapan Penggalang**:
   - 10 Soal skenario perkemahan Persami dan nilai Trisatya serta Dasa Darma Pramuka (Target lulus $\ge 70$).

5. **Generator Piagam Penghargaan & Lencana TKK Digital**:
   - Siap cetak dan simpan PDF dengan nama penggalang, nama pangkalan gugus depan, nama regu (Regu Rajawali/Melati), tingkatan (Ramu/Rakit/Terap), dan tanda tangan penguji KMD.

6. **Modul Penguji KMD & RPK**:
   - Dokumen RPK/RPP (2 x 35 Menit), pemetaan SKU & SKK Penggalang, rubrik penilaian penguji (Kognitif 30%, Psikomotorik 40%, Afektif 30%), serta yel-yel Tepuk Sampah Sehat Penggalang.

---

## 🚀 Cara Menjalankan Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/aqilsyiraj/pramuka-peduli-sampah.git

# 2. Masuk ke direktori
cd pramuka-peduli-sampah

# 3. Pasang dependensi
npm install

# 4. Jalankan server lokal
npm run dev
```

Buka peramban di `http://localhost:3000` atau `http://localhost:5173`.

---

## ⚡ Cara Deploy ke Vercel

1. Buka [Vercel](https://vercel.com/) dan masuk menggunakan akun GitHub kamu.
2. Klik tombol **"Add New..."** ➜ **"Project"**.
3. Pilih repository `pramuka-peduli-sampah`.
4. Vercel otomatis mendeteksi framework **Vite** dan file `vercel.json`:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **"Deploy"**. Website langsung aktif secara online!

---

## 📜 Nilai Karakter Kepramukaan Penggalang

- **Trisatya**: *Menjalankan kewajibanku terhadap Tuhan, Negara Kesatuan Republik Indonesia dan mengamalkan Pancasila.*
- **Dasa Darma ke-2**: *Cinta alam dan kasih sayang sesama manusia.*
- **Dasa Darma ke-5**: *Rela menolong dan tabah.*
- **Dasa Darma ke-7**: *Hemat, cermat, dan bersahaja.*
- **Dasa Darma ke-10**: *Suci dalam pikiran, perkataan, dan perbuatan.*
