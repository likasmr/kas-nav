document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchEngines = {
        google: 'https://www.google.com/search?q=',
        bing: 'https://www.bing.com/search?q=',
        baidu: 'https://www.baidu.com/s?wd=',
        duckduckgo: 'https://duckduckgo.com/?q='
    };

    // 搜索引擎按钮点击事件
    document.querySelector('.search-engines').addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const engine = e.target.dataset.engine;
            const query = searchInput.value.trim();
            
            if (query) {
                window.open(searchEngines[engine] + encodeURIComponent(query), '_blank');
            }
        }
    });

    // 回车键搜索（默认使用Google）
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.open(searchEngines.google + encodeURIComponent(query), '_blank');
            }
        }
    });
}); 