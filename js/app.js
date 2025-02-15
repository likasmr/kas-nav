// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 主题切换
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // 搜索功能
    document.getElementById('searchInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value.trim();
            const engine = document.getElementById('engineSelect').value;
            if (query) {
                window.open(`${engine}${encodeURIComponent(query)}`, '_self');
            }
        }
    });

    // 加载分类数据
    fetch('/data/links.json')
        .then(res => res.json())
        .then(data => renderCategories(data.categories));
});

// 渲染分类区块
function renderCategories(categories) {
    const container = document.querySelector('main');
    
    categories.forEach(category => {
        const card = document.createElement('div');
        card.className = `category-card bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg`;
        card.innerHTML = `
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <span class="w-3 h-3 rounded-full ${category.color}"></span>
                ${category.name}
            </h3>
            <div class="grid gap-3">
                ${category.links.map(link => `
                    <a href="${link.url}" 
                       class="link-item flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <svg class="link-icon w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform" viewBox="0 0 24 24">
                            <path fill="currentColor" d="${link.icon}"/>
                        </svg>
                        <span class="text-gray-700 dark:text-gray-300">${link.name}</span>
                    </a>
                `).join('')}
            </div>
        `;
        container.appendChild(card);
    });
} 