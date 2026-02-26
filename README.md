# 2026 진로체험 프로그램 참여 여부 조사 웹폼

## 파일 구성
```
index.html   ← 웹폼 (GitHub Pages로 배포)
Code.gs      ← Google Apps Script (백엔드)
README.md    ← 이 파일
```

---

## 배포 방법 (3단계)

### 1단계 — Google Sheets + Apps Script 설정

1. [Google Sheets](https://sheets.google.com) 접속 → 새 스프레드시트 만들기
2. 주소창에서 스프레드시트 ID 복사
   ```
   https://docs.google.com/spreadsheets/d/【여기가_ID】/edit
   ```
3. [확장 프로그램] → [Apps Script] 클릭
4. 기존 코드 전체 삭제 후 `Code.gs` 내용 붙여넣기
5. `SPREADSHEET_ID` 값을 복사한 ID로 교체
6. 저장 (Ctrl+S)
7. [배포] → [새 배포] 클릭
   - 유형: **웹 앱**
   - 실행 계정: **나**
   - 액세스 권한: **모든 사용자**
8. [배포] 클릭 → 표시된 **웹 앱 URL** 복사

### 2단계 — index.html에 URL 입력

`index.html`을 텍스트 편집기로 열고 아래 부분을 수정:

```javascript
// 수정 전
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';

// 수정 후 (복사한 URL로 교체)
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXX/exec';
```

### 3단계 — GitHub Pages로 배포

1. [GitHub](https://github.com) 접속 → 새 저장소(Repository) 만들기
   - 이름 예: `jinro-form-2026`
   - Public으로 설정
2. `index.html` 파일 업로드
3. [Settings] → [Pages] → Source: **main branch / root** → [Save]
4. 잠시 후 아래 주소로 접속 가능:
   ```
   https://【GitHub사용자명】.github.io/jinro-form-2026/
   ```

---

## 응답 데이터 확인

Google Sheets의 '응답' 시트에서 제출 내용을 확인할 수 있습니다.

| 컬럼 | 설명 |
|------|------|
| 타임스탬프 | 제출 일시 |
| 단과대학 | Q1 |
| 트랙 | Q2 |
| 참여교원명 | Q3 |
| 교원연락처 | Q4 |
| 담당조교명 | Q5 |
| 조교연락처 | Q6 |
| 타캠퍼스이동여부 | Q7 (O/X) |
| 5월_선택날짜 | 쉼표 구분 문자열 |
| 6월_선택날짜 | 쉼표 구분 문자열 |
| 7월_선택날짜 | 쉼표 구분 문자열 |
| 8월_선택날짜 | 쉼표 구분 문자열 |

---

## 주의사항

- Apps Script를 수정하면 **새 버전으로 재배포**해야 반영됩니다.
  ([배포] → [배포 관리] → [편집] → 버전: 새 버전)
- 테스트 시 브라우저 콘솔(F12)에서 오류 메시지를 확인할 수 있습니다.
