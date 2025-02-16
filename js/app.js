// 主题切换功能
document.addEventListener('DOMContentLoaded', () => {
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
});

// 示例数据
const sampleData = {
    categories: [
        {
            title: "常用工具",
            links: [
                { name: "GitHub", url: "https://github.com", icon: "github.png" },
                { name: "Gmail", url: "https://gmail.com", icon: "gmail.png" }
            ]
        },
        {
            title: "学习资源",
            links: [
                { name: "MDN", url: "https://developer.mozilla.org", icon: "mdn.png" },
                { name: "Stack Overflow", url: "https://stackoverflow.com", icon: "stackoverflow.png" }
            ]
        }
    ]
};

// 渲染分类和链接
function renderCategories(data) {
    const container = document.querySelector('.categories-container');
    container.innerHTML = data.categories.map(category => `
        <div class="category">
            <h2 class="category-title">${category.title}</h2>
            <div class="links-grid">
                ${category.links.map(link => `
                    <a href="${link.url}" class="link-card" target="_blank">
                        ${link.name}
                    </a>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// 初始化页面
renderCategories(sampleData); 