document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');

    // 搜索功能基础实现
    searchButton.addEventListener('click', () => {
        handleSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchInput.value);
        }
    });
});

function handleSearch(query) {
    if (!query) return;
    
    // 判断是否是URL
    if (isValidURL(query)) {
        if (!query.startsWith('http')) {
            query = 'https://' + query;
        }
        window.location.href = query;
    } else {
        // 默认使用百度搜索
        window.location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
    }
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return /^[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(string);
    }
} 