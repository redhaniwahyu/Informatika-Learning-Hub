/* ==========================================================================
   Informatika Learning Hub — Interactive Engine (Materi, Video, Quiz, Leaderboard, Reward)
   ========================================================================== */

// Tempelkan URL Web App Google Apps Script Anda di sini (atau atur langsung lewat tombol "Setup Database Spreadsheet" di halaman Quiz):
let GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxtaU8Z08nxvBCZUQ0rGEV6SI-Uh0QOxIRUniFadTVXOLMsMQuNlYFkYIT6-0Y-WDTK/exec';

const DEFAULT_LEADERBOARD = [
  { timestamp: '31/10/2026 09:15', nama: 'Muhammad Rizky Pratama', kelas: 'X-B DKV', bab: 'Semua Bab (3 Materi)', skor: 95, poin: 1450, reward: 'Sertifikat Master Informatika' },
  { timestamp: '31/10/2026 09:18', nama: 'Siti نورhaliza Azzahra', kelas: 'X-B DKV', bab: 'Bab 3: Data, Informasi, & Validasi', skor: 90, poin: 1320, reward: 'Badge Master Data Banjar' },
  { timestamp: '31/10/2026 09:22', nama: 'Ahmad Fauzan Ramadhan', kelas: 'X-C DKV', bab: 'Semua Bab (3 Materi)', skor: 90, poin: 1280, reward: 'E-Modul Cheat Sheet Excel' },
  { timestamp: '31/10/2026 09:25', nama: 'Nabila Putri Banjari', kelas: 'X-B DKV', bab: 'Bab 1: Sistem Komputer', skor: 85, poin: 1150, reward: 'Badge Arsitek CPU' },
  { timestamp: '31/10/2026 09:30', nama: 'Dimas Arya Saputra', kelas: 'X-C DKV', bab: 'Bab 2: Teknologi Informasi & Komunikasi', skor: 85, poin: 1100, reward: '-' },
  { timestamp: '31/10/2026 09:34', nama: 'Aulia Rahmah', kelas: 'X-B DKV', bab: 'Bab 3: Data, Informasi, & Validasi', skor: 80, poin: 980, reward: '-' }
];

const QUIZ_QUESTIONS = [
  // BAB 1: SISTEM KOMPUTER (5 Soal)
  {
    id: 1,
    bab: 'bab1',
    babLabel: 'Bab 1: Sistem Komputer',
    q: 'Di dalam prosesor (CPU), komponen manakah yang bertugas melakukan perhitungan aritmatika (penjumlahan, pengurangan) dan perbandingan logika (AND, OR, NOT)?',
    options: [
      'Control Unit (CU)',
      'Arithmetic Logic Unit (ALU)',
      'Random Access Memory (RAM)',
      'Read Only Memory (ROM)'
    ],
    answer: 1,
    explain: 'ALU (Arithmetic Logic Unit) adalah bagian CPU yang mengeksekusi operasi aritmatika dan logika, sedangkan Control Unit (CU) mengatur kendali aliran instruksi.'
  },
  {
    id: 2,
    bab: 'bab1',
    babLabel: 'Bab 1: Sistem Komputer',
    q: 'Urutan siklus pemrosesan instruksi yang benar di dalam Central Processing Unit (CPU) adalah...',
    options: [
      'Fetch (Ambil) → Decode (Terjemahkan) → Execute (Jalankan)',
      'Execute (Jalankan) → Fetch (Ambil) → Store (Simpan)',
      'Decode (Terjemahkan) → Input → Output',
      'Booting → Compiling → Rendering'
    ],
    answer: 0,
    explain: 'Siklus mesin CPU selalu dimulai dengan Fetch (mengambil instruksi dari RAM), Decode (CU menerjemahkan instruksi), lalu Execute (ALU mengeksekusi instruksi).'
  },
  {
    id: 3,
    bab: 'bab1',
    babLabel: 'Bab 1: Sistem Komputer',
    q: 'Mengapa memori RAM (Random Access Memory) disebut sebagai memori yang bersifat volatile?',
    options: [
      'Karena kapasitasnya tidak dapat ditambah',
      'Karena datanya tersimpan permanen meskipun listrik padam',
      'Karena seluruh data di dalamnya akan hilang ketika komputer dimatikan / arus listrik terputus',
      'Karena hanya bisa dibaca oleh BIOS saat komputer menyala'
    ],
    answer: 2,
    explain: 'Volatile berarti membutuhkan daya listrik terus-menerus untuk mempertahankan data. Saat PC dimatikan, isi RAM dikosongkan.'
  },
  {
    id: 4,
    bab: 'bab1',
    babLabel: 'Bab 1: Sistem Komputer',
    q: 'Saat siswa kelas X DKV menggunakan aplikasi desain grafis dan pengolahan angka secara bersamaan, perangkat lunak yang bertugas mengatur pembagian memori dan perangkat keras adalah...',
    options: [
      'Perangkat Lunak Aplikasi (Application Software)',
      'Sistem Operasi (Operating System seperti Windows, Linux, macOS)',
      'Power Supply Unit (PSU)',
      'Video Graphic Array (VGA)'
    ],
    answer: 1,
    explain: 'Sistem Operasi (OS) adalah perangkat lunak sistem yang mengelola sumber daya hardware (CPU, RAM, I/O) dan menjadi jembatan bagi aplikasi.'
  },
  {
    id: 5,
    bab: 'bab1',
    babLabel: 'Bab 1: Sistem Komputer',
    q: 'Jika bilangan biner 10110 dikonversikan ke dalam bilangan desimal (basis 10), berapakah nilainya?',
    options: [
      '18',
      '20',
      '22',
      '26'
    ],
    answer: 2,
    explain: '10110₂ = (1×16) + (0×8) + (1×4) + (1×2) + (0×1) = 16 + 0 + 4 + 2 + 0 = 22₁₀.'
  },

  // BAB 2: TEKNOLOGI INFORMASI DAN KOMUNIKASI (5 Soal)
  {
    id: 6,
    bab: 'bab2',
    babLabel: 'Bab 2: Teknologi Informasi & Komunikasi',
    q: 'Pada studi kasus analisis data tinggi muka air Waduk Riam Kanan di sel C2 sampai C13 pada aplikasi spreadsheet, formula apakah yang tepat untuk mencari rata-rata elevasi air?',
    options: [
      '=SUM(C2:C13)',
      '=AVERAGE(C2:C13)',
      '=MAX(C2:C13)',
      '=COUNT(C2:C13)'
    ],
    answer: 1,
    explain: 'Fungsi =AVERAGE(range) digunakan untuk menghitung nilai rata-rata aritmatika dari sekumpulan sel numerik.'
  },
  {
    id: 7,
    bab: 'bab2',
    babLabel: 'Bab 2: Teknologi Informasi & Komunikasi',
    q: 'Saat menyusun laporan praktikum di aplikasi pengolah kata (Word) agar grafik dari Excel otomatis ikut berubah ketika data di Excel diperbarui, teknik integrasi yang digunakan adalah...',
    options: [
      'Copy → Paste Picture (Gambar Statis)',
      'Screenshot Layar Monitor',
      'Paste Special → Paste Link (Object Linking & Embedding / OLE)',
      'Save As PDF'
    ],
    answer: 2,
    explain: 'Fitur Paste Link (OLE) menghubungkan objek grafik di Word langsung ke sumber datanya di Excel secara dinamis.'
  },
  {
    id: 8,
    bab: 'bab2',
    babLabel: 'Bab 2: Teknologi Informasi & Komunikasi',
    q: 'Untuk membuat surat keterangan atau sertifikat untuk 35 siswa kelas X-B DKV secara otomatis hanya dengan satu template dokumen Word dan satu tabel data Excel, fitur yang paling efisien adalah...',
    options: [
      'Mail Merge (Surat Massal)',
      'Track Changes',
      'Table of Contents (Daftar Isi)',
      'Page Break'
    ],
    answer: 0,
    explain: 'Mail Merge mengintegrasikan dokumen utama (Word) dengan sumber data (Excel) untuk menghasilkan puluhan dokumen personal secara otomatis.'
  },
  {
    id: 9,
    bab: 'bab2',
    babLabel: 'Bab 2: Teknologi Informasi & Komunikasi',
    q: 'Mengapa rumus =SUM(B2:B10) menghasilkan pesan error #VALUE! ketika kita mencoba menjumlahkan data pada sebuah tabel?',
    options: [
      'Karena kolom tabel kurang lebar',
      'Karena terdapat sel yang berisi teks/karakter non-angka yang dipaksa dihitung dengan operator aritmatika langsung (misal B2+B3)',
      'Karena rumus diketik dengan huruf kapital',
      'Karena file belum disimpan ke Google Drive'
    ],
    answer: 1,
    explain: 'Pesan #VALUE! muncul ketika tipe data yang dimasukkan ke dalam operasi matematika tidak sesuai (misal teks huruf "75 cm" dijumlahkan dengan operator +).'
  },
  {
    id: 10,
    bab: 'bab2',
    babLabel: 'Bab 2: Teknologi Informasi & Komunikasi',
    q: 'Jenis grafik (chart) manakah yang paling tepat dipilih oleh siswa DKV untuk memvisualisasikan tren perubahan debit air Waduk Riam Kanan dari bulan Januari hingga Desember?',
    options: [
      'Pie Chart (Diagram Lingkaran)',
      'Line Chart (Grafik Garis)',
      'Scatter Plot',
      'Hierarchy SmartArt'
    ],
    answer: 1,
    explain: 'Line Chart (Grafik Garis) sangat efektif menampilkan tren perubahan data secara kontinu dari waktu ke waktu (time-series).'
  },

  // BAB 3: DATA, INFORMASI, DAN VALIDASINYA (5 Soal)
  {
    id: 11,
    bab: 'bab3',
    babLabel: 'Bab 3: Data, Informasi, & Validasinya',
    q: 'Manakah pernyataan berikut yang paling tepat menjelaskan perbedaan mendasar antara Data dan Informasi?',
    options: [
      'Data dan informasi adalah dua hal yang sama persis tanpa perbedaan',
      'Data adalah fakta mentah yang belum terolah, sedangkan Informasi adalah hasil pengolahan data yang memiliki konteks dan makna untuk pengambilan keputusan',
      'Informasi adalah angka acak, sedangkan data adalah laporan akhir kepala sekolah',
      'Data hanya berupa teks, sedangkan informasi hanya berupa video'
    ],
    answer: 1,
    explain: 'Contoh: angka "83.3" adalah data mentah; kalimat "Rata-rata nilai Post-Test kelas X-B DKV adalah 83,3 (Tuntas 100%)" adalah informasi bermakna.'
  },
  {
    id: 12,
    bab: 'bab3',
    babLabel: 'Bab 3: Data, Informasi, & Validasinya',
    q: 'Pada formulir input nilai ujian siswa (skala 0 sampai 100), sistem menolak input angka "125" atau "-10". Jenis validasi data apakah yang bekerja pada kasus tersebut?',
    options: [
      'Format Check (Validasi Format)',
      'Presence Check (Validasi Keberadaan)',
      'Range Check (Validasi Rentang Nilai)',
      'Length Check (Validasi Panjang Karakter)'
    ],
    answer: 2,
    explain: 'Range Check memastikan nilai numerik yang dimasukkan berada di dalam batas minimum (0) dan maksimum (100) yang logis.'
  },
  {
    id: 13,
    bab: 'bab3',
    babLabel: 'Bab 3: Data, Informasi, & Validasinya',
    q: 'Ketika siswa mengisi kolom NISN atau NIM (misal 2530111713968), sistem menolak jika ada huruf yang diketikkan. Pemeriksaan ini disebut...',
    options: [
      'Type Check (Validasi Tipe Data)',
      'Consistency Check (Validasi Konsistensi)',
      'Spelling Check',
      ' Duplication Check'
    ],
    answer: 0,
    explain: 'Type Check memastikan input sesuai dengan tipe data yang ditetapkan (misalnya hanya angka/integer, bukan huruf/string).'
  },
  {
    id: 14,
    bab: 'bab3',
    babLabel: 'Bab 3: Data, Informasi, & Validasinya',
    q: 'Seorang siswa mengisi "Tanggal Lulus SMK: 20 Mei 2024", padahal "Tanggal Masuk SMK: 15 Juli 2025". Sistem mendeteksi ketidakwajaran hubungan antar-dua kolom tersebut. Ini adalah contoh...',
    options: [
      'Presence Check',
      'Consistency Check (Validasi Konsistensi Logis Antar-Data)',
      'Type Check',
      'Character Check'
    ],
    answer: 1,
    explain: 'Consistency Check memeriksa apakah dua atau lebih data yang saling berhubungan tidak saling bertentangan secara logika.'
  },
  {
    id: 15,
    bab: 'bab3',
    babLabel: 'Bab 3: Data, Informasi, & Validasinya',
    q: 'Mengapa prinsip "Garbage In, Garbage Out" (GIGO) sangat penting diperhatikan dalam pengolahan data Informatika?',
    options: [
      'Karena komputer dapat memperbaiki sendiri semua data yang salah ketik tanpa validasi',
      'Karena jika data mentah yang diinput tidak valid/keliru, maka informasi atau kesimpulan yang dihasilkan pasti ikut keliru',
      'Karena kapasitas tempat sampah komputer (Recycle Bin) terbatas',
      'Karena validasi data hanya diperlukan saat komputer terhubung ke internet'
    ],
    answer: 1,
    explain: 'Prinsip GIGO menegaskan bahwa kualitas informasi keluaran sangat bergantung pada keabsahan (validitas) data masukan.'
  }
];

const REWARD_CATALOG = [
  {
    id: 'cert-kompetensi',
    title: 'Sertifikat Digital Kompetensi Informatika',
    cost: 300,
    badge: '📄 Sertifikat Resmi',
    desc: 'Sertifikat digital bertuliskan Nama & Kelas Anda yang dapat langsung diunduh dan dicetak sebagai bukti ketuntasan 3 Bab Informatika.',
    icon: '🏅'
  },
  {
    id: 'badge-banjar',
    title: 'Badge Eksklusif "Master Data Lahan Basah"',
    cost: 200,
    badge: '🛡️ Gelar Leaderboard',
    desc: 'Menambahkan gelar kehormatan dan lencana khusus di samping nama Anda pada papan Leaderboard kelas.',
    icon: '💎'
  },
  {
    id: 'modul-cheatsheet',
    title: 'E-Modul Cheat Sheet Rumus Excel & Validasi Data',
    cost: 150,
    badge: '📘 Ringkasan Praktikum',
    desc: 'Kartu panduan cepat berisi kumpulan rumus spreadsheet (SUM, AVERAGE, IF, VLOOKUP) dan aturan Data Validation untuk praktikum lab.',
    icon: '⚡'
  },
  {
    id: 'voucher-praktikum',
    title: 'Voucher +10 Poin Bonus Tugas Praktikum Lab',
    cost: 400,
    badge: '🎁 Kode Klaim Guru',
    desc: 'Kode unik terverifikasi yang dapat ditunjukkan kepada Pak Akhmad Wahyu Redhani saat sesi praktikum di Lab Komputer SMKN 1 Banjarmasin.',
    icon: '🎟️'
  }
];

// State Pengguna & Quiz
let userState = {
  nama: '',
  kelas: 'X-B DKV',
  poin: 250,
  claimedRewards: [],
  badgeTitle: ''
};

let quizSession = {
  active: false,
  babFilter: 'all',
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  streak: 0,
  earnedXp: 0,
  answeredCurrent: false
};

function initHubState() {
  try {
    const savedTheme = localStorage.getItem('hub_theme_mode');
    if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    const savedUser = localStorage.getItem('hub_user_state');
    if (savedUser) {
      userState = Object.assign(userState, JSON.parse(savedUser));
    }
    const savedUrl = localStorage.getItem('hub_gas_url');
    if (savedUrl) GAS_WEB_APP_URL = savedUrl;
  } catch (e) {}
  updateThemeUI();
  updatePointsUI();
  renderRewardsGrid();
  loadLeaderboardData();
}

function saveUserState() {
  try {
    localStorage.setItem('hub_user_state', JSON.stringify(userState));
  } catch (e) {}
  updatePointsUI();
}

function toggleHubTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  try {
    localStorage.setItem('hub_theme_mode', isDark ? 'dark' : 'light');
  } catch (e) {}
  updateThemeUI();
}

function updateThemeUI() {
  const isDark = document.documentElement.classList.contains('dark');
  const icon = document.getElementById('hub-theme-icon');
  const txt = document.getElementById('hub-theme-text');
  if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  if (txt) txt.textContent = isDark ? 'Light' : 'Dark';
}

function updatePointsUI() {
  document.querySelectorAll('.user-xp-display').forEach(el => {
    el.textContent = userState.poin + ' XP';
  });
  const nameBadge = document.getElementById('active-student-label');
  if (nameBadge) {
    nameBadge.textContent = userState.nama ? `${userState.nama} (${userState.kelas})` : 'Belum Login Siswa';
  }
}

function toggleHubMobileNav() {
  const m = document.getElementById('hub-mobile-drawer');
  if (m) m.classList.toggle('hidden');
}

// ============================================================================
// HALAMAN 2: MATERI INFORMATIKA (TAB SWITCHER & SIMULATOR INTERAKTIF)
// ============================================================================
function selectBabMateri(babId) {
  document.querySelectorAll('.bab-content-panel').forEach(el => el.classList.add('hidden'));
  const panel = document.getElementById('panel-' + babId);
  if (panel) panel.classList.remove('hidden');

  document.querySelectorAll('.bab-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-bab') === babId) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

function runCpuSimulator() {
  const aInput = document.getElementById('sim-cpu-a');
  const bInput = document.getElementById('sim-cpu-b');
  const opInput = document.getElementById('sim-cpu-op');
  const logBox = document.getElementById('sim-cpu-output');
  if (!aInput || !bInput || !opInput || !logBox) return;

  const a = Number(aInput.value || 0);
  const b = Number(bInput.value || 0);
  const op = opInput.value;
  let res = 0;
  let opName = '';
  if (op === '+') { res = a + b; opName = 'ADD (Penjumlahan Aritmatika)'; }
  else if (op === '-') { res = a - b; opName = 'SUB (Pengurangan Aritmatika)'; }
  else if (op === '*') { res = a * b; opName = 'MUL (Perkalian Aritmatika)'; }
  else if (op === '>') { res = (a > b) ? 'TRUE (1)' : 'FALSE (0)'; opName = 'CMP (Perbandingan Logika ALU)'; }

  const binA = (a >>> 0).toString(2).padStart(8, '0');
  const binB = (b >>> 0).toString(2).padStart(8, '0');

  logBox.innerHTML = `
    <div class="space-y-1.5 font-mono text-xs">
      <div class="text-cyan-400">1. [FETCH] Mengambil data dari alamat RAM: A = ${a} (${binA}₂), B = ${b} (${binB}₂)</div>
      <div class="text-amber-300">2. [DECODE] Control Unit (CU) menerjemahkan instruksi: ${opName}</div>
      <div class="text-emerald-400 font-bold">3. [EXECUTE] ALU memproses operasi → Hasil Output ke Register/Layar = ${res}</div>
    </div>
  `;
  userState.poin += 10;
  saveUserState();
  showHubToast('Simulasi CPU berhasil dijalankan! (+10 XP)');
}

function runSpreadsheetSimulator() {
  const fnSelect = document.getElementById('sim-tik-formula');
  const resBox = document.getElementById('sim-tik-result');
  if (!fnSelect || !resBox) return;

  const dataDebit = [142, 156, 168, 160, 135, 118]; // Jan - Jun (m3/s)
  const fn = fnSelect.value;
  let val = '';
  let desc = '';

  if (fn === 'AVERAGE') {
    const avg = (dataDebit.reduce((a, b) => a + b, 0) / dataDebit.length).toFixed(1);
    val = avg + ' m³/detik';
    desc = 'Formula =AVERAGE(B2:B7) menghitung rata-rata debit air Waduk Riam Kanan selama 6 bulan.';
  } else if (fn === 'MAX') {
    val = Math.max(...dataDebit) + ' m³/detik (Bulan Maret)';
    desc = 'Formula =MAX(B2:B7) menemukan debit puncak tertinggi pada puncak musim penghujan.';
  } else if (fn === 'MIN') {
    val = Math.min(...dataDebit) + ' m³/detik (Bulan Juni)';
    desc = 'Formula =MIN(B2:B7) menemukan debit terendah saat memasuki awal musim kemarau.';
  } else if (fn === 'SUM') {
    val = dataDebit.reduce((a, b) => a + b, 0) + ' m³/detik';
    desc = 'Formula =SUM(B2:B7) menjumlahkan total akumulasi angka debit pada rentang sel.';
  }

  resBox.innerHTML = `
    <div class="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
      <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">Hasil Evaluasi Sel: ${val}</div>
      <div class="text-xs opacity-85">${desc}</div>
    </div>
  `;
  userState.poin += 10;
  saveUserState();
  showHubToast('Formula Spreadsheet dieksekusi! (+10 XP)');
}

function runValidationSimulator() {
  const nisn = (document.getElementById('val-nisn')?.value || '').trim();
  const nilai = (document.getElementById('val-nilai')?.value || '').trim();
  const email = (document.getElementById('val-email')?.value || '').trim();
  const out = document.getElementById('val-output-box');
  if (!out) return;

  const logs = [];
  let allValid = true;

  // 1. Presence & Type & Length Check on NISN
  if (!nisn) {
    allValid = false;
    logs.push('❌ [Presence Check Gagal] Kolom NISN tidak boleh dikosongkan.');
  } else if (!/^\d+$/.test(nisn)) {
    allValid = false;
    logs.push('❌ [Type Check Gagal] NISN hanya boleh berisi karakter angka (0-9), ditemukan huruf/simbol.');
  } else if (nisn.length !== 10) {
    allValid = false;
    logs.push(`❌ [Length Check Gagal] NISN harus tepat 10 digit (Anda memasukkan ${nisn.length} digit).`);
  } else {
    logs.push('✅ [Type & Length Check Lolos] NISN 10 digit numerik valid.');
  }

  // 2. Range Check on Nilai
  const numNilai = Number(nilai);
  if (nilai === '' || isNaN(numNilai)) {
    allValid = false;
    logs.push('❌ [Type Check Gagal] Nilai harus berupa angka.');
  } else if (numNilai < 0 || numNilai > 100) {
    allValid = false;
    logs.push(`❌ [Range Check Gagal] Nilai ${numNilai} berada di luar rentang sah (0 s.d. 100).`);
  } else {
    logs.push(`✅ [Range Check Lolos] Nilai ${numNilai} berada dalam rentang valid (0–100).`);
  }

  // 3. Format Check on Email
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    allValid = false;
    logs.push('❌ [Format Check Gagal] Format email tidak valid (harus memuat @ dan domain, misal siswa@smkn1bjm.sch.id).');
  } else {
    logs.push('✅ [Format Check Lolos] Struktur alamat email sesuai standar.');
  }

  const statusBanner = allValid
    ? '<div class="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm mb-2">🎉 STATUS DATA: 100% VALID (Siap Disimpan ke Database Informasi)</div>'
    : '<div class="font-extrabold text-rose-600 dark:text-rose-400 text-sm mb-2">⚠️ STATUS DATA: DITOLAK SISTEM (Ditemukan Pelanggaran Aturan Validasi)</div>';

  out.innerHTML = statusBanner + '<ul class="space-y-1 text-xs font-mono">' + logs.map(l => `<li>${l}</li>`).join('') + '</ul>';
  if (allValid) {
    userState.poin += 15;
    saveUserState();
    showHubToast('Data lolos seluruh uji validasi! (+15 XP)');
  }
}

// ============================================================================
// HALAMAN 3: VIDEO EDUKATIF INTERAKTIF
// ============================================================================
const VIDEO_DATA = {
  'vid-bab1': {
    title: 'Bab 1: Cara Kerja Sistem Komputer & Siklus Fetch-Decode-Execute pada CPU',
    duration: '06:15 Menit',
    bab: 'Bab 1 • Sistem Komputer',
    summary: 'Memvisualisasikan bagaimana perangkat Input mengirim sinyal biner ke RAM, lalu diproses oleh Control Unit (CU) dan Arithmetic Logic Unit (ALU) di dalam CPU sebelum ditampilkan ke layar monitor.',
    steps: [
      { step: '01', label: 'Input Device & Konversi Biner', desc: 'Ketikan papan ketik atau gerakan mouse diterjemahkan menjadi deretan bit biner (0 dan 1).' },
      { step: '02', label: 'Penyimpanan Sementara di RAM', desc: 'Instruksi dan data yang sedang aktif ditempatkan di alamat memori RAM berkecepatan tinggi.' },
      { step: '03', label: 'Siklus Fetch-Decode-Execute di CPU', desc: 'CU mengambil instruksi (Fetch), menerjemahkan kode operasi (Decode), dan ALU menghitung hasilnya (Execute).' },
      { step: '04', label: 'Visualisasi Output & Storage', desc: 'Hasil pengolahan dikirim ke kartu grafis/monitor (Output) atau disimpan permanen ke SSD (Storage).' }
    ],
    ytId: 'ExxFxD4OSZ0'
  },
  'vid-bab2': {
    title: 'Bab 2: Integrasi Aplikasi Perkantoran & Analisis Data Hidrologi Lahan Basah',
    duration: '07:10 Menit',
    bab: 'Bab 2 • Teknologi Informasi & Komunikasi',
    summary: 'Demonstrasi praktikum mengolah dataset tinggi muka air Waduk Riam Kanan Kalimantan Selatan menggunakan rumus statistik Excel (AVERAGE, MAX, MIN, IF) serta menautkan grafiknya secara dinamis (OLE) ke laporan Word.',
    steps: [
      { step: '01', label: 'Penyusunan Tabel Dataset di Spreadsheet', desc: 'Merapikan 12 baris data bulanan curah hujan dan elevasi air Waduk Riam Kanan.' },
      { step: '02', label: 'Penerapan Formula Statistik & Logika IF', desc: 'Menghitung rata-rata (=AVERAGE), titik tertinggi (=MAX), dan status siaga banjir dengan fungsi =IF().' },
      { step: '03', label: 'Pembuatan Grafik Garis & Batang', desc: 'Membuat visualisasi grafik komparatif yang bersih dan mudah dibaca untuk infografis DKV.' },
      { step: '04', label: 'Integrasi Paste Link ke Pengolah Kata', desc: 'Menyalin grafik dengan Paste Special -> Paste Link agar laporan Word terbarui otomatis.' }
    ],
    ytId: 'Vl0H-qTclOg'
  },
  'vid-bab3': {
    title: 'Bab 3: Transformasi Data Menjadi Informasi & 5 Teknik Validasi Data Digital',
    duration: '05:45 Menit',
    bab: 'Bab 3 • Data, Informasi, dan Validasinya',
    summary: 'Penjelasan animasi mengenai perbedaan fakta mentah (Data) dengan Informasi bermakna, bahaya Garbage In Garbage Out (GIGO), serta praktik memasang Data Validation pada formulir dan spreadsheet.',
    steps: [
      { step: '01', label: 'Fakta Mentah vs Informasi Kontekstual', desc: 'Membedakan deretan angka mentah dengan informasi terstruktur yang siap mendukung keputusan.' },
      { step: '02', label: 'Mencegah Garbage In, Garbage Out (GIGO)', desc: 'Mengapa kesalahan input sekecil satu digit dapat merusak kesimpulan analisis satu sekolah.' },
      { step: '03', label: '5 Kriteria Validasi Data Utama', desc: 'Type Check, Range Check (0-100), Format Check (Email/Tanggal), Presence Check, dan Consistency Check.' },
      { step: '04', label: 'Praktik Fitur Data Validation di Spreadsheet', desc: 'Mengatur Input Message dan Error Alert (Stop/Warning) agar pengguna tidak salah ketik.' }
    ],
    ytId: 'b59X3b9G2pA'
  }
};

let activeVideoKey = 'vid-bab3';
let animInterval = null;
let animStepIdx = 0;

function selectVideoLesson(key) {
  activeVideoKey = key;
  const v = VIDEO_DATA[key];
  if (!v) return;

  const titleEl = document.getElementById('video-main-title');
  const babEl = document.getElementById('video-main-bab');
  const durEl = document.getElementById('video-main-duration');
  const sumEl = document.getElementById('video-main-summary');
  const stepsEl = document.getElementById('video-steps-container');

  if (titleEl) titleEl.textContent = v.title;
  if (babEl) babEl.textContent = v.bab;
  if (durEl) durEl.textContent = '⏱️ ' + v.duration + ' • Bebas Iklan';
  if (sumEl) sumEl.textContent = v.summary;

  if (stepsEl) {
    stepsEl.innerHTML = v.steps.map((s, idx) => `
      <div id="vid-step-card-${idx}" class="p-4 rounded-2xl hub-subtle transition-all duration-300">
        <div class="flex items-center gap-2 mb-1">
          <span class="px-2 py-0.5 rounded bg-blue-600 text-white text-xs font-mono font-bold">${s.step}</span>
          <h4 class="font-bold text-sm">${s.label}</h4>
        </div>
        <p class="text-xs opacity-80 leading-relaxed">${s.desc}</p>
      </div>
    `).join('');
  }

  document.querySelectorAll('.video-playlist-btn').forEach(btn => {
    if (btn.getAttribute('data-vid') === key) {
      btn.classList.add('ring-2', 'ring-blue-500');
    } else {
      btn.classList.remove('ring-2', 'ring-blue-500');
    }
  });

  stopInteractiveVideo();
  renderVideoStageFrame(0);
  const vidEl = document.getElementById('main-mp4-player');
  if (vidEl) {
    const startMap = { 'vid-bab1': 3, 'vid-bab2': 6, 'vid-bab3': 9 };
    try {
      vidEl.currentTime = startMap[key] || 0;
    } catch (e) {}
  }
}

function renderVideoStageFrame(stepIdx) {
  const v = VIDEO_DATA[activeVideoKey];
  if (!v) return;
  const stepObj = v.steps[stepIdx % v.steps.length];
  const stageTitle = document.getElementById('stage-anim-title');
  const stageDesc = document.getElementById('stage-anim-desc');
  const stageStepBadge = document.getElementById('stage-anim-badge');
  const progressBar = document.getElementById('stage-progress-bar');

  if (stageStepBadge) stageStepBadge.textContent = `${v.bab} — Segmen ${stepObj.step} / 04`;
  if (stageTitle) stageTitle.textContent = stepObj.label;
  if (stageDesc) stageDesc.textContent = stepObj.desc;
  if (progressBar) progressBar.style.width = (((stepIdx % 4) + 1) * 25) + '%';

  for (let i = 0; i < 4; i++) {
    const card = document.getElementById('vid-step-card-' + i);
    if (card) {
      if (i === (stepIdx % 4)) {
        card.classList.add('ring-2', 'ring-cyan-400');
      } else {
        card.classList.remove('ring-2', 'ring-cyan-400');
      }
    }
  }
}

function seekMp4Video(seconds) {
  const vidEl = document.getElementById('main-mp4-player');
  if (!vidEl) return;
  try {
    vidEl.currentTime = seconds;
    vidEl.play();
  } catch (e) {}
}

function onMp4Ended() {
  userState.poin += 25;
  saveUserState();
  showHubToast('Selesai menonton Video MP4 Pembelajaran! (+25 XP)');
}

function playInteractiveVideo() {
  const vidEl = document.getElementById('main-mp4-player');
  if (vidEl) {
    try {
      if (vidEl.paused) vidEl.play();
    } catch (e) {}
  }
  clearInterval(animInterval);
  const statusBtn = document.getElementById('btn-play-vid');
  if (statusBtn) statusBtn.textContent = '⏸️ Sedang Memutar Video & Simulasi...';
  renderVideoStageFrame(animStepIdx);
  animInterval = setInterval(() => {
    animStepIdx = (animStepIdx + 1) % 4;
    renderVideoStageFrame(animStepIdx);
    if (animStepIdx === 3) {
      userState.poin += 20;
      saveUserState();
      showHubToast('Selesai menyimak video pembelajaran! (+20 XP)');
    }
  }, 2600);
}

function stopInteractiveVideo() {
  clearInterval(animInterval);
  animInterval = null;
  const statusBtn = document.getElementById('btn-play-vid');
  if (statusBtn) statusBtn.textContent = '▶️ Putar Simulasi Video Interaktif';
}

function nextVideoStep() {
  stopInteractiveVideo();
  animStepIdx = (animStepIdx + 1) % 4;
  renderVideoStageFrame(animStepIdx);
}

// ============================================================================
// HALAMAN 4: QUIZ GAMIFIKASI, REWARD DIGITAL, & LEADERBOARD SPREADSHEET
// ============================================================================
function startGamifiedQuiz() {
  const nameInput = document.getElementById('quiz-input-nama');
  const classInput = document.getElementById('quiz-input-kelas');
  const babInput = document.getElementById('quiz-input-bab');

  const nama = (nameInput?.value || '').trim();
  const kelas = (classInput?.value || 'X-B DKV').trim();
  const bab = babInput?.value || 'all';

  if (!nama) {
    showHubToast('Silakan masukkan Nama Lengkap Anda terlebih dahulu sebelum memulai kuis!');
    if (nameInput) nameInput.focus();
    return;
  }

  userState.nama = nama;
  userState.kelas = kelas;
  saveUserState();

  let pool = QUIZ_QUESTIONS.slice();
  if (bab !== 'all') {
    pool = pool.filter(q => q.bab === bab);
  }

  quizSession = {
    active: true,
    babFilter: bab,
    questions: pool,
    currentIndex: 0,
    correctCount: 0,
    streak: 0,
    earnedXp: 0,
    answeredCurrent: false
  };

  document.getElementById('quiz-registration-card')?.classList.add('hidden');
  document.getElementById('quiz-result-card')?.classList.add('hidden');
  document.getElementById('quiz-arena-card')?.classList.remove('hidden');

  renderCurrentQuestion();
}

function renderCurrentQuestion() {
  const qObj = quizSession.questions[quizSession.currentIndex];
  if (!qObj) return;
  quizSession.answeredCurrent = false;

  const total = quizSession.questions.length;
  const idx = quizSession.currentIndex + 1;

  document.getElementById('quiz-progress-text').textContent = `Soal ${idx} dari ${total}`;
  document.getElementById('quiz-bab-badge').textContent = qObj.babLabel;
  document.getElementById('quiz-streak-badge').textContent = `🔥 Streak: ${quizSession.streak}x`;
  document.getElementById('quiz-progress-bar').style.width = `${Math.round((idx / total) * 100)}%`;
  document.getElementById('quiz-question-text').textContent = qObj.q;

  const optContainer = document.getElementById('quiz-options-list');
  const letters = ['A', 'B', 'C', 'D'];
  optContainer.innerHTML = qObj.options.map((opt, i) => `
    <button type="button" id="quiz-opt-btn-${i}" onclick="submitQuizAnswer(${i})" class="w-full text-left p-4 rounded-2xl hub-subtle hover:border-blue-500 transition flex items-start gap-3.5 group">
      <span class="w-8 h-8 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 font-extrabold text-sm flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition">${letters[i]}</span>
      <span class="text-sm sm:text-base font-medium leading-snug pt-0.5">${opt}</span>
    </button>
  `).join('');

  document.getElementById('quiz-feedback-box')?.classList.add('hidden');
  document.getElementById('quiz-next-btn')?.classList.add('hidden');
}

function submitQuizAnswer(selectedIndex) {
  if (quizSession.answeredCurrent) return;
  quizSession.answeredCurrent = true;

  const qObj = quizSession.questions[quizSession.currentIndex];
  const isCorrect = selectedIndex === qObj.answer;

  for (let i = 0; i < qObj.options.length; i++) {
    const btn = document.getElementById('quiz-opt-btn-' + i);
    if (!btn) continue;
    if (i === qObj.answer) {
      btn.className = 'w-full text-left p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold flex items-start gap-3.5';
    } else if (i === selectedIndex && !isCorrect) {
      btn.className = 'w-full text-left p-4 rounded-2xl bg-rose-500/15 border-2 border-rose-500 text-rose-700 dark:text-rose-300 font-bold flex items-start gap-3.5';
    } else {
      btn.classList.add('opacity-50');
    }
  }

  const fbBox = document.getElementById('quiz-feedback-box');
  if (isCorrect) {
    quizSession.correctCount += 1;
    quizSession.streak += 1;
    const bonus = 100 + (quizSession.streak * 20);
    quizSession.earnedXp += bonus;
    userState.poin += bonus;
    saveUserState();

    fbBox.className = 'p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-sm space-y-1';
    fbBox.innerHTML = `<div class="font-extrabold text-emerald-600 dark:text-emerald-400">✅ Jawaban Tepat! (+${bonus} XP)</div><p class="text-xs opacity-90 leading-relaxed">${qObj.explain}</p>`;
  } else {
    quizSession.streak = 0;
    fbBox.className = 'p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-sm space-y-1';
    fbBox.innerHTML = `<div class="font-extrabold text-rose-600 dark:text-rose-400">❌ Kurang Tepat!</div><p class="text-xs opacity-90 leading-relaxed">${qObj.explain}</p>`;
  }

  fbBox.classList.remove('hidden');
  document.getElementById('quiz-streak-badge').textContent = `🔥 Streak: ${quizSession.streak}x`;
  document.getElementById('quiz-next-btn')?.classList.remove('hidden');
}

function nextQuizQuestion() {
  if (quizSession.currentIndex + 1 < quizSession.questions.length) {
    quizSession.currentIndex += 1;
    renderCurrentQuestion();
  } else {
    finishQuizSession();
  }
}

function finishQuizSession() {
  document.getElementById('quiz-arena-card')?.classList.add('hidden');
  const resCard = document.getElementById('quiz-result-card');
  if (resCard) resCard.classList.remove('hidden');

  const total = quizSession.questions.length;
  const score = Math.round((quizSession.correctCount / total) * 100);
  const babMap = {
    'all': 'Semua Bab (3 Materi)',
    'bab1': 'Bab 1: Sistem Komputer',
    'bab2': 'Bab 2: Teknologi Informasi & Komunikasi',
    'bab3': 'Bab 3: Data, Informasi, & Validasi'
  };
  const babLabel = babMap[quizSession.babFilter] || 'Semua Bab';

  document.getElementById('res-student-name').textContent = `${userState.nama} (${userState.kelas})`;
  document.getElementById('res-final-score').textContent = score;
  document.getElementById('res-correct-ratio').textContent = `${quizSession.correctCount} / ${total} Soal Benar`;
  document.getElementById('res-xp-earned').textContent = `+${quizSession.earnedXp} XP`;

  // Simpan ke Leaderboard (Local + Google Apps Script jika terhubung)
  const newEntry = {
    timestamp: new Date().toLocaleString('id-ID'),
    nama: userState.nama + (userState.badgeTitle ? ` [${userState.badgeTitle}]` : ''),
    kelas: userState.kelas,
    bab: babLabel,
    skor: score,
    poin: userState.poin,
    reward: userState.claimedRewards.join(', ') || '-'
  };

  saveScoreToLeaderboard(newEntry);
}

function resetQuizToStart() {
  document.getElementById('quiz-result-card')?.classList.add('hidden');
  document.getElementById('quiz-arena-card')?.classList.add('hidden');
  document.getElementById('quiz-registration-card')?.classList.remove('hidden');
}

// ============================================================================
// REWARD DIGITAL & SERTIFIKAT
// ============================================================================
function renderRewardsGrid() {
  const container = document.getElementById('rewards-shop-grid');
  if (!container) return;

  container.innerHTML = REWARD_CATALOG.map(r => {
    const owned = userState.claimedRewards.includes(r.title);
    const btnHtml = owned
      ? `<button type="button" onclick="openRewardPreview('${r.id}')" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition">✅ Sudah Diklaim (Buka Reward)</button>`
      : `<button type="button" onclick="claimDigitalReward('${r.id}')" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition shadow">🎁 Tukarkan (${r.cost} XP)</button>`;

    return `
      <div class="hub-card rounded-2xl p-5 flex flex-col justify-between space-y-4">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-2xl">${r.icon}</span>
            <span class="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-extrabold">${r.cost} XP</span>
          </div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">${r.badge}</div>
          <h4 class="font-extrabold text-base leading-snug">${r.title}</h4>
          <p class="text-xs opacity-80 leading-relaxed">${r.desc}</p>
        </div>
        <div class="pt-2">
          ${btnHtml}
        </div>
      </div>
    `;
  }).join('');
}

function claimDigitalReward(rewardId) {
  const item = REWARD_CATALOG.find(x => x.id === rewardId);
  if (!item) return;

  if (userState.claimedRewards.includes(item.title)) {
    openRewardPreview(rewardId);
    return;
  }

  if (userState.poin < item.cost) {
    showHubToast(`Poin XP belum cukup! Butuh ${item.cost} XP (Poin Anda: ${userState.poin} XP). Yuk kerjakan kuis atau simulasi materi!`);
    return;
  }

  userState.poin -= item.cost;
  userState.claimedRewards.push(item.title);
  if (rewardId === 'badge-banjar') {
    userState.badgeTitle = '💎 Master Data Banjar';
  }
  saveUserState();
  renderRewardsGrid();
  openRewardPreview(rewardId);
  showHubToast(`Selamat! Berhasil menukarkan ${item.title}`);
}

function openRewardPreview(rewardId) {
  const item = REWARD_CATALOG.find(x => x.id === rewardId);
  if (!item) return;
  const modal = document.getElementById('reward-preview-modal');
  const body = document.getElementById('reward-modal-content');
  if (!modal || !body) return;

  const studentName = userState.nama || 'Siswa Berprestasi SMKN 1 Banjarmasin';
  const studentClass = userState.kelas || 'Kelas X SMK';

  if (rewardId === 'cert-kompetensi') {
    body.innerHTML = `
      <div class="p-6 sm:p-8 rounded-2xl border-4 border-double border-amber-400 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white text-center space-y-4">
        <div class="text-xs font-bold uppercase tracking-widest text-amber-300">SERTIFIKAT KOMPETENSI DIGITAL • INFORMATIKA LEARNING HUB</div>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-white">SERTIFIKAT KETUNTASAN BELAJAR</h3>
        <p class="text-xs text-slate-300">Diberikan dengan bangga kepada:</p>
        <div class="text-xl sm:text-2xl font-extrabold text-cyan-300 underline decoration-amber-400">${studentName} (${studentClass})</div>
        <p class="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
          Telah menyelesaikan pembelajaran mandiri dan evaluasi gamifikasi pada materi <strong>Sistem Komputer</strong>, <strong>Teknologi Informasi &amp; Komunikasi</strong>, serta <strong>Data, Informasi, dan Validasinya</strong> pada platform Informatika Learning Hub SMKN 1 Banjarmasin.
        </p>
        <div class="pt-4 flex flex-col sm:flex-row items-center justify-around text-xs text-slate-300 border-t border-white/15 gap-3">
          <div>Banjarmasin, Oktober 2026</div>
          <div><strong>Akhmad Wahyu Redhani, S.Kom.</strong><br/>Guru Informatika • NIM 2530111713968</div>
        </div>
      </div>
    `;
  } else {
    body.innerHTML = `
      <div class="p-6 rounded-2xl hub-subtle text-center space-y-3">
        <div class="text-5xl">${item.icon}</div>
        <div class="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">${item.badge}</div>
        <h3 class="text-xl font-extrabold">${item.title}</h3>
        <p class="text-sm opacity-85">${item.desc}</p>
        <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
          KODE KLAIM DIGITAL: ILH-${rewardId.toUpperCase()}-2026 | Pemilik: ${studentName} (${studentClass})
        </div>
      </div>
    `;
  }

  modal.classList.remove('hidden');
}

function closeRewardPreview() {
  document.getElementById('reward-preview-modal')?.classList.add('hidden');
}

// ============================================================================
// DATABASE LEADERBOARD (GOOGLE SPREADSHEET + GOOGLE APPS SCRIPT + FALLBACK)
// ============================================================================
function getLocalLeaderboard() {
  try {
    const raw = localStorage.getItem('hub_leaderboard_records');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return DEFAULT_LEADERBOARD.slice();
}

function setLocalLeaderboard(list) {
  try {
    localStorage.setItem('hub_leaderboard_records', JSON.stringify(list));
  } catch (e) {}
}

async function loadLeaderboardData() {
  const statusEl = document.getElementById('db-connection-badge');
  let list = getLocalLeaderboard();

  if (GAS_WEB_APP_URL && GAS_WEB_APP_URL.startsWith('https://script.google.com/')) {
    if (statusEl) {
      statusEl.textContent = '🔄 Sinkronisasi Google Spreadsheet...';
      statusEl.className = 'px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold';
    }
    try {
      const resp = await fetch(GAS_WEB_APP_URL);
      const json = await resp.json();
      if (json && Array.isArray(json.leaderboard)) {
        list = json.leaderboard;
        setLocalLeaderboard(list);
        if (statusEl) {
          statusEl.textContent = '🟢 Terhubung: Google Spreadsheet (Live)';
          statusEl.className = 'px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold';
        }
      }
    } catch (err) {
      if (statusEl) {
        statusEl.textContent = '🟡 Mode Hybrid (Spreadsheet Offline / Local Sync)';
        statusEl.className = 'px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold';
      }
    }
  } else {
    if (statusEl) {
      statusEl.textContent = '🟢 Mode Demo Kelas X DKV (Siap Hubungkan URL Google Script)';
      statusEl.className = 'px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-bold';
    }
  }

  list.sort((a, b) => (Number(b.skor) - Number(a.skor)) || (Number(b.poin) - Number(a.poin)));
  renderLeaderboardTable(list);
}

async function saveScoreToLeaderboard(entry) {
  const list = getLocalLeaderboard();
  list.push(entry);
  list.sort((a, b) => (Number(b.skor) - Number(a.skor)) || (Number(b.poin) - Number(a.poin)));
  setLocalLeaderboard(list);
  renderLeaderboardTable(list);

  if (GAS_WEB_APP_URL && GAS_WEB_APP_URL.startsWith('https://script.google.com/')) {
    try {
      await fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(entry)
      });
      showHubToast('Skor berhasil dikirim ke Google Spreadsheet & Leaderboard!');
    } catch (e) {
      showHubToast('Skor tersimpan di Leaderboard lokal!');
    }
  } else {
    showHubToast('Skor Anda berhasil masuk ke Papan Peringkat Leaderboard!');
  }
}

function renderLeaderboardTable(list) {
  const tbody = document.getElementById('leaderboard-tbody');
  if (!tbody) return;

  tbody.innerHTML = list.map((item, idx) => {
    const rank = idx + 1;
    let rankBadge = `<span class="font-mono font-bold text-xs">#${rank}</span>`;
    if (rank === 1) rankBadge = '<span class="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-xs">🥇 1</span>';
    else if (rank === 2) rankBadge = '<span class="px-2.5 py-1 rounded-lg bg-slate-300 text-slate-900 font-extrabold text-xs">🥈 2</span>';
    else if (rank === 3) rankBadge = '<span class="px-2.5 py-1 rounded-lg bg-amber-700 text-white font-extrabold text-xs">🥉 3</span>';

    return `
      <tr class="border-b border-slate-200 dark:border-slate-800 hover:bg-blue-500/5 transition">
        <td class="p-3.5">${rankBadge}</td>
        <td class="p-3.5 font-bold text-sm">${item.nama}</td>
        <td class="p-3.5 text-xs font-semibold"><span class="px-2.5 py-1 rounded-full hub-subtle">${item.kelas}</span></td>
        <td class="p-3.5 text-xs opacity-80">${item.bab}</td>
        <td class="p-3.5 font-extrabold text-blue-600 dark:text-blue-400 text-sm">${item.skor}</td>
        <td class="p-3.5 font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">${item.poin} XP</td>
        <td class="p-3.5 text-xs opacity-80">${item.reward || '-'}</td>
      </tr>
    `;
  }).join('');
}

function openGasConfigModal() {
  const modal = document.getElementById('gas-config-modal');
  const inp = document.getElementById('gas-url-input');
  if (inp) inp.value = GAS_WEB_APP_URL;
  if (modal) modal.classList.remove('hidden');
}

function closeGasConfigModal() {
  document.getElementById('gas-config-modal')?.classList.add('hidden');
}

function saveGasUrlConfig() {
  const inp = document.getElementById('gas-url-input');
  GAS_WEB_APP_URL = (inp?.value || '').trim();
  try {
    localStorage.setItem('hub_gas_url', GAS_WEB_APP_URL);
  } catch (e) {}
  closeGasConfigModal();
  loadLeaderboardData();
  showHubToast('Konfigurasi URL Google Apps Script berhasil disimpan!');
}

function showHubToast(msg) {
  const t = document.getElementById('hub-toast');
  const txt = document.getElementById('hub-toast-text');
  if (!t || !txt) return;
  txt.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window._hubToastTimer);
  window._hubToastTimer = setTimeout(() => {
    t.classList.add('hidden');
  }, 3500);
}

window.addEventListener('DOMContentLoaded', () => {
  initHubState();
  selectVideoLesson('vid-bab3');
});
