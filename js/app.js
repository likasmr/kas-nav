document.addEventListener('DOMContentLoaded', () => {
    // 主题切换
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 初始化主题
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 搜索功能
    const searchInput = document.getElementById('searchInput');
    const searchEngines = document.querySelectorAll('.search-engine');

    searchEngines.forEach(engine => {
        engine.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (!query) return;

            const engineType = engine.dataset.engine;
            let searchUrl = '';

            switch(engineType) {
                case 'google':
                    searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                    break;
                case 'bing':
                    searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
                    break;
            }

            window.open(searchUrl, '_blank');
        });
    });
}); 