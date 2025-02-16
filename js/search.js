// 搜索引擎配置
const SEARCH_ENGINES = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q=',
    baidu: 'https://www.baidu.com/s?wd='
};

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch('google'); // 默认使用Google
    }
});

document.querySelectorAll('.search-engines button').forEach(button => {
    button.addEventListener('click', () => {
        const engine = button.dataset.engine;
        performSearch(engine);
    });
});

function performSearch(engine) {
    const query = document.getElementById('searchInput').value;
    if (query) {
        window.location.href = `${SEARCH_ENGINES[engine]}${encodeURIComponent(query)}`;
    }
} 