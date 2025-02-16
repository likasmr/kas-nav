// 链接数据示例
const linksData = {
    "开发工具": [
        { name: "GitHub", url: "https://github.com", icon: "fab fa-github" },
        { name: "CodePen", url: "https://codepen.io", icon: "fab fa-codepen" }
    ],
    "设计资源": [
        { name: "Dribbble", url: "https://dribbble.com", icon: "fab fa-dribbble" },
        { name: "Behance", url: "https://behance.net", icon: "fab fa-behance" }
    ]
};

// 初始化页面
function initApp() {
    renderCategories();
    setupSearch();
    setupThemeToggle();
}

// 渲染分类区块
function renderCategories() {
    const container = document.getElementById('categories');
    container.innerHTML = Object.entries(linksData).map(([category, items]) => `
        <div class="category-card">
            <h3 class="category-title">${category}</h3>
            <div class="links-grid">
                ${items.map(item => `
                    <a href="${item.url}" class="link-item">
                        <i class="${item.icon}"></i>
                        <span>${item.name}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 搜索功能
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            }
        }
    });
}

// 主题切换
function setupThemeToggle() {
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme',
            document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
        );
    });
}

// 启动应用
document.addEventListener('DOMContentLoaded', initApp); 