# 연교 - 연성 교환 플랫폼

## 📁 파일 구조

```
project/
├── index.html              # 메인 파일 (헤더 + 네비게이션)
├── exchange-style.css      # 전체 스타일시트
├── js/
│   └── app.js             # 페이지 전환 로직
└── pages/
    ├── browse.html         # 타입 둘러보기 페이지
    ├── profile.html        # 내 프로필 페이지
    ├── bookmarks.html      # 북마크 페이지 (TODO)
    ├── messages.html       # 메시지 페이지 (TODO)
    └── artist-profile.html # 상대방 프로필 페이지 (TODO)
```

## 🚀 사용 방법

### 1. 로컬에서 실행하기

웹 서버가 필요합니다 (fetch API 사용하므로):

**Python 사용:**
```bash
cd /mnt/user-data/outputs
python3 -m http.server 8000
```

그 다음 브라우저에서 `http://localhost:8000` 접속

**VS Code Live Server 사용:**
1. VS Code에서 폴더 열기
2. index.html 우클릭
3. "Open with Live Server" 선택

### 2. 새 페이지 추가하기

`pages/` 폴더에 새 HTML 파일 만들기:

**pages/bookmarks.html:**
```html
<section id="bookmarks-section">
    <h2 class="section-heading">북마크</h2>
    <!-- 콘텐츠 -->
</section>
```

`index.html`의 네비게이션에 링크 추가:
```html
<a href="#" class="nav-link" data-page="bookmarks">북마크</a>
```

자동으로 작동합니다!

## ✨ 주요 기능

### 완료된 기능
- ✅ 타입 둘러보기 (검색, 필터, 정렬)
- ✅ 타입 카드에 **가격 정보** 추가
- ✅ 내 프로필 (타입 관리, 캐릭터 관리)
- ✅ 플로팅 버튼 제거 (프로필 페이지에 등록 버튼 있음)
- ✅ 반응형 디자인
- ✅ 페이지 전환 애니메이션

### TODO (추가할 페이지)
- ⬜ bookmarks.html - 북마크 페이지
- ⬜ messages.html - 메시지 페이지
- ⬜ artist-profile.html - 상대방 프로필 페이지

## 🎨 디자인 시스템

### 컬러
- **파란색** (#5B8FD6) - Primary
- **노란색** (#FFD966) - Secondary/Accent
- **하얀색** (#FFFFFF) - Background

### 가격 표시
```html
<div class="type-price">
    <span class="price-label">희망 교환 가치</span>
    <span class="price-value">₩30,000 상당</span>
</div>
```

## 📝 추가 예정 기능

1. **북마크 페이지** - 이전에 만든 HTML 내용을 `pages/bookmarks.html`로 복사
2. **메시지 페이지** - 이전에 만든 HTML 내용을 `pages/messages.html`로 복사
3. **작가 프로필 페이지** - 상대방 프로필 볼 수 있는 페이지

## 💡 팁

- 각 페이지는 독립적으로 수정 가능
- CSS는 하나의 파일로 통합 관리
- JavaScript 이벤트는 `app.js`의 `initPageEvents()`에서 관리
- 새 이벤트 추가 시 `initPageEvents()` 함수에 추가하면 모든 페이지에 적용됨

## 🔧 문제 해결

**페이지가 로드되지 않을 때:**
1. 웹 서버를 실행했는지 확인
2. 브라우저 콘솔에서 에러 확인 (F12)
3. 파일 경로가 올바른지 확인

**새 페이지 추가 후 작동하지 않을 때:**
1. `pages/` 폴더에 HTML 파일이 있는지 확인
2. 네비게이션의 `data-page` 속성과 파일명이 일치하는지 확인
3. 브라우저 캐시 삭제 후 새로고침 (Ctrl+Shift+R)
