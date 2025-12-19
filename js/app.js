// 페이지 로드 함수
async function loadPage(pageName) {
    try {
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error('페이지를 찾을 수 없습니다');
        
        const html = await response.text();
        document.getElementById('page-content').innerHTML = html;
        
        // 페이지 로드 후 이벤트 다시 바인딩
        initPageEvents();
    } catch (error) {
        console.error('페이지 로드 실패:', error);
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
    document.querySelectorAll('.btn-bookmark').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.textContent = '❤️';
            } else {
                this.textContent = '🤍';
            }
        });
    });

    // 필터 태그
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 탭 메뉴
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
