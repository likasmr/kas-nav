// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    loadCategories();
});

// 搜索功能初始化
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => {
        handleSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch(searchInput.value);
        }
    });
}

// 处理搜索
function handleSearch(query) {
    if (!query) return;
    
    // 判断是否是URL
    if (isValidURL(query)) {
        window.open(query.startsWith('http') ? query : `https://${query}`, '_blank');
    } else {
        // 默认使用Google搜索
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
}

// 验证URL
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch {
        return /^[\w-]+(\.[\w-]+)+([/?].*)?$/.test(string);
    }
}

// 加载分类数据
function loadCategories() {
    // TODO: 从JSON数据源加载分类和链接
    // 临时使用硬编码数据进行测试
    const testData = {
        categories: [
            {
                name: "常用工具",
                links: [
                    { title: "Google", url: "https://www.google.com" },
                    { title: "GitHub", url: "https://github.com" }
                ]
            }
        ]
    };
    
    renderCategories(testData.categories);
}

// 渲染分类
function renderCategories(categories) {
    const container = document.querySelector('.categories-container');
    container.innerHTML = categories.map(category => `
        <div class="category-card">
            <h2>${category.name}</h2>
            <div class="links-grid">
                ${category.links.map(link => `
                    <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                        ${link.title}
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
} 