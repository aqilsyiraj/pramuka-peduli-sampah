# ⚜️ Pramuka Peduli Sampah — Media Pembelajaran Interaktif KMD

Media pembelajaran interaktif berbasis web yang menjelaskan tentang **Pemilahan Sampah** untuk siswa Sekolah Dasar (Pramuka Siaga & Penggalang) dalam rangka **Tugas Ujian Kursus Mahir Dasar (KMD) Gerakan Pramuka Indonesia**.

---

## 🌟 Fitur Utama

1. **Jelajah 5 Tong Sampah Ramah Lingkungan**:
   - 🟢 **Tong Hijau (Organik)**: Sisa makanan, sayuran, daun gugur, diolah menjadi kompos & biopori.
   - 🟡 **Tong Kuning (Anorganik)**: Botol plastik, kaleng kaleng, kresek untuk daur ulang 3R & Bank Sampah.
   - 🔵 **Tong Biru (Kertas)**: Kardus, koran, kertas HVS bersih untuk daur ulang bubur kertas.
   - 🔴 **Tong Merah (B3)**: Baterai bekas, bohlam lampu, aerosol, obat basi beracun.
   - ⚪ **Tong Abu-Abu (Residu)**: Tisu kotor, popok, styrofoam berminyak langsung ke TPA.
   - 🔊 **Fitur Audio Narator Bahasa Indonesia**: Ramah anak kelas 1-2 SD yang sedang belajar membaca.
   - 📊 **Infografis Waktu Terurai**: Simulasi waktu hancur sampah di bumi.

2. **Game Edukasi "Pilah Kilat Pramuka"**:
   - 3 Level berjenjang (Siaga Mula, Siaga Bantu, Siaga Tata).
   - Efek suara synthesizer Web Audio API, sistem nyawa (3 hati), kombo streak api, dan konfeti perayaan.

3. **Bengkel Kreasi Daur Ulang 3R (Prakarya Pramuka)**:
   - Pot botol gantung, celengan kaleng siaga, tempat pensil regu kardus, dan ecobrick siaga.

4. **Kuis Uji Kecakapan Pramuka**:
   - 10 Soal skenario perkemahan Persami dan nilai Dasa Darma Pramuka (Target lulus $\ge 70$).

5. **Generator Piagam Penghargaan & Lencana TKK Digital**:
   - Siap cetak dan simpan PDF dengan nama siswa, nama pangkalan sekolah, barung/regu, dan tanda tangan penguji KMD.

6. **Modul Penguji KMD & RPK**:
   - Dokumen RPK/RPP (2 x 35 Menit), pemetaan SKU/SKK, rubrik penilaian penguji, serta yel-yel Tepuk Sampah Sehat.

---

## 🚀 Cara Menjalankan Secara Lokal

```bash
# 1. Clone repository
git clone https://github.com/USERNAME/pramuka-peduli-sampah.git

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
4. Vercel akan otomatis mendeteksi framework **Vite**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Klik **"Deploy"**. Dalam hitungan detik website interaktifmu sudah online di domain `https://namaprojekmu.vercel.app`!

---

## 📜 Nilai Karakter Kepramukaan

- **Dasa Darma ke-2**: *Cinta alam dan kasih sayang sesama manusia.*
- **Dasa Darma ke-5**: *Rela menolong dan tabah.*
- **Dasa Darma ke-7**: *Hemat, cermat, dan bersahaja.*
- **Dasa Darma ke-10**: *Suci dalam pikiran, perkataan, dan perbuatan.*
