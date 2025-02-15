// 主题切换功能
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 初始化主题
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

// 切换主题
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 搜索功能
const searchInput = document.getElementById('searchInput');
const searchEngines = document.querySelectorAll('.search-engine');

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            if (isValidUrl(query)) {
                window.open(ensureHttps(query), '_blank');
            } else {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
            }
        }
    }
});

searchEngines.forEach(engine => {
    engine.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            const engineType = engine.dataset.engine;
            const searchUrl = engineType === 'google' 
                ? `https://www.google.com/search?q=${encodeURIComponent(query)}`
                : `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
            window.open(searchUrl, '_blank');
        }
    });
});

// URL 处理工具函数
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function ensureHttps(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`;
    }
    return url;
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    // 后续可添加其他初始化功能
}); 