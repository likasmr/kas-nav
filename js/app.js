// 主题切换功能
const themeBtn = document.getElementById('themeBtn');
const storedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', storedTheme);

themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// 加载链接数据
async function loadLinks() {
    const response = await fetch('data/links.json');
    const data = await response.json();
    renderCategories(data);
}

function renderCategories(data) {
    const container = document.getElementById('categories');
    container.innerHTML = data.map(category => `
        <div class="category">
            <h2>${category.name}</h2>
            <div class="links-grid">
                ${category.links.map(link => `
                    <a href="${link.url}" class="link-card" target="_blank">
                        <h3>${link.title}</h3>
                        ${link.description ? `<p>${link.description}</p>` : ''}
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 初始化加载
document.addEventListener('DOMContentLoaded', loadLinks); 