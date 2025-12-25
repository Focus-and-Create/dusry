console.log('🚀 app.js 로드됨!');

// 페이지 로드 함수
async function loadPage(pageName) {
    console.log('🔍 페이지 로드 시도:', pageName);
    try {
        const url = `pages/${pageName}.html`;
        console.log('📡 요청 URL:', url);
        
        const response = await fetch(url);
        console.log('📥 응답 상태:', response.status, response.ok);
        
        if (!response.ok) throw new Error('페이지를 찾을 수 없습니다');
        
        const html = await response.text();
        console.log('✅ HTML 로드 성공, 길이:', html.length);
        
        document.getElementById('page-content').innerHTML = html;
        console.log('✅ DOM 업데이트 완료');
        
        // 페이지 로드 후 이벤트 다시 바인딩
        initPageEvents();
        console.log('✅ 이벤트 바인딩 완료');
    } catch (error) {
        console.error('❌ 페이지 로드 실패:', error);
        document.getElementById('page-content').innerHTML = `
            <div class="error-message">
                <h2>페이지를 불러올 수 없습니다</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// 페이지별 이벤트 초기화
function initPageEvents() {
    // 북마크 버튼
    document.querySelectorAll('.btn-bookmark, .btn-bookmark-browse, .btn-bookmark-compact').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (this.textContent.includes('🤍')) {
                this.textContent = this.textContent.replace('🤍', '❤️');
            } else {
                this.textContent = this.textContent.replace('❤️', '🤍');
            }
        });
    });

    // 장르 필터
    document.querySelectorAll('.genre-filters .filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.genre-filters .filter-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 가격대 필터
    document.querySelectorAll('.price-filters .filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.price-filters .filter-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 내 작업 가능 필터 (다중 선택)
    document.querySelectorAll('.my-work-filters .filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // 고급 필터 토글 ⭐ 중요!
    const toggleBtn = document.getElementById('toggleAdvancedFilter');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const advancedFilters = document.getElementById('advancedFilters');
            const toggleText = document.getElementById('filterToggleText');
            const toggleIcon = document.getElementById('filterToggleIcon');
            
            if (advancedFilters.style.display === 'none' || !advancedFilters.style.display) {
                advancedFilters.style.display = 'block';
                toggleText.textContent = '고급 필터 닫기';
                toggleIcon.textContent = '▲';
            } else {
                advancedFilters.style.display = 'none';
                toggleText.textContent = '고급 필터 열기';
                toggleIcon.textContent = '▼';
            }
        });
    }

    // 형식 필터
    document.querySelectorAll('.format-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const format = this.dataset.format;
            const cards = document.querySelectorAll('.type-card-browse');
            
            cards.forEach(card => {
                if (format === 'all' || card.dataset.format === format) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 탭 메뉴 (북마크, 프로필 등)
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 메시지 아이템 클릭
    document.querySelectorAll('.message-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.message-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 작가 프로필 탭
    document.querySelectorAll('.artist-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.artist-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabName = this.dataset.tab;
            const content = document.getElementById(tabName + '-content');
            if (content) content.classList.add('active');
        });
    });

    // 타입 상세 페이지 - 샘플 썸네일
    document.querySelectorAll('.sample-thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
            document.querySelectorAll('.sample-thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const mainSample = document.getElementById('mainSample');
            if (mainSample) {
                mainSample.src = this.src.replace('100x100', '600x400');
            }
        });
    });

    // 타입 상세 페이지 - 탭
    document.querySelectorAll('.detail-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.detail-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.detail-tab-content').forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabName = this.dataset.tab;
            const content = document.getElementById(tabName + '-content');
            if (content) content.classList.add('active');
        });
    });
}

// 네비게이션 클릭 이벤트
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // 활성 상태 변경
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('nav-active'));
        link.classList.add('nav-active');
        
        // 페이지 로드
        const page = link.dataset.page;
        await loadPage(page);
    });
});

// 페이지 로드 시 첫 페이지 표시
window.addEventListener('DOMContentLoaded', () => {
    loadPage('browse');
});