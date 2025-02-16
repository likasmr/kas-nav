// 初始化配置
const config = {
    searchEngines: {
        google: 'https://www.google.com/search?q=',
        bing: 'https://www.bing.com/search?q=',
        baidu: 'https://www.baidu.com/s?wd='
    },
    dataSource: 'data/links.json'
};

// 主题切换
document.querySelector('.theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.documentElement.setAttribute('data-theme', 
        document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// 动态加载链接数据
async function loadLinks() {
    try {
        const response = await fetch(config.dataSource);
        const data = await response.json();
        renderCategories(data);
    } catch (error) {
        console.error('数据加载失败:', error);
    }
}

// 渲染分类区块
function renderCategories(data) {
    const container = document.querySelector('.grid-container');
    container.innerHTML = data.map(category => `
        <div class="category-card animate__animated animate__fadeIn">
            <h3>${category.name}</h3>
            <div class="links">
                ${category.links.map(link => `
                    <a href="${link.url}" target="_blank" class="link-item">
                        <i class="${link.icon || 'fas fa-link'}"></i>
                        ${link.name}
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 搜索功能
document.querySelector('.search-btn').addEventListener('click', performSearch);
document.querySelector('.search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    const query = document.querySelector('.search-input').value;
    const engine = document.querySelector('.engine-select').value;
    const searchUrl = config.searchEngines[engine] + encodeURIComponent(query);
    window.open(searchUrl, '_blank');
}

// 初始化
loadLinks(); 