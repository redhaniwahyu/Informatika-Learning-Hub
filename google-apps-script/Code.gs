/**
 * ============================================================================
 * GOOGLE APPS SCRIPT — DATABASE LEADERBOARD INFORMATIKA LEARNING HUB
 * Karya Inovasi: Akhmad Wahyu Redhani (NIM 2530111713968)
 * PPG Calon Guru Informatika — Universitas Lambung Mangkurat (ULM)
 * Sekolah PPL: SMKN 1 Banjarmasin
 * ============================================================================
 */

const SHEET_NAME = 'Leaderboard';

// ✅ OPSIONAL: Token rahasia untuk mencegah spam POST
// Biarkan kosong ('') jika tidak ingin pakai token
// Jika diisi, samakan dengan GAS_SECRET_TOKEN di app.js
const SECRET_TOKEN = '';

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
    data.sort((a, b) => (b.skor - a.skor) || (b.poin - a.poin));

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        count: data.length,
        leaderboard: data.slice(0, 50)
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const sheet = setupSheet();
    let payload = {};

    if (e.postData && e.postData.contents) {
      const raw = e.postData.contents;
      try {
        payload = JSON.parse(raw);
      } catch (_) {
        payload = e.parameter || {};
      }
    } else if (e.parameter) {
      payload = e.parameter;
    }

    // ✅ Validasi token (jika diaktifkan)
    if (SECRET_TOKEN && payload.token !== SECRET_TOKEN) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Unauthorized: token tidak valid'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' });
    const nama = String(payload.nama || 'Siswa Anonim').slice(0, 100);
    const kelas = String(payload.kelas || 'X-B DKV').slice(0, 50);
    const bab = String(payload.bab || 'Semua Bab (3 Materi)').slice(0, 100);
    const skor = Number(payload.skor || 0);
    const poin = Number(payload.poin || 0);
    const reward = String(payload.reward || '-').slice(0, 200);

    sheet.appendRow([timestamp, nama, kelas, bab, skor, poin, reward]);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Skor berhasil disimpan ke Google Spreadsheet!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
