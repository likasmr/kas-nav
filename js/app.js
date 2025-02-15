// 主题切换
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
    } else if (prefersDarkScheme.matches) {
        document.body.dataset.theme = 'dark';
    }
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
});

// 搜索功能
const searchInput = document.getElementById('searchInput');
const searchEngines = document.querySelectorAll('.search-engine');
let currentEngine = 'google';

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            let searchUrl;
            if (currentEngine === 'google') {
                searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            } else {
                searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            }
            window.open(searchUrl, '_blank');
        }
    }
});

searchEngines.forEach(engine => {
    engine.addEventListener('click', () => {
        searchEngines.forEach(e => e.classList.remove('active'));
        engine.classList.add('active');
        currentEngine = engine.alt.toLowerCase();
    });
});

// 初始化
initTheme(); 