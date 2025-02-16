// 初始化应用
document.addEventListener('DOMContentLoaded', async () => {
    // 加载链接数据
    const data = await loadLinkData();
    renderCategories(data.categories);
});

// 数据加载
async function loadLinkData() {
    try {
        const response = await fetch('data/links.json');
        return await response.json();
    } catch (error) {
        console.error('数据加载失败:', error);
        return { categories: [] };
    }
}

// 渲染分类
function renderCategories(categories) {
    const container = document.getElementById('categories');
    container.innerHTML = categories.map(category => `
        <div class="category-card">
            <h3 class="category-title">${category.name}</h3>
            <div class="links-container">
                ${category.links.map(link => `
                    <a href="${link.url}" 
                       class="link-item"
                       target="_blank"
                       rel="noopener">
                        <i class="${link.icon} link-icon"></i>
                        <span>${link.name}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 搜索功能
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    filterLinks(query);
}

function performSearch(event) {
    const query = encodeURIComponent(event.target.value);
    window.location.href = `https://www.google.com/search?q=${query}`;
}

function filterLinks(query) {
    document.querySelectorAll('.link-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
}