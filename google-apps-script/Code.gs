/**
 * ============================================================================
 * GOOGLE APPS SCRIPT — DATABASE LEADERBOARD INFORMATIKA LEARNING HUB
 * Karya Inovasi: Akhmad Wahyu Redhani (NIM 2530111713968)
 * PPG Calon Guru Informatika — Universitas Lambung Mangkurat (ULM)
 * Sekolah PPL: SMKN 1 Banjarmasin
 * ============================================================================
 * CARA PAKAI:
 * 1. Buat Google Spreadsheet baru di Google Drive Anda.
 * 2. Beri nama sheet pertama: Leaderboard
 * 3. Buat header pada Baris 1 (A1:G1):
 *    A1: Timestamp | B1: Nama | C1: Kelas | D1: Kategori_Bab | E1: Skor | F1: Poin_XP | G1: Reward_Klaim
 * 4. Klik menu Extensions (Ekstensi) -> Apps Script.
 * 5. Hapus seluruh isi Code.gs, lalu tempel (paste) seluruh kode ini.
 * 6. Klik tombol Deploy -> New deployment -> Pilih jenis: Web app.
 * 7. Pada "Execute as" pilih: Me (Email Anda).
 * 8. Pada "Who has access" pilih: Anyone (Siapa saja).
 * 9. Klik Deploy, salin Web App URL (berakhiran /exec), lalu tempelkan pada
 *    konfigurasi GAS_WEB_APP_URL di file assets/js/app.js (atau via tombol Setup Database di web).
 */

const SHEET_NAME = 'Leaderboard';

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Nama', 'Kelas', 'Kategori_Bab', 'Skor', 'Poin_XP', 'Reward_Klaim']);
    sheet.getRange('A1:G1').setFontWeight('bold').setBackground('#1e3a8a').setFontColor('#ffffff');
  }
  return sheet;
}

function doGet(e) {
  try {
    const sheet = setupSheet();
    const rows = sheet.getDataRange().getValues();
    const data = [];
    for (let i = 1; i < rows.length; i++) {
      const r = rows[i];
      if (!r[1]) continue;
      data.push({
        timestamp: r[0],
        nama: String(r[1]),
        kelas: String(r[2]),
        bab: String(r[3] || 'Semua Bab (3 Materi)'),
        skor: Number(r[4] || 0),
        poin: Number(r[5] || 0),
        reward: String(r[6] || '-')
      });
    }
    // Urutkan berdasarkan Skor tertinggi, lalu Poin_XP tertinggi
    data.sort((a, b) => (b.skor - a.skor) || (b.poin - a.poin));

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      count: data.length,
      leaderboard: data.slice(0, 50)
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = setupSheet();
    let payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    }

    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' });
    const nama = payload.nama || 'Siswa Anonim';
    const kelas = payload.kelas || 'X-B DKV';
    const bab = payload.bab || 'Semua Bab (3 Materi)';
    const skor = Number(payload.skor || 0);
    const poin = Number(payload.poin || 0);
    const reward = payload.reward || '-';

    sheet.appendRow([timestamp, nama, kelas, bab, skor, poin, reward]);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Skor berhasil disimpan ke Google Spreadsheet!'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
