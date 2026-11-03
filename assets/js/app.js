/* ==========================================================================
   Informatika Learning Hub — Interactive Engine
   Karya Inovasi: Akhmad Wahyu Redhani (NIM 2530111713968)
   ========================================================================== */

// ============================================================
// KONFIGURASI
// ============================================================
let GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxtaU8Z08nxvBCZUQ0rGEV6SI-Uh0QOxIRUniFadTVXOLMsMQuNlYFkYIT6-0Y-WDTK/exec';

// ✅ OPSIONAL: Token anti-spam (samakan dengan SECRET_TOKEN di Code.gs)
// Biarkan kosong ('') jika tidak pakai token
const GAS_SECRET_TOKEN = '';

// ============================================================
// HELPER: Validasi URL GAS & Escape HTML
// ============================================================
function isValidGasUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec(\?.*)?$/.test(trimmed);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================================
// DATA STATIS
// ============================================================
const DEFAULT_LEADERBOARD = [
  { timestamp: '31/10/2026 09:15', nama: 'Muhammad Rizky Pratama', kelas: 'X-B DKV', bab: 'Semua Bab (3 Materi)', skor: 95, poin: 1450, reward: 'Sertifikat Master Informatika' },
  { timestamp: '31/10/2026 09:18', nama: 'Siti Nurhaliza Azzahra', kelas: 'X-B DKV', bab: 'Bab 3: Data, Informasi, & Validasi', skor: 90, poin: 1320, reward: 'Badge Master Data Banjar' },
  { timestamp: '31/10/2026 09:22', nama: 'Ahmad Fauzan Ramadhan', kelas: 'X-C DKV', bab: 'Semua Bab (3 Materi)', skor: 90, poin: 1280, reward: 'E-Modul Cheat Sheet Excel' },
  { timestamp: '31/10/2026 09:25', nama: 'Nabila Putri Banjari', kelas: 'X-B DKV', bab: 'Bab 1: Sistem Komputer', skor: 85, poin: 1150, reward: 'Badge Arsitek CPU' },
  { timestamp: '31/10/2026 09:30', nama: 'Dimas Arya Saputra', kelas: 'X-C DKV', bab: 'Bab 2: Teknologi Informasi & Komunikasi', skor: 85, poin: 1100, reward: '-' },
  { timestamp: '31/10/2026 09:34', nama: 'Aulia Rahmah', kelas: 'X-B DKV', bab: 'Bab 3: Data, Informasi, & Validasi', skor: 80, poin: 980, reward: '-' }
];

const QUIZ_QUESTIONS = [
  { id: 1, bab: 'bab1', babLabel: 'Bab 1: Sistem Komputer', q: 'Di dalam prosesor (CPU), komponen manakah yang bertugas melakukan perhitungan aritmatika dan perbandingan logika?', options: ['Control Unit (CU)', 'Arithmetic Logic Unit (ALU)', 'Random Access Memory (RAM)', 'Read Only Memory (ROM)'], answer: 1, explain: 'ALU mengeksekusi operasi aritmatika dan logika, CU mengatur kendali instruksi.' },
  { id: 2, bab: 'bab1', babLabel: 'Bab 1: Sistem Komputer', q: 'Urutan siklus pemrosesan instruksi yang benar di dalam CPU adalah...', options: ['Fetch → Decode → Execute', 'Execute → Fetch → Store', 'Decode → Input → Output', 'Booting → Compiling → Rendering'], answer: 0, explain: 'Siklus mesin CPU: Fetch, Decode, Execute.' },
  { id: 3, bab: 'bab1', babLabel: 'Bab 1: Sistem Komputer', q: 'Mengapa RAM disebut memori volatile?', options: ['Kapasitasnya tidak dapat ditambah', 'Data tersimpan permanen meski listrik padam', 'Data hilang ketika komputer dimatikan', 'Hanya bisa dibaca BIOS'], answer: 2, explain: 'Volatile = butuh daya listrik terus-menerus.' },
  { id: 4, bab: 'bab1', babLabel: 'Bab 1: Sistem Komputer', q: 'Perangkat lunak yang mengatur pembagian memori dan perangkat keras adalah...', options: ['Application Software', 'Sistem Operasi', 'Power Supply Unit', 'VGA'], answer: 1, explain: 'OS mengelola sumber daya hardware.' },
  { id: 5, bab: 'bab1', babLabel: 'Bab 1: Sistem Komputer', q: 'Bilangan biner 10110 jika dikonversi ke desimal adalah...', options: ['18', '20', '22', '26'], answer: 2, explain: '10110₂ = 16+4+2 = 22₁₀.' },
  { id: 6, bab: 'bab2', babLabel: 'Bab 2: TIK', q: 'Formula untuk mencari rata-rata elevasi air adalah...', options: ['=SUM(C2:C13)', '=AVERAGE(C2:C13)', '=MAX(C2:C13)', '=COUNT(C2:C13)'], answer: 1, explain: '=AVERAGE untuk rata-rata aritmatika.' },
  { id: 7, bab: 'bab2', babLabel: 'Bab 2: TIK', q: 'Teknik integrasi agar grafik Excel otomatis berubah di Word adalah...', options: ['Copy → Paste Picture', 'Screenshot', 'Paste Special → Paste Link (OLE)', 'Save As PDF'], answer: 2, explain: 'Paste Link (OLE) menghubungkan objek dinamis.' },
  { id: 8, bab: 'bab2', babLabel: 'Bab 2: TIK', q: 'Fitur untuk membuat 35 sertifikat dari satu template Word + tabel Excel adalah...', options: ['Mail Merge', 'Track Changes', 'Table of Contents', 'Page Break'], answer: 0, explain: 'Mail Merge mengintegrasikan Word + Excel.' },
  { id: 9, bab: 'bab2', babLabel: 'Bab 2: TIK', q: 'Mengapa =SUM(B2:B10) menghasilkan #VALUE!?', options: ['Kolom kurang lebar', 'Ada sel berisi teks yang dipaksa dihitung', 'Rumus diketik kapital', 'File belum disimpan'], answer: 1, explain: '#VALUE! = tipe data tidak sesuai operasi matematika.' },
  { id: 10, bab: 'bab2', babLabel: 'Bab 2: TIK', q: 'Grafik untuk menampilkan tren perubahan debit air 12 bulan adalah...', options: ['Pie Chart', 'Line Chart', 'Scatter Plot', 'SmartArt'], answer: 1, explain: 'Line Chart efektif untuk time-series.' },
  { id: 11, bab: 'bab3', babLabel: 'Bab 3: Data & Validasi', q: 'Perbedaan mendasar Data dan Informasi adalah...', options: ['Sama persis', 'Data fakta mentah, Informasi hasil olahan bermakna', 'Informasi angka acak, data laporan akhir', 'Data teks, informasi video'], answer: 1, explain: 'Data mentah, informasi bermakna.' },
  { id: 12, bab: 'bab3', babLabel: 'Bab 3: Data & Validasi', q: 'Sistem menolak input nilai "125" atau "-10" (skala 0-100). Validasi yang bekerja adalah...', options: ['Format Check', 'Presence Check', 'Range Check', 'Length Check'], answer: 2, explain: 'Range Check memastikan nilai dalam batas min-max.' },
  { id: 13, bab: 'bab3', babLabel: 'Bab 3: Data & Validasi', q: 'Sistem menolak huruf di kolom NISN. Pemeriksaan ini disebut...', options: ['Type Check', 'Consistency Check', 'Spelling Check', 'Duplication Check'], answer: 0, explain: 'Type Check memastikan tipe data sesuai.' },
  { id: 14, bab: 'bab3', babLabel: 'Bab 3: Data & Validasi', q: 'Tanggal Lulus 2024 padahal Tanggal Masuk 2025. Ini contoh...', options: ['Presence Check', 'Consistency Check', 'Type Check', 'Character Check'], answer: 1, explain: 'Consistency Check memeriksa hubungan logis antar-kolom.' },
  { id: 15, bab: 'bab3', babLabel: 'Bab 3: Data & Validasi', q: 'Mengapa prinsip GIGO penting?', options: ['Komputer memperbaiki sendiri', 'Jika input salah, output pasti salah', 'Recycle Bin terbatas', 'Validasi hanya saat online'], answer: 1, explain: 'Kualitas output bergantung validitas input.' }
];

const REWARD_CATALOG = [
  { id: 'cert-kompetensi', title: 'Sertifikat Digital Kompetensi Informatika', cost: 300, badge: '📄 Sertifikat Resmi', desc: 'Sertifikat digital dengan Nama & Kelas Anda.', icon: '🏅' },
  { id: 'badge-banjar', title: 'Badge Eksklusif "Master Data Lahan Basah"', cost: 200, badge: '🛡️ Gelar Leaderboard', desc: 'Gelar kehormatan di samping nama Anda.', icon: '💎' },
  { id: 'modul-cheatsheet', title: 'E-Modul Cheat Sheet Rumus Excel & Validasi Data', cost: 150, badge: '📘 Ringkasan Praktikum', desc: 'Kartu panduan cepat rumus spreadsheet.', icon: '⚡' },
  { id: 'voucher-praktikum', title: 'Voucher +10 Poin Bonus Tugas Praktikum Lab', cost: 400, badge: '🎁 Kode Klaim Guru', desc: 'Kode unik untuk ditunjukkan ke guru.', icon: '🎟️' }
];

// ============================================================
// STATE
// ============================================================
let userState = { nama: '', kelas: 'X-B DKV', poin: 250, claimedRewards: [], badgeTitle: '' };
let quizSession = { active: false, babFilter: 'all', questions: [], currentIndex: 0, correctCount: 0, streak: 0, earnedXp: 0, answeredCurrent: false };

// ============================================================
// INISIALISASI
// ============================================================
function initHubState() {
  try {
    const savedTheme = localStorage.getItem('hub_theme_mode');
    if (savedTheme === 'dark') document.documentElement.classList.add('dark');
    const savedUser = localStorage.getItem('hub_user_state');
    if (savedUser) userState = Object.assign(userState, JSON.parse(savedUser));

    // ✅ FIX: Load URL DULU sebelum loadLeaderboardData()
    const savedUrl = localStorage.getItem('hub_gas_url');
    if (savedUrl && isValidGasUrl(savedUrl)) {
      GAS_WEB_APP_URL = savedUrl;
    }
  } catch (e) {}
  updateThemeUI();
  updatePointsUI();
  renderRewardsGrid();
  loadLeaderboardData();
}

function saveUserState() {
  try { localStorage.setItem('hub_user_state', JSON.stringify(userState)); } catch (e) {}
  updatePointsUI();
}

function toggleHubTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('hub_theme_mode', isDark ? 'dark' : 'light'); } catch (e) {}
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

// ============================================================
// MATERI & SIMULATOR
// ============================================================
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
  let res = 0, opName = '';
  if (op === '+') { res = a + b; opName = 'ADD'; }
  else if (op === '-') { res = a - b; opName = 'SUB'; }
  else if (op === '*') { res = a * b; opName = 'MUL'; }
  else if (op === '>') { res = (a > b) ? 'TRUE (1)' : 'FALSE (0)'; opName = 'CMP'; }
  const binA = (a >>> 0).toString(2).padStart(8, '0');
  const binB = (b >>> 0).toString(2).padStart(8, '0');
  logBox.innerHTML = `
    <div class="space-y-1.5 font-mono text-xs">
      <div class="text-cyan-400">1. [FETCH] A = ${a} (${binA}₂), B = ${b} (${binB}₂)</div>
      <div class="text-amber-300">2. [DECODE] CU menerjemahkan: ${opName}</div>
      <div class="text-emerald-400 font-bold">3. [EXECUTE] ALU → Hasil = ${res}</div>
    </div>`;
  userState.poin += 10;
  saveUserState();
  showHubToast('Simulasi CPU berhasil! (+10 XP)');
}

function runSpreadsheetSimulator() {
  const fnSelect = document.getElementById('sim-tik-formula');
  const resBox = document.getElementById('sim-tik-result');
  if (!fnSelect || !resBox) return;
  const dataDebit = [142, 156, 168, 160, 135, 118];
  const fn = fnSelect.value;
  let val = '', desc = '';
  if (fn === 'AVERAGE') { val = (dataDebit.reduce((a, b) => a + b, 0) / dataDebit.length).toFixed(1) + ' m³/detik'; desc = '=AVERAGE(B2:B7) rata-rata debit.'; }
  else if (fn === 'MAX') { val = Math.max(...dataDebit) + ' m³/detik (Maret)'; desc = '=MAX(B2:B7) debit tertinggi.'; }
  else if (fn === 'MIN') { val = Math.min(...dataDebit) + ' m³/detik (Juni)'; desc = '=MIN(B2:B7) debit terendah.'; }
  else if (fn === 'SUM') { val = dataDebit.reduce((a, b) => a + b, 0) + ' m³/detik'; desc = '=SUM(B2:B7) total debit.'; }
  resBox.innerHTML = `<div class="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
    <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">Hasil: ${val}</div>
    <div class="text-xs opacity-85">${desc}</div></div>`;
  userState.poin += 10;
  saveUserState();
  showHubToast('Formula dieksekusi! (+10 XP)');
}

function runValidationSimulator() {
  const nisn = (document.getElementById('val-nisn')?.value || '').trim();
  const nilai = (document.getElementById('val-nilai')?.value || '').trim();
  const email = (document.getElementById('val-email')?.value || '').trim();
  const out = document.getElementById('val-output-box');
  if (!out) return;
  const logs = [];
  let allValid = true;
  if (!nisn) { allValid = false; logs.push('❌ [Presence] NISN kosong.'); }
  else if (!/^\d+$/.test(nisn)) { allValid = false; logs.push('❌ [Type] NISN harus angka.'); }
  else if (nisn.length !== 10) { allValid = false; logs.push(`❌ [Length] NISN harus 10 digit (${nisn.length}).`); }
  else logs.push('✅ [Type & Length] NISN valid.');
  const numNilai = Number(nilai);
  if (nilai === '' || isNaN(numNilai)) { allValid = false; logs.push('❌ [Type] Nilai harus angka.'); }
  else if (numNilai < 0 || numNilai > 100) { allValid = false; logs.push(`❌ [Range] Nilai ${numNilai} di luar 0-100.`); }
  else logs.push(`✅ [Range] Nilai ${numNilai} valid.`);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { allValid = false; logs.push('❌ [Format] Email tidak valid.'); }
  else logs.push('✅ [Format] Email valid.');
  const banner = allValid
    ? '<div class="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm mb-2">🎉 STATUS: 100% VALID</div>'
    : '<div class="font-extrabold text-rose-600 dark:text-rose-400 text-sm mb-2">⚠️ STATUS: DITOLAK</div>';
  out.innerHTML = banner + '<ul class="space-y-1 text-xs font-mono">' + logs.map(l => `<li>${l}</li>`).join('') + '</ul>';
  if (allValid) { userState.poin += 15; saveUserState(); showHubToast('Data valid! (+15 XP)'); }
}

// ============================================================
// VIDEO
// ============================================================
const VIDEO_DATA = {
  'vid-bab1': { title: 'Bab 1: Cara Kerja Sistem Komputer & Siklus Fetch-Decode-Execute', duration: '06:15 Menit', bab: 'Bab 1 • Sistem Komputer', summary: 'Visualisasi alur Input → RAM → CPU → Output.', steps: [
    { step: '01', label: 'Input Device & Konversi Biner', desc: 'Input diterjemahkan menjadi bit biner.' },
    { step: '02', label: 'Penyimpanan di RAM', desc: 'Data aktif ditempatkan di RAM.' },
    { step: '03', label: 'Siklus Fetch-Decode-Execute', desc: 'CU & ALU memproses instruksi.' },
    { step: '04', label: 'Output & Storage', desc: 'Hasil dikirim ke layar/SSD.' }
  ]},
  'vid-bab2': { title: 'Bab 2: Integrasi Aplikasi Perkantoran & Analisis Data Lahan Basah', duration: '07:10 Menit', bab: 'Bab 2 • TIK', summary: 'Praktikum Excel + Paste Link ke Word.', steps: [
    { step: '01', label: 'Penyusunan Tabel Dataset', desc: 'Merapikan data bulanan.' },
    { step: '02', label: 'Formula Statistik & IF', desc: 'AVERAGE, MAX, IF.' },
    { step: '03', label: 'Grafik Garis & Batang', desc: 'Visualisasi data.' },
    { step: '04', label: 'Paste Link ke Word', desc: 'Integrasi OLE dinamis.' }
  ]},
  'vid-bab3': { title: 'Bab 3: Transformasi Data & 5 Teknik Validasi Data Digital', duration: '05:45 Menit', bab: 'Bab 3 • Data & Validasi', summary: 'Data vs Informasi, GIGO, 5 validasi.', steps: [
    { step: '01', label: 'Data Mentah vs Informasi', desc: 'Konteks memberi makna.' },
    { step: '02', label: 'Mencegah GIGO', desc: 'Input salah = output salah.' },
    { step: '03', label: '5 Kriteria Validasi', desc: 'Type, Range, Format, Presence, Consistency.' },
    { step: '04', label: 'Praktik Data Validation', desc: 'Input Message & Error Alert.' }
  ]}
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
      </div>`).join('');
  }
  document.querySelectorAll('.video-playlist-btn').forEach(btn => {
    if (btn.getAttribute('data-vid') === key) btn.classList.add('ring-2', 'ring-blue-500');
    else btn.classList.remove('ring-2', 'ring-blue-500');
  });
  stopInteractiveVideo();
  renderVideoStageFrame(0);
  const vidEl = document.getElementById('main-mp4-player');
  if (vidEl) {
    const startMap = { 'vid-bab1': 3, 'vid-bab2': 6, 'vid-bab3': 9 };
    try { vidEl.currentTime = startMap[key] || 0; } catch (e) {}
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
      if (i === (stepIdx % 4)) card.classList.add('ring-2', 'ring-cyan-400');
      else card.classList.remove('ring-2', 'ring-cyan-400');
    }
  }
}

function seekMp4Video(seconds) {
  const vidEl = document.getElementById('main-mp4-player');
  if (!vidEl) return;
  try { vidEl.currentTime = seconds; vidEl.play(); } catch (e) {}
}

function onMp4Ended() {
  userState.poin += 25;
  saveUserState();
  showHubToast('Video selesai ditonton! (+25 XP)');
}

function playInteractiveVideo() {
  const vidEl = document.getElementById('main-mp4-player');
  if (vidEl) { try { if (vidEl.paused) vidEl.play(); } catch (e) {} }
  clearInterval(animInterval);
  const statusBtn = document.getElementById('btn-play-vid');
  if (statusBtn) statusBtn.textContent = '⏸️ Memutar Video & Simulasi...';
  renderVideoStageFrame(animStepIdx);
  animInterval = setInterval(() => {
    animStepIdx = (animStepIdx + 1) % 4;
    renderVideoStageFrame(animStepIdx);
    if (animStepIdx === 3) {
      userState.poin += 20;
      saveUserState();
      showHubToast('Selesai menyimak! (+20 XP)');
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

// ============================================================
// QUIZ
// ============================================================
function startGamifiedQuiz() {
  const nameInput = document.getElementById('quiz-input-nama');
  const classInput = document.getElementById('quiz-input-kelas');
  const babInput = document.getElementById('quiz-input-bab');
  const nama = (nameInput?.value || '').trim();
  const kelas = (classInput?.value || 'X-B DKV').trim();
  const bab = babInput?.value || 'all';
  if (!nama) { showHubToast('Masukkan Nama Lengkap dulu!'); if (nameInput) nameInput.focus(); return; }
  userState.nama = nama;
  userState.kelas = kelas;
  saveUserState();
  let pool = QUIZ_QUESTIONS.slice();
  if (bab !== 'all') pool = pool.filter(q => q.bab === bab);
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
      <span class="text-sm sm:text-base font-medium leading-snug pt-0.5">${escapeHtml(opt)}</span>
    </button>`).join('');
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
    if (i === qObj.answer) btn.className = 'w-full text-left p-4 rounded-2xl bg-emerald-500/15 border-2 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold flex items-start gap-3.5';
    else if (i === selectedIndex && !isCorrect) btn.className = 'w-full text-left p-4 rounded-2xl bg-rose-500/15 border-2 border-rose-500 text-rose-700 dark:text-rose-300 font-bold flex items-start gap-3.5';
    else btn.classList.add('opacity-50');
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
    fbBox.innerHTML = `<div class="font-extrabold text-emerald-600 dark:text-emerald-400">✅ Tepat! (+${bonus} XP)</div><p class="text-xs opacity-90">${escapeHtml(qObj.explain)}</p>`;
  } else {
    quizSession.streak = 0;
    fbBox.className = 'p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-sm space-y-1';
    fbBox.innerHTML = `<div class="font-extrabold text-rose-600 dark:text-rose-400">❌ Kurang Tepat!</div><p class="text-xs opacity-90">${escapeHtml(qObj.explain)}</p>`;
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

async function finishQuizSession() {
  document.getElementById('quiz-arena-card')?.classList.add('hidden');
  const resCard = document.getElementById('quiz-result-card');
  if (resCard) resCard.classList.remove('hidden');
  const total = quizSession.questions.length;
  const score = Math.round((quizSession.correctCount / total) * 100);
  const babMap = {
    'all': 'Semua Bab (3 Materi)',
    'bab1': 'Bab 1: Sistem Komputer',
    'bab2': 'Bab 2: TIK',
    'bab3': 'Bab 3: Data & Validasi'
  };
  const babLabel = babMap[quizSession.babFilter] || 'Semua Bab';
  document.getElementById('res-student-name').textContent = `${userState.nama} (${userState.kelas})`;
  document.getElementById('res-final-score').textContent = score;
  document.getElementById('res-correct-ratio').textContent = `${quizSession.correctCount} / ${total} Soal Benar`;
  document.getElementById('res-xp-earned').textContent = `+${quizSession.earnedXp} XP`;
  const newEntry = {
    timestamp: new Date().toLocaleString('id-ID'),
    nama: userState.nama + (userState.badgeTitle ? ` [${userState.badgeTitle}]` : ''),
    kelas: userState.kelas,
    bab: babLabel,
    skor: score,
    poin: userState.poin,
    reward: userState.claimedRewards.join(', ') || '-'
  };
  await saveScoreToLeaderboard(newEntry);
}

function resetQuizToStart() {
  document.getElementById('quiz-result-card')?.classList.add('hidden');
  document.getElementById('quiz-arena-card')?.classList.add('hidden');
  document.getElementById('quiz-registration-card')?.classList.remove('hidden');
}

// ============================================================
// REWARD
// ============================================================
function renderRewardsGrid() {
  const container = document.getElementById('rewards-shop-grid');
  if (!container) return;
  container.innerHTML = REWARD_CATALOG.map(r => {
    const owned = userState.claimedRewards.includes(r.title);
    const btnHtml = owned
      ? `<button type="button" onclick="openRewardPreview('${r.id}')" class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition">✅ Buka Reward</button>`
      : `<button type="button" onclick="claimDigitalReward('${r.id}')" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition shadow">🎁 Tukarkan (${r.cost} XP)</button>`;
    return `<div class="hub-card rounded-2xl p-5 flex flex-col justify-between space-y-4">
      <div class="space-y-2.5">
        <div class="flex items-center justify-between">
          <span class="text-2xl">${r.icon}</span>
          <span class="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-extrabold">${r.cost} XP</span>
        </div>
        <div class="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">${r.badge}</div>
        <h4 class="font-extrabold text-base leading-snug">${escapeHtml(r.title)}</h4>
        <p class="text-xs opacity-80 leading-relaxed">${escapeHtml(r.desc)}</p>
      </div>
      <div class="pt-2">${btnHtml}</div>
    </div>`;
  }).join('');
}

function claimDigitalReward(rewardId) {
  const item = REWARD_CATALOG.find(x => x.id === rewardId);
  if (!item) return;
  if (userState.claimedRewards.includes(item.title)) { openRewardPreview(rewardId); return; }
  if (userState.poin < item.cost) {
    showHubToast(`XP belum cukup! Butuh ${item.cost} XP (Poin: ${userState.poin} XP).`);
    return;
  }
  userState.poin -= item.cost;
  userState.claimedRewards.push(item.title);
  if (rewardId === 'badge-banjar') userState.badgeTitle = '💎 Master Data Banjar';
  saveUserState();
  renderRewardsGrid();
  openRewardPreview(rewardId);
  showHubToast(`Selamat! ${item.title} ditukarkan.`);
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
    body.innerHTML = `<div class="p-6 sm:p-8 rounded-2xl border-4 border-double border-amber-400 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white text-center space-y-4">
      <div class="text-xs font-bold uppercase tracking-widest text-amber-300">SERTIFIKAT KOMPETENSI DIGITAL</div>
      <h3 class="text-2xl font-extrabold">SERTIFIKAT KETUNTASAN BELAJAR</h3>
      <p class="text-xs text-slate-300">Diberikan kepada:</p>
      <div class="text-xl font-extrabold text-cyan-300 underline decoration-amber-400">${escapeHtml(studentName)} (${escapeHtml(studentClass)})</div>
      <p class="text-xs text-slate-200 max-w-xl mx-auto">Telah menyelesaikan pembelajaran Sistem Komputer, TIK, serta Data dan Validasinya pada platform Informatika Learning Hub SMKN 1 Banjarmasin.</p>
      <div class="pt-4 flex flex-col sm:flex-row items-center justify-around text-xs text-slate-300 border-t border-white/15 gap-3">
        <div>Banjarmasin, Oktober 2026</div>
        <div><strong>Akhmad Wahyu Redhani, S.Kom.</strong><br/>Guru Informatika • NIM 2530111713968</div>
      </div>
    </div>`;
  } else {
    body.innerHTML = `<div class="p-6 rounded-2xl hub-subtle text-center space-y-3">
      <div class="text-5xl">${item.icon}</div>
      <div class="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">${escapeHtml(item.badge)}</div>
      <h3 class="text-xl font-extrabold">${escapeHtml(item.title)}</h3>
      <p class="text-sm opacity-85">${escapeHtml(item.desc)}</p>
      <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
        KODE KLAIM: ILH-${rewardId.toUpperCase()}-2026 | ${escapeHtml(studentName)} (${escapeHtml(studentClass)})
      </div>
    </div>`;
  }
  modal.classList.remove('hidden');
}

function closeRewardPreview() {
  document.getElementById('reward-preview-modal')?.classList.add('hidden');
}

// ============================================================
// LEADERBOARD & GAS
// ============================================================
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
  try { localStorage.setItem('hub_leaderboard_records', JSON.stringify(list)); } catch (e) {}
}

async function loadLeaderboardData() {
  const statusEl = document.getElementById('db-connection-badge');
  let list = getLocalLeaderboard();

  if (isValidGasUrl(GAS_WEB_APP_URL)) {
    if (statusEl) {
      statusEl.textContent = '🔄 Sinkronisasi...';
      statusEl.className = 'px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold';
    }
    try {
      const resp = await fetch(GAS_WEB_APP_URL, { method: 'GET', redirect: 'follow', cache: 'no-store' });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      const json = await resp.json();
      if (json && json.status === 'success' && Array.isArray(json.leaderboard)) {
        list = json.leaderboard;
        setLocalLeaderboard(list);
        if (statusEl) {
          statusEl.textContent = '🟢 Terhubung: Google Spreadsheet (Live)';
          statusEl.className = 'px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold';
        }
      } else {
        throw new Error(json?.message || 'Format tidak dikenal');
      }
    } catch (err) {
      console.warn('[GAS GET Error]', err);
      if (statusEl) {
        statusEl.textContent = '🟡 Mode Hybrid (Offline / Local)';
        statusEl.className = 'px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold';
      }
    }
  } else if (statusEl) {
    statusEl.textContent = '🟢 Mode Demo (Siap Hubungkan URL)';
    statusEl.className = 'px-3 py-1 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-bold';
  }

  list.sort((a, b) => (Number(b.skor) - Number(a.skor)) || (Number(b.poin) - Number(a.poin)));
  renderLeaderboardTable(list);
}

async function saveScoreToLeaderboard(entry) {
  const entrySnapshot = Object.assign({}, entry);

  const list = getLocalLeaderboard();
  list.push(entrySnapshot);
  list.sort((a, b) => (Number(b.skor) - Number(a.skor)) || (Number(b.poin) - Number(a.poin)));
  setLocalLeaderboard(list);
  renderLeaderboardTable(list);

  if (!isValidGasUrl(GAS_WEB_APP_URL)) {
    showHubToast('Skor masuk ke Papan Peringkat lokal!');
    return;
  }

  // ✅ Tambahkan token jika diaktifkan
  const payloadToSend = Object.assign({}, entrySnapshot);
  if (GAS_SECRET_TOKEN) payloadToSend.token = GAS_SECRET_TOKEN;

  try {
    const resp = await fetch(GAS_WEB_APP_URL, {
      method: 'POST',
      redirect: 'follow',
      cache: 'no-store',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payloadToSend)
    });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const json = await resp.json();
    if (json && json.status === 'success') {
      showHubToast('✅ Skor dikirim ke Google Spreadsheet!');
      await loadLeaderboardData();
    } else {
      showHubToast('⚠️ ' + (json?.message || 'Respon Spreadsheet tidak dikenal.'));
    }
  } catch (e) {
    console.warn('[GAS POST Error]', e);
    showHubToast('Skor tersimpan lokal (offline).');
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
    return `<tr class="border-b border-slate-200 dark:border-slate-800 hover:bg-blue-500/5 transition">
      <td class="p-3.5">${rankBadge}</td>
      <td class="p-3.5 font-bold text-sm">${escapeHtml(item.nama)}</td>
      <td class="p-3.5 text-xs font-semibold"><span class="px-2.5 py-1 rounded-full hub-subtle">${escapeHtml(item.kelas)}</span></td>
      <td class="p-3.5 text-xs opacity-80">${escapeHtml(item.bab)}</td>
      <td class="p-3.5 font-extrabold text-blue-600 dark:text-blue-400 text-sm">${Number(item.skor) || 0}</td>
      <td class="p-3.5 font-mono font-bold text-amber-600 dark:text-amber-400 text-xs">${Number(item.poin) || 0} XP</td>
      <td class="p-3.5 text-xs opacity-80">${escapeHtml(item.reward || '-')}</td>
    </tr>`;
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
  const url = (inp?.value || '').trim();
  if (url && !isValidGasUrl(url)) {
    showHubToast('❌ URL tidak valid! Format: https://script.google.com/macros/s/XXXX/exec');
    if (inp) inp.focus();
    return;
  }
  GAS_WEB_APP_URL = url;
  try { localStorage.setItem('hub_gas_url', GAS_WEB_APP_URL); } catch (e) {}
  closeGasConfigModal();
  loadLeaderboardData();
  showHubToast(url ? '✅ URL disimpan & disinkronkan!' : 'URL dikosongkan.');
}

function showHubToast(msg) {
  const t = document.getElementById('hub-toast');
  const txt = document.getElementById('hub-toast-text');
  if (!t || !txt) return;
  txt.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(window._hubToastTimer);
  window._hubToastTimer = setTimeout(() => t.classList.add('hidden'), 3500);
}

// ============================================================
// BOOT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  initHubState();
  selectVideoLesson('vid-bab3');
});
