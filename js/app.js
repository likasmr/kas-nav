// 修改为从JSON加载数据
async function loadData() {
    const response = await fetch('../data/links.json');
    return await response.json();
}

// 初始化分类
async function initCategories() {
    const categories = await loadData();
    const container = document.getElementById('categories');
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `
            <h2>${category.name}</h2>
            <div class="links">
                ${category.links.map(link => `
                    <a href="${link.url}" target="_blank">
                        ${link.name}
                    </a>
                `).join('')}
            </div>
        `;
        container.appendChild(categoryDiv);
    });
}

// 添加主题切换功能
function initThemeToggle() {
    const themeButton = document.createElement('button');
    themeButton.id = 'theme-toggle';
    themeButton.innerHTML = '🌓';
    themeButton.style.position = 'fixed';
    themeButton.style.bottom = '20px';
    themeButton.style.right = '20px';
    themeButton.style.background = 'rgba(255,255,255,0.1)';
    themeButton.style.border = 'none';
    themeButton.style.borderRadius = '50%';
    themeButton.style.width = '40px';
    themeButton.style.height = '40px';
    themeButton.style.cursor = 'pointer';
    
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
    });
    
    document.body.appendChild(themeButton);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    initCategories();
    initThemeToggle();
}); 