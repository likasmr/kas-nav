// 主题切换功能
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme') || 'light';

document.body.setAttribute('data-theme', storedTheme);
themeToggle.textContent = storedTheme === 'dark' ? '🌞 切换主题' : '🌙 切换主题';

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '🌞 切换主题' : '🌙 切换主题';
    localStorage.setItem('theme', newTheme);
});

// 加载链接数据
async function loadLinks() {
    try {
        const response = await fetch('data/links.json');
        const data = await response.json();
        renderCategories(data.categories);
    } catch (error) {
        console.error('加载链接数据失败:', error);
    }
}

// 渲染分类和链接
function renderCategories(categories) {
    const container = document.getElementById('categoriesContainer');
    
    categories.forEach(category => {
        const categoryHTML = `
            <div class="category-card">
                <h2 class="category-title">${category.name}</h2>
                <ul class="links-list">
                    ${category.links.map(link => `
                        <li class="link-item">
                            <a href="${link.url}" target="_blank" rel="noopener">
                                ${link.icon ? `<img src="${link.icon}" alt="" class="link-icon">` : '🔗'}
                                <span>${link.name}</span>
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', categoryHTML);
    });
}

// 初始化加载
document.addEventListener('DOMContentLoaded', loadLinks); 