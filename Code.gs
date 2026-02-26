// ============================================================
// 2026 진로체험 프로그램 참여 여부 조사 - Google Apps Script
// ============================================================
// 사용 방법:
// 1. Google Sheets 새 시트를 만들고, 주소창에서 스프레드시트 ID를 복사
//    예) https://docs.google.com/spreadsheets/d/[여기가_ID]/edit
// 2. 아래 SPREADSHEET_ID에 붙여넣기
// 3. [배포] → [웹 앱으로 배포] → 액세스: 모든 사용자 → 배포
// 4. 배포 URL을 index.html의 APPS_SCRIPT_URL에 붙여넣기
// ============================================================

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // ← 여기에 입력
const SHEET_NAME = '응답';

// 헤더 행 정의
const HEADERS = [
  '타임스탬프', '단과대학', '트랙', '참여교원명', '교원연락처',
  '담당조교명', '조교연락처', '타캠퍼스이동여부',
  '5월_선택날짜', '6월_선택날짜', '7월_선택날짜', '8월_선택날짜'
];

function doPost(e) {
  // CORS 허용 헤더
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // 시트가 없으면 생성 + 헤더 추가
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // 데이터 행 추가
    const row = [
      data.timestamp      || '',
      data.college        || '',
      data.track          || '',
      data.professorName  || '',
      data.professorPhone || '',
      data.assistantName  || '',
      data.assistantPhone || '',
      data.otherCampus    || '',
      data.dates_may      || '',
      data.dates_jun      || '',
      data.dates_jul      || '',
      data.dates_aug      || ''
    ];
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// OPTIONS 요청 처리 (CORS preflight)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Server is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
