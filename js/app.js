// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
});

// 搜索功能初始化
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchEngines = document.querySelectorAll('.search-engine');

    // 监听搜索框回车事件
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // 默认使用Google搜索
                searchWithEngine('google', searchTerm);
            }
        }
    });

    // 监听搜索引擎按钮点击
    searchEngines.forEach(button => {
        button.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                const engine = button.dataset.engine;
                searchWithEngine(engine, searchTerm);
            }
        });
    });
}

// 搜索引擎处理函数
function searchWithEngine(engine, searchTerm) {
    const engines = {
        google: `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`,
        bing: `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`
    };

    if (engines[engine]) {
        window.open(engines[engine], '_blank');
    }
} 